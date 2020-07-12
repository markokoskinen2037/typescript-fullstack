import express from 'express';
import bmiCalc = require('./bmiCalculator');
import exerciseCalculator = require('./exerciseCalculator');
import { isArray } from 'util';

const app = express();
app.use(express.json());

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface rb {  daily_exercises?: any,  target?:any}

app.post("/exercises", (req,res) =>{
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const {daily_exercises,target} :rb = req.body;

  if(!daily_exercises || !target) return res.status(400).json({error:"parameters missing"});
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if(!isArray(daily_exercises) || (daily_exercises.find((e:any) => typeof e !== "number")) || isNaN(target))
    return res.status(400).json({error:"malformatted parameters"});

  const results = exerciseCalculator(daily_exercises,target);
  return res.status(200).send(results);
});

app.listen(PORT, () => {
  console.log('Server ready on port', PORT);
});
