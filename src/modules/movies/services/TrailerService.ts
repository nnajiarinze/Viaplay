import axios from 'axios';
import { Either, right, left } from 'fp-ts/lib/Either';

const FINAL_TRAILER = "Final Trailer";
const TRAILER = "Trailer"; 

interface TheMovieDBResult {
    id: string;
    type: string;
    name: string;
    key: string;
}

interface TheMovieDBResp {
    id: string;
    results: TheMovieDBResult[];

}
class TrailerService {

    async getTrailer(imdbId: string): Promise<Either<Error, TheMovieDBResult>> {

        try {
            const apiKey = process.env.THE_MOVIE_DB_API_KEY;
            const url = 'https://api.themoviedb.org/3/movie/' + imdbId + '/videos?api_key='+apiKey+'&language=en-US'
            const response = await axios.get<TheMovieDBResp>(url);

            const { data } = response;

            const trailerDetail = data.results;
            let resultTrailer = null;

        for (let i=0; i< trailerDetail.length; i++) {
            if(trailerDetail[i].name === FINAL_TRAILER && trailerDetail[i].type == TRAILER) {
                    resultTrailer = trailerDetail[i];
                    break;
            }
            if(trailerDetail[i].name === TRAILER && trailerDetail[i].type == TRAILER) {
                resultTrailer = trailerDetail[i];
            }
        }
         if(!resultTrailer) {
             return left(new Error("no trailer found"));
         }
        return right(resultTrailer);
        } catch (error) {
            return left(new Error(error));
        }
    }

}

export default TrailerService;