import { State } from "./state";
import { Patient, Diagnosis } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
    type: "UPDATE_PATIENT_LIST";
    payload: Patient;
  }
  | {
    type: "SET_DIAGNOSES_LIST";
    payload: Diagnosis[];
  };

export const setPatientListAction = (patientList: Patient[]) : Action => ({
  type: "SET_PATIENT_LIST", payload: patientList 
})

export const updatePatientListAction = (patient: Patient) : Action => ({
  type: "UPDATE_PATIENT_LIST", payload: patient
})

export const addPatientAction = (patient: Patient) : Action => ({
  type: "ADD_PATIENT", payload: patient
})

export const setDiagnosesListAction = (diagnosesList: Diagnosis[]) : Action => ({
  type: "SET_DIAGNOSES_LIST", payload: diagnosesList 
})

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "UPDATE_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id] : action.payload
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "SET_DIAGNOSES_LIST":
      return {
        ...state,
        diagnoses: action.payload
      }
    default:
      return state;
  }
};
