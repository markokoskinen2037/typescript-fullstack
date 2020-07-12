import React from "react";
import axios from "axios";
import { Header, Icon, SemanticICONS } from "semantic-ui-react";

import { Patient, Gender } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue, updatePatientListAction } from "../state";
import { useParams } from "react-router-dom";

const SinglePatientPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [{ patients, diagnoses }, dispatch] = useStateValue();
  React.useEffect(() => {
    const fetchSinglePatient = async () => {
      try {
        const { data: patientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(updatePatientListAction(patientFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    if(!patients[id]?.ssn) fetchSinglePatient();
  }, [dispatch,id]);

  const patient = patients[id] 

  if(!patient) return null

  const getIconName = (): SemanticICONS => {
    switch (patient.gender) {
      case Gender.Female:
        return "female"
      case Gender.Male:
        return "male"
      case Gender.Other:
        return "question"
      default:
        return "question"
    }
  }

  const iconName = getIconName()

  const getDiagnosisName = (code:string) => {
    const temp = diagnoses.find(d => {
      return d.code === code
    })

    return temp?.name
  }

  return (
    <div className="singlePatient">
      <Header as="h2">{patient.name} <Icon name={iconName}/> </Header>
      <div>SSN: {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>
      {!!patient.entries.length && <h2>entries</h2>}
      {patient.entries.map(entry => {
        return (
          <div key={entry.id}>
          <div>{entry.date} {entry.description}</div>
          <ul>
          {entry.diagnosisCodes?.map((code) => (
            <li key={code}>{code} - {getDiagnosisName(code)}</li>
          ))}
          </ul>
        </div>
      )
      })}
    </div>
  );
};

export default SinglePatientPage;
