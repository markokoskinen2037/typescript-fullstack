import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry from '../utils';
const router = express.Router();

router.get('/', (_req, res) => { 
  res.status(200).send(patientService.getAll());
});

router.get('/:id', (req, res) => { 
  const id = req.params.id;
  res.status(200).send(patientService.getOne(id));
});

router.post("/", (req,res) => {
  const newPatient = toNewPatientEntry(req.body);
  res.status(200).send(patientService.add(newPatient));
});

export default router;