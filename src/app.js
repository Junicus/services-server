import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import bodyParser from 'body-parser';
import passport from 'passport';
import { BearerStrategy as OIDCBearerStrategy } from 'passport-azure-ad';
import routes from './routes';

const oidcOptions = {
  identityMetadata: process.env.IDENTITY_METADATA,
  clientID: process.env.CLIENT_ID,
  validateIssuer: true,
  passReqToCallback: false,
};

console.log(oidcOptions);

let owner = null;

const app = express();
app.disable('x-powered-by');

app.use(logger('dev'));

app.use(cors());

app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

const bearerStrategy = new OIDCBearerStrategy(oidcOptions, (token, done) => {
  console.log(token, 'was the token retrieved');
  if (!token.oid)
    done(new Error('oid is not found in token'));
  else {
    owner = token.oid;
    done(null, token);
  }
});

passport.use(bearerStrategy);

app.use('/', passport.authenticate('oauth-bearer'), routes);

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