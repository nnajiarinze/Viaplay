import { UseCaseError } from "../../../../core/domain/UseCaseError";

export namespace GetMovieTrailerLinkErrors{

   export class InvalidParameters extends UseCaseError {

        constructor(){
            super("Invalid parameters");
        }
    }

    export class NotFound extends UseCaseError {

        constructor(){
            super("Movie Trailer not found");
        }
    }
};

