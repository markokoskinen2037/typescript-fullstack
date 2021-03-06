
export interface Diagnose {
  code:string,
  name:string,
  latin?:string
} 

export enum Gender {
  Male = "male",
  Female = "female"
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnose['code']>;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type:"OccupationalHealthcare",
  employerName: string,
  sickLeave?: {
    startDate: string,
    endDate: string
  }
}

export interface HospitalEntry extends BaseEntry {
  type:"Hospital",
  discharge: {
    date:string,
    criteria:string
  }
}

export type NewHealthCheckEntry = Omit<HealthCheckEntry,"id">;
export type NewHospitalEntry = Omit<HospitalEntry, "id">;
export type NewOccupationalHealthcareEntry = Omit<OccupationalHealthcareEntry, "id">;


export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;


export enum EntryType {
  HealthCheck = "HealthCheck",
  OccupationalHealthcare="OccupationalHealthcare",
  Hospital="Hospital"
}

export interface Patient {
  id:string,
  name:string,
  dateOfBirth:string,
  ssn:string,
  gender: Gender,
  occupation:string,
  entries: Entry[]
} 

export type NewPatientEntry = Omit<Patient, 'id'>;
export type PublicPatient = Omit<Patient, 'ssn' | 'entries' >;
export type NewEntry = Omit<Entry,"id">;