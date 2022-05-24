import functions from 'firebase-functions';
import express from 'express';
import cors from 'cors';
import { randomStandup } from './src/routes/randomStandup.routes.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use(randomStandup);

export const api = functions.https.onRequest(app)