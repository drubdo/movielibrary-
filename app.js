'use strict'

let url = "http://localhost:3000";

function getAllMovies() {

    $("#movies").empty();
    $.ajax({
        method: "GET",
        url: url + "/api/products",
        data: {},
        async: false,
    }).done(function (data) {
        generateTable(data)
        search(data[0])
        createRecordForm()
    });
}
getAllMovies();

function generateTable(data) {
    
     let html = `
    <h4>Movies</h4>
    <div class="table-responsive" style="padding:3px">
    <table class="table table-bordered bg-white" style="white-space:nowrap">
            <thead>
                <tr> 
                    <th> Edit </th>
                    <th> Id </th>
                    <th> Title </th>
                    <th> Director </th>
                    <th> Genre </th>
                    <th> Image </th>
                </tr>
            </thead>
    `

    html += '<tbody id="myTable">';
    $.each(data, function (index, value) {


        let data = JSON.stringify(value).split('"').join("&quot;");

        let image = value.image;
        html += `
         
            <tr>
            <td>
                <button class="btn btn-primary" onClick="edit('${data}')"> edit </button>
            </td>
            <td id="id"> ${value.id} </td>
            <td id="title"> ${value.title} </td>
            <td id="director"> ${value.director} </td>
            <td id="genre"> ${value.genre} </td>
            <td id="image"> <img src="${image}" width="100"/> </td> 
            </tr>
             
        `
    })
    html += `</tbody> </table></div>`;
    $("#movies").append(html)
}

function edit(data) {
    $("#edit").empty();

    data = JSON.parse(data)
    let html = `
        <h4>Edit<h4>
        <form action="">
            <input id="edit_id" type="text" value="${data.id}" style="display:none">
            title <input id="edit_title" class="form-control" type="text" value="${data.title}">
            director <input id="edit_director" class="form-control width-400" type="text" value="${data.director}">
            genre <input id="edit_genre" class="form-control" type="text" value="${data.genre}">
            image <input id="edit_image" class="form-control" type="text" value="${data.image}"> 
            <button type="button" onClick="updateRecord()">Update Record</button>
            <button type="button" onClick="deleteRecord()">Delete Record</button>
            <button type="button" onClick="cancelEdit()">Cancel</button>
        </form>
    `

    $("#edit").append(html)

}
function cancelEdit(){
    $("#edit").empty();
}

function deleteRecord() {
    let movieID= $("#edit_id").val();
    $.ajax({
        method: "DELETE",
        url: url + "/api/products/deleteMovie/" + movieID,
        data: {},
        async: false,
    }).done(function (data) {
        console.log('Yay it works!', data)
        $("#edit").empty();
        getAllMovies();
    })
}

function getMovieByID(movieID) {
    $.ajax({
        method: "GET",
        url: url + "/api/products/" + movieID,
        data: {},
        async: false,
    }).done(function (data) {
        console.log('Yay it works!', data)
    })
}

function createRecordForm(){
    $("#createRecord").empty();
    let html = `
        <h4>Create Record</h4>
        <form action="">
            Title <input id="title" type="text" class="form-control" placeholder="Enter title">
            Director <input id="director" type="text"  class="form-control" placeholder="Enter Director">
            Genre <input id="genre" type="text"  class="form-control" placeholder="Enter Genre">
            Image <input id="image" type="text"  class="form-control" placeholder="Input image url">
            <br>
            <button type="button" onClick="createRecord()" class="btn btn-warning">create Record</button>
        </form>
    `
    $("#createRecord").append(html)
}

function createRecord() {
    let obj = {
        title: $("#title").val(),
        director: $("#director").val(),
        genre: $("#genre").val(),
        image: $("#image").val(), 
    }

    $.ajax({
        method: "POST",
        url: url + "/api/products/create",
        data: obj,
        async: false,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).done(function (data) {
        getAllMovies();
    })
}

function updateRecord(updateRecord) {
    let obj = {
        id: parseInt($("#edit_id").val()),
        title: $("#edit_title").val(),
        director: $("#edit_director").val(),
        genre: $("#edit_genre").val(),
        image: $("#edit_image").val()
    }

    $.ajax({
        method: "PUT",
        url: url + "/api/products/updateMovie",
        data: JSON.stringify(obj),
        dataType: "json",
        contentType: 'application/json',
    }).done(function (data) {
        $("#edit").empty();
        getAllMovies();
    })
}

function search(columnNames){
    
    $("#searchFilter").empty();
    let html = '<h4>Search</h4><select id="selection" onchange="clearInput()" class="form-control" width="200">'
    let i = 1
    $.each(columnNames, function(key, value, index) {
        html += `<option id="${key}" value="${i}">${key}</option>`
        i++;
    });
    html += '</select>'
    html += '<input type="text" id="userSearch" class="form-control">'
    $("#searchFilter").append(html)
}

function searchTable(){
    return $("#selection").val()
}

function clearInput(){
    $("#userSearch").val("")
    $('.search tr ').show();
}

$(document).ready(function() {
    $(".table tbody").addClass("search");
    $('#userSearch').keyup(function() {
        let idTable = searchTable();
        var rex = new RegExp($(this).val(), 'i');
        console.log($(this).val())
        $('.search tr ').hide();
        $('.search tr ').filter(function(i, v) {
            var $t = $(this).children(":eq(" + idTable + ")");
            return rex.test($t.text());
        }).show();
    })
});
