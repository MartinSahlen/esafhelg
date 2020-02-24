import * as functions from 'firebase-functions';
import {server} from "./server";


export const api = functions
    .region('europe-west1')
    .https
    .onRequest(server);



