import React, {useState} from 'react';
import { Modal, Segment, Select } from 'semantic-ui-react';
import HealthCheckEntryForm from './HealthCheckEntryForm';
import HospitalEntryForm from './HospitalEntryForm';
import { NewHealthCheckEntry, NewHospitalEntry, NewOccupationalHealthcareEntry } from '../types';
import { OccupationalHealthcareEntryForm } from './OccupationalHealthcareEntryForm';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: NewHealthCheckEntry|NewHospitalEntry|NewOccupationalHealthcareEntry) => void;
  error?: string;
}

const options = [
  { key: "NewHealthCheckEntry", value: "NewHealthCheckEntry",text:"Healt Check"},
  {key: "NewHospitalEntry", value: "NewHospitalEntry", text:"Hospital"},
  { key: "NewOccupationalHealthcareEntry", value:"NewOccupationalHealthcareEntry", text:"Occupational Healthcare"}]

const AddEntryModal = ({ modalOpen, onClose, onSubmit, error }: Props) => {
  const [selectedEntryType, setSelectedEntryType] = useState<string|undefined>("")

  function getForm(){
    switch (selectedEntryType) {
      case "NewHealthCheckEntry":
        return <HealthCheckEntryForm onSubmit={onSubmit} onCancel={onClose} />
      case "NewHospitalEntry" :
        return <HospitalEntryForm onSubmit={onSubmit} onCancel={onClose} />
      case "NewOccupationalHealthcareEntry":
        return <OccupationalHealthcareEntryForm onSubmit={onSubmit} onCancel={onClose} />
      default:
        break;
    }
  }

  return (
    <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
      <Modal.Header>Add a new entry</Modal.Header>
      <Modal.Content>
        {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
        <Select value={selectedEntryType} onChange={(a,b) => setSelectedEntryType(b.value?.toString())} placeholder='Select type of entry to create' options={options} />
        {selectedEntryType && getForm()}
      </Modal.Content>
    </Modal>
  )
} ;

export default AddEntryModal;
