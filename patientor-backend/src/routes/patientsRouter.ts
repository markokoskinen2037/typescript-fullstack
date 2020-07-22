import express from 'express';
import patientService from '../services/patientService';
import {toNewPatientEntry} from '../utils';
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

router.post("/:id/entries", (req,res) => {
  const id = req.params.id
  try{
    const result = patientService.addEntry(id,req.body)
    return res.status(200).json(result)
  } catch (e){
    return res.status(400).json(e)
  }
})

export default router;