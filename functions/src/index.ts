import * as functions from 'firebase-functions';

export const api = functions
    .region('europe-west1')
    .https
    .onRequest((request, response) => {
 response.send(process.env.NODE_ENV === 'production' ? 'prod' : 'dev');
});


