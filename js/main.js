"use strict";

var Movieinfo = () => {
    const API_KEY = "6431560a";
    const searchForm = document.querySelector("#serachForm");
    const inputText = document.querySelector("#searchText");
    let movie = sessionStorage.getItem('movie');
    if (movie !== null) {
        getMovies(API_KEY, movie);
    }
    searchForm.addEventListener("submit", (e) => {
        e.preventDefault();
        let searchText = inputText.value;
        sessionStorage.setItem('movie', searchText);
        getMovies(API_KEY, searchText);
    })
}

function getMovies(key, query) {
    //console.log(q);
    fetch(`http://www.omdbapi.com/?apikey=${key}&s=${query}`)
        .then((response) => {
            //console.log(response)
            return response.json();
        })
        .then(displayResults)
        .catch((err) => {
            console.log(err);
        })
}
function displayResults(data) {
    //console.log(data);
    const movieDiv = document.querySelector("#movies");

    if(data['Response'] === 'False'){
        movieDiv.innerHTML = '';
        sessionStorage.removeItem("movie");
        alert("Movie Not Found");

    } else {
        let movies = data.Search;
        let output = "";

        movies.forEach(function (movie) {
            output += `
        <div class="movie-wrapper">
            <div class="inner text-center">
                <img src="${movie.Poster}">
                <h5>${movie.Title}</h5>
                <button  data-id="${movie.imdbID}" onClick="movieSelected('${movie.imdbID}')" class="movieinfo btn btn-primary">Movie Details</button>
            </div>
        </div>
        `;
        })
        movieDiv.innerHTML = output;}
 
}

function movieSelected(id) {
    sessionStorage.setItem('movieId', id);
    window.location = 'movie.html';
    return false;
}
Movieinfo();