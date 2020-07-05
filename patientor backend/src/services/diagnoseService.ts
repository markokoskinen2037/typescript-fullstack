import jsonData from '../../data/diagnoses.json';
import { Diagnose } from '../types';

const acualData: Array<Diagnose> = jsonData;

const getAll = (): Array<Diagnose> => {
  return acualData;
};

export default {
  getAll,
};