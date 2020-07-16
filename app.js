'use strict'

function getAllMovies(){
    $.ajax({
        method: "GET",
        url: "http://localhost:3000/api/products",
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
        url: "http://localhost:3000/api/products/" + movieID, 
        data: {}, 
        async: false, 
    }).done(function( data ) {
        console.log('Yay it works!', data)
    })
}
