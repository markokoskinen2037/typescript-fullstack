import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry from '../utils';
const router = express.Router();

router.get('/', (_req, res) => { 
  res.status(200).send(patientService.getAll());
});

router.post("/", (req,res) => {
  const newPatient = toNewPatientEntry(req.body);
  res.status(200).send(patientService.add(newPatient));
});

export default router;