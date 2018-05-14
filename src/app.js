import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import bodyParser from 'body-parser';
import passport from 'passport';
import { BearerStrategy } from 'passport-azure-ad';
import routers from './routers';

const options = {
  identityMetadata: 'https://login.microsoftonline.com/common/v2.0/.well-known/openid-configuration/',
  clientID: process.env.CLIENT_ID,
  issuer: process.env.ISSUER,
  validateIssuer: true,
  loggingLevel: 'info',
  passReqToCallback: false,
};

const bearerStrategy = new BearerStrategy(options, (token, done) => {
  done(null, {}, token);
});

const app = express();
app.disable('x-powered-by');
app.use(logger('dev'));
app.use(passport.initialize());
passport.use(bearerStrategy);
app.use(cors());
app.use(bodyParser.json());

app.use('/', routers);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500)
    .json({
      status: err.status || 500,
      message: err.message
    });
});

export default app;