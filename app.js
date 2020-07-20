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
        console.log('Yay it works!', data)
        generateTable(data)
    });
}
getAllMovies();

function generateTable(data) {
    let html;
    html += `
        <table class="table">
            <thead>
                <tr> 
                    <th> edit </th>
                    <th> id </th>
                    <th> title </th>
                    <th> director </th>
                    <th> genre </th>
                </tr>
            </thead>
    `
    $.each(data, function (index, value) {


        let data = JSON.stringify(value).split('"').join("&quot;");

        html += `
         <tbody>
            <tr>
            <td>
                <button onClick="edit('${data}')"> edit </button>
            </td>
            <td> ${value.id} </td>
            <td> ${value.title} </td>
            <td> ${value.director} </td>
            <td> ${value.genre} </td>
            </tr>
         </tbody>     
        `
    })
    html += `</table>`;
<<<<<<< HEAD
 $("#movies").append(html)
} 
=======
    $("#movies").append(html)
}
>>>>>>> c59625e18eea638286eaa68eebd5f62a2af0b3a2

function edit(data) {
    $("#edit").empty();

    data = JSON.parse(data)
    let html = `
        <form action="">
            <input id="edit_id" type="text" value="${data.id}" style="display:none">
            title <input id="edit_title" type="text" value="${data.title}">
            director <input id="edit_director" type="text"  value="${data.director}">
            genre <input id="edit_genre" type="text"   value="${data.genre}">
            <button type="button" onClick="updateRecord()">Update Record</button>
        </form>
    `

    $("#edit").append(html)

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

function createRecord() {
    let obj = {
        title: $("#title").val(),
        director: $("#director").val(),
        genre: $("#genre").val()
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
        console.log('Yay it works!', data)
    })
}

function updateRecord(updateRecord) {
    let obj = {
        id: parseInt($("#edit_id").val()),
        title: $("#edit_title").val(),
        director: $("#edit_director").val(),
        genre: $("#edit_genre").val()
    }

    $.ajax({
        method: "PUT",
        url: url + "/api/products/updateMovie",
        data: JSON.stringify(obj),
        dataType: "json",
        contentType: 'application/json',
    }).done(function (data) {
        console.log('Yay it works!', data)

        $("#edit").empty();
        getAllMovies();
    })
}