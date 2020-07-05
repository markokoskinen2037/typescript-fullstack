import express from 'express';
import patientService from '../services/patientService';
const router = express.Router();

router.get('/', (_req, res) => { 
  res.status(200).send(patientService.getAll());
});

export default router;