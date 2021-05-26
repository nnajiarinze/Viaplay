import express from 'express';
import bodyParser from 'body-parser';
import { routerV1 } from './router';

var app = express();
app.use(bodyParser.json());
app.use('/api/v1', routerV1);


const port = process.env.PORT || 8081;

app.listen(port, () => {
    console.log('server is up on port ', port);

});

module.exports = app;