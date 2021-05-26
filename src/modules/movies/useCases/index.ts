import MovieDetailsService from "../services/MovieDetailsService";
import TrailerService from "../services/TrailerService";
import GetMovieTrailerLinkController from "./getMovieTrailerLink/GetMovieTrailerLinkController";
import GetMovieTrailerLinkUseCase from "./getMovieTrailerLink/GetMovieTrailerLinkUseCase";
import redisCache from "../../../core/cache/RedisCache";

const movieDetailsService = new MovieDetailsService();
const trailerService = new TrailerService();

const getMovieTrailerLinkUseCase = new GetMovieTrailerLinkUseCase (redisCache,movieDetailsService,trailerService);

const getMovieTrailerLinkController = new GetMovieTrailerLinkController(getMovieTrailerLinkUseCase);


export {getMovieTrailerLinkController};