import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { TextField, DiagnosisSelection } from "../AddPatientModal/FormField";
import { NewHospitalEntry } from "../types";
import { useStateValue } from "../state";
import { validateDate, validateRequired } from "./helpers";

export type EntryFormValues = NewHospitalEntry;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

export const HospitalEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{
        type:"Hospital",
        description: "",
        date: "",
        specialist: "",
        discharge: {
          criteria: "",
          date:""
        },
        diagnosisCodes: []
      }}
      onSubmit={onSubmit}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
              validate={validateRequired}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
              validate={validateDate}
            />
            <Field
              label="Specialist"
              placeholder="Specialist's name"
              name="specialist"
              component={TextField}
              validate={validateRequired}
            />
            <Field
              label="Discharge date"
              placeholder="YYYY-MM-DD"
              name="discharge.date"
              component={TextField}
              validate={validateDate}
            />
            <Field
              label="Discharge Criteria"
              placeholder="Got cured..."
              name="discharge.criteria"
              component={TextField}
              validate={validateRequired}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />    
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default HospitalEntryForm;
