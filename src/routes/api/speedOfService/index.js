import { Router } from 'express';

const routes = Router();

const getDateFromQuery = (date) => {
  const result = new Date(0);
  result.setMilliseconds(date);
  return result;
}

routes.get('/summaries', (req, res) => {
  const { date } = req.query;
  const reqDate = getDateFromQuery(date);
  res.json({
    success: true,
    data: []
  });
});

routes.get('/averages', (req, res) => {
  const { date } = req.query;
  const reqDate = getDateFromQuery(date);
  res.json({
    success: true,
    data: []
  });
});

export default routes;