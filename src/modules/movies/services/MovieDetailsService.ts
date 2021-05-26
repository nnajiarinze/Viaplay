import axios from 'axios';
import { Either,right, left} from 'fp-ts/lib/Either';
import { getLineAndCharacterOfPosition } from 'typescript';

interface ImdbMovieDetails {
    id:string
}


interface MovieDetails {
    "_embedded": {
        "viaplay:blocks": [
            {
                "_embedded" : {
                    "viaplay:product": {
                        "content": {
                            "imdb": ImdbMovieDetails
                        }
                    }
                }
            }
        ]
    }
}


class MovieDetailsService {

    async getMovieDetails(movieResourceLink:string) :Promise<Either<Error, ImdbMovieDetails>> {
     
     try {
        
        const response = await axios.get<MovieDetails>(movieResourceLink);
        const {data} = response;
        return right(data._embedded['viaplay:blocks'][0]._embedded['viaplay:product'].content.imdb);     
     } catch(error){
        return left(new Error(error));
     }    
    }
}

export default MovieDetailsService;