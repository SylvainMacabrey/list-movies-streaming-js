const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '1eb46ff9bamsh448dd4c642ac6ffp13bc49jsn0da95491f53d',
		'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
	}
};

let page = 1;
let stream = "netflix";
let movies = [];
let totalPages = 0;

const list_movie_div = document.querySelector('.list-movie');
const btn_pagination = document.querySelector('.btn-pagination');
const list = document.querySelector('.list');
const title = document.querySelector('.title-stream');

const api = async () => {
	try {
		const response = await fetch(`https://streaming-availability.p.rapidapi.com/search/basic?country=us&service=${stream}&type=movie&page=${page}&output_language=en&language=en`, options);
		const resJson = await response.json();
		movies = resJson.results;
		console.log(resJson);
		totalPages = resJson.total_pages;
	} catch (error) {
		console.error(error);
	}
}

const changeStream = (s) => {
	stream = s;
	page = 1;
	movies = [];
	list.innerHTML = "";
	affichage();
	btn_pagination.style.display = "inline-block";
}

const affichageMovies = () => {
	movies.forEach((movie) => {
		const movie_panel = document.createElement('div');
		movie_panel.classList.add('movie-panel');
		const title_movie = document.createElement('h4');
		title_movie.classList.add('title-movie');
		title_movie.textContent = movie.title;
		movie_panel.append(title_movie);
		movie_panel.style.backgroundImage = `url("https://image.tmdb.org/t/p/w300/${movie.backdropPath}")`;
		list.append(movie_panel);
	});
}

btn_pagination.addEventListener('click', () => {
	page += 1;
	api();
	console.log(page, totalPages);
	affichageMovies();
	if(page >= totalPages) {
		btn_pagination.style.display = "none";
	} else {
		btn_pagination.style.display = "inline-block";
	}
});

const affichage = async () => {
	await api();
	title.innerHTML = `Result for ${stream[0].toUpperCase() + stream.slice(1)}`;
	affichageMovies();
}

affichage();




