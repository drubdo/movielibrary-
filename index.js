const repoContext = require("./repository/repository-wrapper.js");
const express = require('express');
const app = express();

app.listen(3000, function(){
    console.log("Server started. Listening on port 3000.");
});
console.log(repoContext)
app.get("/api/products", (req, res) => {
    let products = repoContext.movies.findAllMovies();
    res.send(products);
   });

   app.get("/api/products/:id", (req, res) => {
    let id = req.params.id;
    let product = repoContext.movies.findMovieById(id);
    res.send(product);
   });

   