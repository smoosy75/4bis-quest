const express = require("express");
require("dotenv").config();

const app = express();

app.use(express.json());

const port = process.env.APP_PORT ?? 5000;

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};

app.get("/", welcome);

// movies part
const movieHandlers = require("./movieHandlers");

app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);


// VALIDATOR MOVIE
const { validateMovie, validateUser } = require("./validators.js");

app.post("/api/movies", validateMovie, movieHandlers.postMovie);

// movie UPDATE part
app.put("/api/movies/:id", validateMovie, movieHandlers.updateMovie);

// movie DELETE part
app.delete("/api/movies/:id", movieHandlers.deleteMovie);

// ------------------------------------------------------------

// users part
const userHandlers = require("./userHandlers");

app.get("/api/users", userHandlers.getUsers);
app.get("/api/users/:id", userHandlers.getUserById);

// user POST part
app.post("/api/users", validateUser, userHandlers.postUser);

// user UPDATE part
app.put("/api/users/:id", validateUser, userHandlers.updateUser);

// user DELETE part
app.delete("/api/users/:id", userHandlers.deleteUser);

//listen
app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});