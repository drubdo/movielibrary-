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

function createRecord(newRecord){
    $.ajax({
        method: "POST", 
        url: url + "/api/products/create", 
        data: newRecord, 
        async: false, 
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