const search = document.querySelector(".user_input");
const container = document.querySelector(".container");

const getMovieDetails = async () => {
  const searchApi = await fetch(
    `https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=${search.value}`
  );
  const data = await searchApi.json();
  console.log(data);
  const { results } = data;
  console.log(results);

  results.forEach((res) => {
    cardMovie(
      res.original_title,
      res.overview,
      res.backdrop_path,
      res.vote_average,
      res.release_date
    );
  });
};

const cardMovie = (title, desc, Imagelink, ratings, rdate) => {
  const card_movie = document.createElement("div");
  card_movie.classList.add("card_movie");
  card_movie.style.backgroundImage = `url(https://image.tmdb.org/t/p/w1280${Imagelink})`;

  const m_details = document.createElement("div");
  m_details.classList.add("m_details");

  const ratingDate = document.createElement("div");
  ratingDate.classList.add("ratingDate");
  ratingDate.innerHTML = `<span class="rating"><i class="fa-solid fa-star"></i>${
    Math.round(ratings * 100) / 100
  }/10</span><span class="rdate"><i class="fa-solid fa-calendar-days"></i>${rdate}</span>`;

  const m_title = document.createElement("h3");
  m_title.classList.add("m_title");
  m_title.textContent = title;

  const overflow = document.createElement("div");
  overflow.classList.add("overflow");

  const m_desc = document.createElement("p");
  m_desc.classList.add("m_desc");
  m_desc.textContent = desc;

  container.appendChild(card_movie);
  card_movie.appendChild(m_title);
  card_movie.appendChild(m_details);
  m_details.appendChild(ratingDate);
  m_details.appendChild(overflow);
  overflow.appendChild(m_desc);
};

const clearCardMovie = () => {
  const cardMovie = document.querySelectorAll(".card_movie");
  cardMovie.forEach((card) => {
    card.remove();
  });
};

search.addEventListener("input", (e) => {
  if (container.innerHTML === "\n      ") {
    getMovieDetails();
  } else {
    clearCardMovie();
    getMovieDetails();
  }
});

// const APIURL =    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
// const IMGPATH = "https://image.tmdb.org/t/p/w1280";
// const SEARCHAPI =     "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

// const res = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${searchInput.value.toLowerCase()}`);
// const data = await res.json();
// const { name, id, weight, height, stats, sprites, types } = data;
