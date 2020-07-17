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
    });
}
getAllMovies();

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