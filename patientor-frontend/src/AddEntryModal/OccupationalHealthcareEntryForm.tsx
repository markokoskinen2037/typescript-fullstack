import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { TextField, DiagnosisSelection } from "../AddPatientModal/FormField";
import { NewOccupationalHealthcareEntry } from "../types";
import { useStateValue } from "../state";
import { validateRequired, validateDate, validateDateNotRequired } from "./helpers";

export type EntryFormValues = NewOccupationalHealthcareEntry

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

export const OccupationalHealthcareEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnoses }] = useStateValue()

  return (
    <Formik
      initialValues={{
        type:"OccupationalHealthcare",
        description: "",
        date: "",
        specialist: "",
        employerName:"",
        diagnosisCodes: [],
        sickLeave: {
          endDate: "",
          startDate: ""
        }
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
              validate={validateRequired}
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              validate={validateDate}
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist's name"
              name="specialist"
              validate={validateRequired}
              component={TextField}
            />
            <Field
              label="Employer name"
              placeholder="Toska"
              name="employerName"
              validate={validateRequired}
              component={TextField}
            />
            <Field
              label="Sick leave start-date"
              placeholder="YYYY-MM-DD"
              name="sickLeave.startDate"
              validate={validateDateNotRequired}
              component={TextField}
            />
            <Field
              label="Sick leave end-date"
              placeholder="YYYY-MM-DD"
              name="sickLeave.endDate"
              validate={validateDateNotRequired}
              component={TextField}
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
