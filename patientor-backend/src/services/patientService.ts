import jsonData from '../../data/patients';
import { Patient, NewPatientEntry, NewEntry, EntryType, NewHealthCheckEntry, NewHospitalEntry, NewOccupationalHealthcareEntry } from '../types';
import {toNewPatientEntry} from '../utils';

let acualData: Array<Patient> = jsonData.map(obj => {
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

function isHealthCheckEntry(entry: NewEntry): entry is NewHealthCheckEntry {
  return (entry as NewHealthCheckEntry).healthCheckRating !== undefined;
}

function isNewHospitalEntry(entry: NewEntry): entry is NewHospitalEntry {
  const temp = entry as NewHospitalEntry;
  if (!temp.discharge || !temp.discharge.date || !temp.discharge.criteria) return false;
  return true;
}

function isNewNewOccupationalHealthcareEntry(entry: NewEntry): entry is NewOccupationalHealthcareEntry {
  return (entry as NewOccupationalHealthcareEntry).employerName !== undefined;
}

const addEntry = (id:string,newEntry:NewEntry):Patient|undefined => {

  const targetPatient = acualData.find(patient => patient.id === id);

  if(!targetPatient) return undefined;

  if(!newEntry.description || !newEntry.date || !newEntry.specialist || ! newEntry.type){
    throw new Error("requiredPropertyMissing");
  }

  if (!(newEntry.type in EntryType)){
    throw new Error("invalidType");
  }

  switch (newEntry.type) {
    case "HealthCheck":
      if (!isHealthCheckEntry(newEntry)) {
        throw new Error("missingEntrySpecificProperties");
      } else {
        acualData = acualData.map(e => {
          if(e.id !== id) return e;
          return {
            ...e,
            entries: e.entries.concat({
              ...newEntry,
              id: (Math.random() * 100).toString(),
            })
          };
        });
      }
      break;
    case "Hospital":
      if (!isNewHospitalEntry(newEntry)) {
        throw new Error("missingEntrySpecificProperties");
      } else {
        acualData = acualData.map(e => {
          if (e.id !== id) return e;
          return {
            ...e,
            entries: e.entries.concat({
              ...newEntry,
              id: (Math.random() * 100).toString(),
            })
          };
        });
      } 
      break;
    case "OccupationalHealthcare":
      if (!isNewNewOccupationalHealthcareEntry(newEntry)) {
        throw new Error("missingEntrySpecificProperties");
      } else {

        if (newEntry.sickLeave && (!newEntry.sickLeave.endDate || !newEntry.sickLeave.startDate)){
          delete newEntry.sickLeave;
        }

        acualData = acualData.map(e => {
          if (e.id !== id) return e;
          return {
            ...e,
            entries: e.entries.concat({
              ...newEntry,
              id: (Math.random() * 100).toString(),
            })
          };
        });
      }
      break;
    default:
      break;
  }

  return acualData.find(e => e.id === id);
};

export default {
  getAll,
  add,
  getOne,
  addEntry
};