import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from 'passport';

import './db';
import './passport';
import routes from './routes';
import apiRouter from './apiRouter';

const app = express();
app.use(express.static(path.join(__dirname, '../client/build')));
app.get("*", (_, res) => res.sendFile(path.join(__dirname, '../client/build/index.html')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(session({
    secret: process.env.SESSION_KEY,
    resave: true,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGOATLAS_URL })
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(routes.api, apiRouter);

app.listen(process.env.PORT, () => console.log(`Server is listening on port ${process.env.PORT} ✅`));
export default app;