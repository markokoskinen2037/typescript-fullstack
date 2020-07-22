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
  const temp = entry as NewHospitalEntry
  if (!temp.discharge || !temp.discharge.date || !temp.discharge.criteria) return false
  return true
}

function isNewNewOccupationalHealthcareEntry(entry: NewEntry): entry is NewOccupationalHealthcareEntry {
  return (entry as NewOccupationalHealthcareEntry).employerName !== undefined;
}

const addEntry = (id:string,newEntry:any):Patient|undefined => {

  const targetPatient = acualData.find(patient => patient.id === id)

  if(!targetPatient) return undefined

  const requiredPropertyMissing = ["description", "date", "specialist", "type"].map(key => !!newEntry[key]).includes(false)
  const hasValidType = Object.values(EntryType).includes(newEntry.type);

  if (requiredPropertyMissing) {
    throw new Error("requiredPropertyMissing")
  }

  if(!hasValidType){
    throw new Error("invalidType")
  }

  const temp = newEntry as NewEntry

  switch (temp.type) {
    case "HealthCheck":
      if (!isHealthCheckEntry(temp)) {
        throw new Error("missingEntrySpecificProperties")
      } else {
        acualData = acualData.map(e => {
          if(e.id !== id) return e
          return {
            ...e,
            entries: e.entries.concat({
              ...temp,
              id: (Math.random() * 100).toString(),
            })
          }
        })
      }
      break;
    case "Hospital":
      if (!isNewHospitalEntry(temp)) {
        throw new Error("missingEntrySpecificProperties")
      } else {
        acualData = acualData.map(e => {
          if (e.id !== id) return e
          return {
            ...e,
            entries: e.entries.concat({
              ...temp,
              id: (Math.random() * 100).toString(),
            })
          }
        })
      } 
      break;
    case "OccupationalHealthcare":
      if (!isNewNewOccupationalHealthcareEntry(temp)) {
        throw new Error("missingEntrySpecificProperties")
      } else {

        if (temp.sickLeave && (!temp.sickLeave.endDate || !temp.sickLeave.startDate)){
          delete temp.sickLeave
        }

        acualData = acualData.map(e => {
          if (e.id !== id) return e
          return {
            ...e,
            entries: e.entries.concat({
              ...temp,
              id: (Math.random() * 100).toString(),
            })
          }
        })
      }
      break;
    default:
      break;
  }

  return acualData.find(e => e.id === id)
}

export default {
  getAll,
  add,
  getOne,
  addEntry
};