function getMovie() {
    const API_KEY = "6431560a";
    let movieId = sessionStorage.getItem('movieId');

    fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&i=${movieId}`)
        .then((response) => {
            //console.log(response)
            return response.json();
        })
        .then(displayMovie)
        .catch((err) => {
            console.log(err);
        })
}

function displayMovie(movie) {

    //console.log(movie);
    const movieDiv = document.querySelector("#movie");

    let outputStr = `
        <div class="wrapper">
            <div class="left-section">
                <img src="${movie.Poster}" class="thumbnail">
            </div>
            <div class="right-section">
                <h2>${movie.Title}</h2>
                <ul class="list-group">
                    <li class="list-group-item"><strong>Genre: </strong> ${movie.Genre}</li>
                    <li class="list-group-item"><strong>Released: </strong> ${movie.Released}</li>
                    <li class="list-group-item"><strong>Rated: </strong> ${movie.Rated}</li>
                    <li class="list-group-item"><strong>IMDB Rating: </strong> ${movie.imdbRating}</li>
                    <li class="list-group-item"><strong>Director: </strong>${movie.Director}</li>
                    <li class="list-group-item"><strong>Writer: </strong>${movie.Writer}</li>
                    <li class="list-group-item"><strong>Actors: </strong>${movie.Actors}</li>
                </ul>
            </div>
        </div>
        <div class="info">
            <div class="well">
                <h3>Plot</h3>
                <hr>
                <div class="desc">
                     ${movie.Plot}
                </div>
                <a href="http://www.imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
                <a href="index.html" target="_blank" class="btn btn-default">Go Back To Search</a>
            </div>
        </div>
    `;
    movieDiv.innerHTML = outputStr;

}
getMovie();