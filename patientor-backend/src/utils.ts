import { NewPatientEntry, Gender, EntryType, Entry } from './types';

/* eslint-disable @typescript-eslint/no-explicit-any */

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name: ' + String(name));
  }
  return name;
};

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
      throw new Error('Incorrect or missing date: ' + String(date));
  }
  return date;
};

const parseSsn = (ssn:any) : string => {
  if(!ssn || !isString(ssn) || ssn.split("-").length !== 2 || ssn.split("-")[0].length !== 6 || ssn.split("-")[1].length < 3 || !parseInt(ssn.split("-")[0],10)){
    throw new Error("Incorrect or missing ssn" + String(ssn));
  }
  return ssn;
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseGender = (gender:any) : Gender => {
  if(!gender || !isGender(gender)){
    throw new Error("Invalid gender" + String(gender));
  }
  return gender;
};

const parseOccupation = (occupation:any) : string => {
  if(!isString(occupation)){
    throw new Error("Incorrect occupation" + String(occupation));
  }
  return occupation;
};

const isEntryType = (param: any): param is EntryType => {
  return Object.values(EntryType).includes(param);
};

const parseEntry = (entry:Entry) : Entry => {
  if(!entry || !isEntryType(entry.type)){
    throw new Error("Invalid entryType" + String(entry));
  }
  return entry;
};

const parseEntries = (entries:Entry[]) => {
  if(!entries || entries.length === 0 ||!entries.length) return [];

  return entries.map((e:any) => parseEntry(e));

};

  /* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export const toNewPatientEntry = (object : any): NewPatientEntry => {

  /* eslint-disable @typescript-eslint/no-unsafe-member-access */
  const newEntry: NewPatientEntry = {
    name:parseName(object.name),
    ssn: parseSsn(object.ssn),
    dateOfBirth: parseDate(object.dateOfBirth),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
    entries: parseEntries(object.entries)
  };
  
  return newEntry;
}; 
