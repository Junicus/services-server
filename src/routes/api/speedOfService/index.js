import { Router } from 'express';
import passport from 'passport';

const routes = Router();

const getDateFromQuery = (date) => {
  const result = new Date(0);
  result.setMilliseconds(date);
  return result;
}

routes.get('/summaries', passport.authenticate('oauth-bearer', { session: false }), (req, res) => {
  var claims = req.authInfo;
  console.log('User info: ', req.user);
  console.log('Validated claims: ', claims);

  const { date } = req.query;
  const reqDate = getDateFromQuery(date);
  res.json({
    success: true,
    data: []
  });
});

routes.get('/averages', passport.authenticate('oauth-bearer', { session: false }), (req, res) => {
  var claims = req.authInfo;
  console.log('User info: ', req.user);
  console.log('Validated claims: ', claims);

  const { date } = req.query;
  const reqDate = getDateFromQuery(date);
  res.json({
    success: true,
    data: []
  });
});

export default routes;