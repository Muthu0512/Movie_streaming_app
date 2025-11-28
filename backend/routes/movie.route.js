import express from "express"
import {trendingMovie,getMovieTrailers,getMovieDetails,getSimilarMovies,getMoviesByCategory} from "../controllers/movie.controller.js"

const router=express.Router()

router.get("/trending",trendingMovie);
router.get("/:id/trailers",getMovieTrailers);
router.get("/:id/details",getMovieDetails)
router.get("/:id/similar",getSimilarMovies)
router.get("/:category",getMoviesByCategory)

export default router