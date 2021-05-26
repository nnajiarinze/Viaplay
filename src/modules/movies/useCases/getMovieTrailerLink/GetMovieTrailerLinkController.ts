import { BaseController } from "../../../../core/infrastructure/BaseController";
import { Request, Response } from 'express';
import GetMovieTrailerLinkUseCase from "./GetMovieTrailerLinkUseCase";
import { Either, isLeft, right, left } from "fp-ts/lib/Either";
import { GetMovieTrailerLinkErrors } from "./GetMovieTrailerLinkErrors";
import { ViaplayError } from "../../../../core/domain/ViaplayError";



type RequestQueryParameters = {
   movieResourceLink: string;
}

interface TrailerResponse {
   url:string;
}


class GetMovieTrailerLinkController extends BaseController {

   private useCase: GetMovieTrailerLinkUseCase;

   constructor(useCase: GetMovieTrailerLinkUseCase) {
      super();
      this.useCase = useCase;
   }

   async executeImpl(
      req: Request<{}, {}, {}, RequestQueryParameters>, res: Response,
   ) {
      
      const { movieResourceLink } = req.query;
      if(!movieResourceLink) {
         return this.badRequest(res, new GetMovieTrailerLinkErrors.InvalidParameters().message);
      }
      const result = await this.useCase.execute({ movieResourceLink });
      if (isLeft(result)) {
         const {message} = result.left;
         
        return this.ok(res,new ViaplayError(message));
      }

     const trailerUrl = result.right;
     const trailerResponse:TrailerResponse = {url: trailerUrl};

     
      return this.ok(res,trailerResponse);
   };


}

export default GetMovieTrailerLinkController;