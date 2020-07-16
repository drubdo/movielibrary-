var cors = require("cors");
const validators = require("./validators/custom-validators.js");
const repoContext = require("./repository/repository-wrapper.js");
const express = require('express');
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => validators.body(req, res, next));

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

   app.post("/api/products/create", (req, res) => {
    let newProduct = req.body;
    let addedProduct = repoContext.movies.createMovie(newProduct);
    res.send(addedProduct);
   });

   app.put("/api/products/updateMovie", (req, res) => {
    let productToUpdate = req.body;
    let updatedProduct = repoContext.movies.updateMovie(productToUpdate);
    res.send(updatedProduct);
   });
   app.delete("/api/products/deleteMovie/:id", (req, res) => {
    let id = req.params.id;
    let updatedDataSet = repoContext.movies.deleteMovie(id);
    res.send(updatedDataSet);
   });