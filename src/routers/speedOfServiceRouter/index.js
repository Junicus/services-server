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
    data: {
      keys: { 0: '0 to 5', 1: '5 to 7', 2: '7 to 10', 3: '10 to 15' },
      records: [
        { date, daypart: 'Lunch', summaries: { 0: 59, 1: 60, 2: 40, 3: 30 } }
      ]
    }
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
    data: [
      { date, daypart: 'Lunch', average: 8.9 },
      { date, daypart: 'Dinner', average: 10.32 }
    ]
  });
});

export default routes;