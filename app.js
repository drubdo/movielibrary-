'use strict'

let url = "http://localhost:3000"; 

function getAllMovies(){
    $.ajax({
        method: "GET",
        url: url + "/api/products",
        data: {},
        async: false,  
    }).done(function( data ) {
        console.log('Yay it works!', data) 
generateTable(data)
    });
}
getAllMovies();

function generateTable(data){
    let html;
    html += `
    <table class="table">
    <thead>
     <tr> 
     <th>
     edit
     </th>
     <th>
     id
     </th>
     <th>
     title
     </th>
     <th>
     director
     </th>
     <th>
     genre
     </th>
     </tr>
    </thead>
    `
    $.each(data,function(index,value){

        
        let data = JSON.stringify(value).split('"').join("&quot;");

        html += `
         <tbody>
         <tr>
         <td>
         <button onClick="edit('${data}')">
         edit
         </button>
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
 $("#movies").append(html)
} 

function edit(data){
    console.log(JSON.parse(data))
}

function getMovieByID(movieID){
    $.ajax({
        method: "GET", 
        url: url + "/api/products/" + movieID, 
        data: {}, 
        async: false, 
    }).done(function( data ) {
        console.log('Yay it works!', data)
    })
}

function createRecord(){
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
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).done(function( data ) {
        console.log('Yay it works!', data)
    })
}

function updateRecord(updateRecord){
    $.ajax({
        method: "PUT", 
        url: url + "/api/products/updateMovie", 
        data: newRecord, 
        async: false, 
    }).done(function( data ) {
        console.log('Yay it works!', data)
    })
}