import React from "react";
import axios from "axios";
import { Header, Icon, SemanticICONS, Segment, Button } from "semantic-ui-react";

import { Patient, Gender, Entry, assertNever, Diagnosis, NewHealthCheckEntry, NewHospitalEntry, NewOccupationalHealthcareEntry } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue, updatePatientListAction, updatePatientAction } from "../state";
import { useParams } from "react-router-dom";
import AddEntryModal from "../AddEntryModal";

const EntryDetails: React.FC<{entry: Entry; diagnoses: Diagnosis[]}> = ({entry, diagnoses}) => {
    
  const getDiagnosisName = (code: string) => {
    const temp = diagnoses.find(d => {
      return d.code === code;
    });

    return temp?.name;
  };

const getHpColor = (val: number) => {
  switch (val) {
    case 0:
      return "green";
    case 1:
      return "yellow";
    case 2:
      return "red";
    case 3:
      return "black";
        
    default:
      break;
  }
};
 

  switch (entry.type) {
    case "HealthCheck":
      
      return (
        <Segment key={entry.id}>
          <h4>{entry.date} <Icon size="large" name="doctor" /> </h4>
          <span>{entry.description}</span>
    
          {entry.diagnosisCodes?.map((code) => (
            <li key={code}>{code} - {getDiagnosisName(code)}</li>
          ))}
          <br/>
          <br/>
          <Icon name="heart" color={getHpColor(entry.healthCheckRating)} />
        </Segment>
      );
    case "Hospital":
      return (
        <Segment key={entry.id}>
          <h4>{entry.date} <Icon size="large" name="doctor" /> </h4>
          <span>{entry.description}</span>
          {entry.diagnosisCodes?.map((code) => (
            <li key={code}>{code} - {getDiagnosisName(code)}</li>
          ))}
        </Segment>
      );
    case "OccupationalHealthcare":
      return (
        <Segment key={entry.id}>
          <h4>{entry.date} <Icon size="large" name="warehouse" /> {entry.employerName} </h4>
          <span>{entry.description}</span>
          {entry.diagnosisCodes?.map((code) => (
            <li key={code}>{code} - {getDiagnosisName(code)}</li>
          ))}
          {!!entry.sickLeave && <div style={{fontWeight:"bold"}}>
            Sick leave from {entry.sickLeave.startDate} till {entry.sickLeave.endDate}
            </div>}
        </Segment>
      );
    default:
      return assertNever(entry);
  }


};


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
  }, [dispatch,id,patients]);

  const patient = patients[id]; 

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  if(!patient) return null;

  const getIconName = (): SemanticICONS => {
    switch (patient.gender) {
      case Gender.Female:
        return "female";
      case Gender.Male:
        return "male";
      case Gender.Other:
        return "question";
      default:
        return "question";
    }
  };

  const iconName = getIconName();

  const submitNewEntry = async (values: NewHealthCheckEntry|NewHospitalEntry|NewOccupationalHealthcareEntry) => {
    try {
      const { data: updatedPatient } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch(updatePatientAction(updatedPatient));
      closeModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };

  return (
    <div className="singlePatient">
      <Header as="h2">{patient.name} <Icon name={iconName}/> </Header>
      <div>SSN: {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>
      {!!patient.entries.length && <h2>entries</h2>}
      {patient.entries.map(e => <EntryDetails key={id+e.id} entry={e} diagnoses={diagnoses} />)}
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button onClick={() => openModal()}>Add New Entry</Button>
    </div>
  );
};

export default SinglePatientPage;
