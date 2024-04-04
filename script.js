const tmdbKey = 'c7d41e4a76b0a1ffa0dce94d96b01076';
const tmdbBaseUrl = 'https://api.themoviedb.org/3';
const playBtn = document.getElementById('playBtn');

const getGenres = async () => {
    const genreRequestEndpoint = "/genre/movie/list";
    const requestParams = `?api_key=${tmdbKey}`
    const urlToFetch = `${tmdbBaseUrl}${genreRequestEndpoint}${requestParams}`;

    try {
        const response = await fetch(urlToFetch);
        if (response.ok){
            const jsonResponse = await response.json();
            const genres = jsonResponse.genres; 
            return genres;
        } else {
            throw new Error("Failed to fetch genres");
        }
    } catch (error) {
        console.log(error);
        return [];
    }
};

const getMovies = async () => {
    const selectedGenre = getSelectedGenre();
    const discoverMoviesEndpoint = "/discover/movie";
    const requestParams = `?api_key=${tmdbKey}&with_genres=${selectedGenre}`;
    const urlToFetch = `${tmdbBaseUrl}${discoverMoviesEndpoint}${requestParams}`;

    try {
        const response = await fetch(urlToFetch);
        if (response.ok){
            const jsonResponse = await response.json();
            const movies = jsonResponse.results;
            return movies;
        } else {
            throw new Error("Failed to fetch movies");
        }
    } catch (error){
        console.log(error);
        return [];
    }
};

const getMovieInfo = async (movie) => {
    const movieId = movie.id;
    const movieInfoEndpoint = `/movie/${movieId}`;
    const requestParams = `?api_key=${tmdbKey}`
    const urlToFetch = `${tmdbBaseUrl}${movieInfoEndpoint}${requestParams}`;

    try {
        const response = await fetch(urlToFetch);
        if (response.ok){
            const jsonResponse = await response.json();
            const movieInfo = jsonResponse;
            return movieInfo;
        } else {
            throw new Error("Failed to fetch movie info");
        }
    } catch(error) {
        console.log(error);
        return null;
    }
};

const showRandomMovie = async () => {
    const movieInfo = document.getElementById('movieInfo');
    if (movieInfo.childNodes.length > 0) {
        clearCurrentMovie();
    };

    const movies = await getMovies();
    if (movies.length > 0) {
        const randomMovie = getRandomMovie(movies);
        if (randomMovie) {
            const info = await getMovieInfo(randomMovie);
            displayMovie(info);
        } else {
            console.error("Random movie is undefined");
        }
    } else {
        console.error("No movies found");
    }
};

getGenres().then(populateGenreDropdown);
playBtn.onclick = showRandomMovie;