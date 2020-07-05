const PORT = 3001;
import diagnosisRouter from './routes/diagnosisRouter';
import patientsRouter from './routes/patientsRouter';
import express from 'express';
import cors from "cors";
const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/ping', (_req, res) => { 
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diagnoses', diagnosisRouter);
app.use('/api/patients', patientsRouter);
  
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});