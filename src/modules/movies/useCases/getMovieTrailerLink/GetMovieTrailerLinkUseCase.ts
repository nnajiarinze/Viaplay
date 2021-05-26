import { Either, isLeft, right, left, isRight } from "fp-ts/lib/Either";
import { UseCase } from "../../../../core/domain/UseCase";
import MovieDetailsService from "../../services/MovieDetailsService";
import TrailerService from "../../services/TrailerService";
import {AppCache} from '../../../../core/cache/AppCache';
import {GetMovieTrailerLinkErrors} from './GetMovieTrailerLinkErrors';

interface Request {
    movieResourceLink: string
}

type Response = Either<GetMovieTrailerLinkErrors.InvalidParameters | GetMovieTrailerLinkErrors.NotFound, string>;

class GetMovieTrailerLinkUseCase implements UseCase<Request, Response> {

    private appCache:AppCache;
    private movieDetailsService: MovieDetailsService;
    private trailerService: TrailerService;

    constructor(appCache:AppCache, movieDetailsService: MovieDetailsService, trailerService: TrailerService) {
        this.movieDetailsService = movieDetailsService;
        this.trailerService = trailerService;
        this.appCache = appCache;
    }

    async execute(req: Request) {
        const movieDetails = await this.movieDetailsService.getMovieDetails(req.movieResourceLink);
        if (isLeft(movieDetails)) {
            return left(new GetMovieTrailerLinkErrors.NotFound());
        }

        const { id } = movieDetails.right;
        const cacheTrailerValueResult = await this.appCache.getValue<string>(id);
        
        if(isRight(cacheTrailerValueResult)){
            const cacheTrailerValue = cacheTrailerValueResult.right;
            if(cacheTrailerValue) return right(cacheTrailerValue);
        }
        
        const trailerDetail = await this.trailerService.getTrailer(id);


        if (isLeft(trailerDetail)) {
            return left(new GetMovieTrailerLinkErrors.NotFound());
        }
        const { key } = trailerDetail.right

        const trailerUrl ="https://www.youtube.com/watch?v="+key;
        await this.appCache.storeValue(id,trailerUrl);
     
        return right(trailerUrl);
    }
}

export default GetMovieTrailerLinkUseCase;