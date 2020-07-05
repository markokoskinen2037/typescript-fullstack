import jsonData from '../../data/patients.json';
import { Patient } from '../types';

const acualData: Array<Patient> = jsonData;

const getAll = (): Omit<Patient,"ssn">[] => {
  return acualData.map(({id,name,dateOfBirth,gender,occupation}) => (
    {
      id,
      name,
      dateOfBirth,
      gender,
      occupation
    }
  ));
};

export default {
  getAll,
};