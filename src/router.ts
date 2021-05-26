import express from 'express'; 
import {moviesRouter} from './modules/movies/routes';

const routerV1 = express.Router();

routerV1.use('/movies', moviesRouter);

export {routerV1};