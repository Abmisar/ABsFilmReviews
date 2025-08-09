import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
import axios from "axios";
import { name } from "ejs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;
app.use(express.static("public"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//yo

const myAPI = "4ccfe19a654733ef50f0ffbcd15976a3";
const options = {
  method: "GET",
  url: "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0Y2NmZTE5YTY1NDczM2VmNTBmMGZmYmNkMTU5NzZhMyIsIm5iZiI6MTc1NDU4MjAzMy44MDksInN1YiI6IjY4OTRjYzExYjg0OGMzMWYzNjI4YTQ5YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hYzhQeURuxHFaBDYV4F6Wu30GHfMHKAJOq3H8vCN-S4",
  },
};
// app.get("/random", async (req, res) => {
//   // try{
//   //     const result = await axios.get(options)
//   //     console.log(JSON.stringify(result))
//   // } catch (error) {
//   //     res.render("random.ejs", { name: JSON.stringify(error) });
//   // }

//   axios
//     .request(options)
//     .then((res) => console.log(res.data))
//     .catch((err) => console.error(err));
// const results = res.data.results;
// const movie = results[Math.floor(Math.random() * results.length)];

// res.render("random.ejs", {
//   poster: "https://image.tmdb.org/t/p/original" + movie.backdrop_path,
//   name: movie.original_title,
//   overview: movie.overview,
// });
// app.get("/random", async (req, res) => {
//   try {
//     const response = await axios.request(options);
//     const results = response.data.results;
//     const movie = results[Math.floor(Math.random() * results.length)];

//     res.render("random.ejs", {
//       poster: "https://image.tmdb.org/t/p/original" + movie.backdrop_path,
//       name: movie.original_title,
//       overview: movie.overview,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Error fetching movie data");
//   }
// // });
// app.get("/random", async (req, res) => {
//   try {
//     // First get the total number of pages
//     const firstRequest = await axios.request(options);
//     const totalPages = firstRequest.data.total_pages;
    
//     // Randomly select a page (TMDB API allows max page 500)
//     const randomPage = Math.floor(Math.random() * 20) + 1;
    
//     // Create new options with the random page
//     const randomPageOptions = {
//       ...options,
//       url: `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${randomPage}&with_original_language=en&vote_average.gte=9&sort_by=popularity.desc`
//     };
    
//     // Fetch the random page
//     const response = await axios.request(randomPageOptions);
//     const results = response.data.results;
    
//     // Select a random movie from the page
//     const movie = results[Math.floor(Math.random() * results.length)];

//     res.render("random.ejs", {
//       poster: movie.backdrop_path 
//         ? "https://image.tmdb.org/t/p/original" + movie.backdrop_path 
//         : null, // Handle case where backdrop might be missing
//       name: movie.original_title,
//       overview: movie.overview,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Error fetching movie data");
//   }
// });

app.get("/random", async (req, res) => {
  try {
    // Get total pages (capped at 500 per TMDB limits)
    const firstRequest = await axios.request(options);
    const totalPages = Math.min(firstRequest.data.total_pages, 500);
    
    // Create weighted probability - 80% chance from first 20 pages
    const popularPages = 20;
    const randomPage = Math.random() < 0.8 
      ? Math.floor(Math.random() * popularPages) + 1
      : Math.floor(Math.random() * (totalPages - popularPages)) + popularPages + 1;
    
    const randomPageOptions = {
      ...options,
      url: options.url.replace(/page=\d+/, `page=${randomPage}`)
    };
    
    const response = await axios.request(randomPageOptions);
    const results = response.data.results;
    const movie = results[Math.floor(Math.random() * results.length)];

    res.render("random.ejs", {
      poster: movie.backdrop_path ? "https://image.tmdb.org/t/p/original" + movie.poster_path : null,
      name: movie.title || movie.original_title, // Use localized title if available
      overview: movie.overview,
      popularity: movie.popularity // Pass popularity to template if needed
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching movie data");
  }
});

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/favorite", (req, res) => {
  res.render("favorite.ejs");
});

app.get("/500days", (req, res) => {
  res.render("500days.ejs");
});

app.get("/aftersun", (req, res) => {
  res.render("aftersun.ejs");
});

app.get("/theNotebook", (req, res) => {
  res.render("theNotebook.ejs");
});

app.get("/pastLives", (req, res) => {
  res.render("pastLives.ejs");
});

app.get("/se7en", (req, res) => {
  res.render("se7en.ejs");
});

app.get("/oldboy", (req, res) => {
  res.render("oldboy.ejs");
});

app.get("/four", (req, res) => {
  res.render("four.ejs");
});

app.get("/about", (req, res) => {
  res.render("about.ejs");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});
