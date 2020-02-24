import * as express from 'express';

const app = express();
app.get('/', (_, response) => response.send(process.env.NODE_ENV === 'production' ? 'prod' : 'dev'))

export const server = app;

