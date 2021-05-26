import express from 'express';
import {getMovieTrailerLinkController} from '../useCases/index';

const moviesRouter = express.Router();

moviesRouter.get('/getTrailerLink', (req,res) => getMovieTrailerLinkController.execute(req,res) );


export {moviesRouter};