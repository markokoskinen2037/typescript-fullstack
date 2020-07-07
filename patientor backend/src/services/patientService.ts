import jsonData from '../../data/patients.json';
import { Patient, NewPatientEntry } from '../types';
import toNewPatientEntry from '../utils';

const acualData: Array<Patient> = jsonData.map(obj => {
  const object = toNewPatientEntry(obj) as Patient;
  object.id = obj.id; 
  return object;
});

const getAll = (): Omit<Patient,"ssn">[] => {
  return acualData.map(({id,name,dateOfBirth,gender,occupation, entries}) => (
    {
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries
    }
  ));
};

const add = (patient:NewPatientEntry):Patient => {
  acualData.push({
    id: (Math.random()*100).toString(),
    ...patient
  });
  return acualData[acualData.length-1];
};

const getOne = (id:string):Patient|undefined => {
  const result = acualData.find(p => p.id === id);
  return result;
};

export default {
  getAll,
  add,
  getOne
};