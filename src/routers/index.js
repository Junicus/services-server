import { Router } from 'express';
import passport from 'passport';
import apiRouter from './apiRouter';

const routes = Router();

routes.get('/', passport.authenticate('oauth-bearer', { session: false }),
  (req, res) => {
    var claims = req.authInfo;
    console.log('User info: ', req.user);
    console.log('Validated claims: ', claims);

    res.status(200).json({ 'name': claims['name'] });
  });

routes.use('/api', apiRouter);

export default routes;