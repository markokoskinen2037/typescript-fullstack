import express from 'express';
import bmiCalc = require('./bmiCalculator');

const app = express();

const PORT = 3000;

app.get('/hello', (_req, res) => {
  return res.status(200).send('Hello Full Stack');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight)) return res.status(400).json({ error: 'malformed parameters' });

  const bmiMessage = bmiCalc(height, weight);

  return res.status(200).json({
    weight,
    height,
    bmi: bmiMessage,
  });
});

app.listen(PORT, () => {
  console.log('Server ready on port', PORT);
});
