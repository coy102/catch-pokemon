import React from 'react';
import { Field, Form as FormikForm, FormikProps } from 'formik';
import { TextField } from 'formik-material-ui';
import { Box, DialogContent, Button } from '@material-ui/core';

import {
  composeValidators,
  isRequired,
  maxLength,
  symbolNotAllowed
} from '@utils/helpers/validator';
import { IInitialValue } from './InitialValue';

interface Props extends FormikProps<IInitialValue> {
  onClickOpen: any;
  children: React.ReactNode;
}

export default function FormSavePokemon(props: Props) {
  const { onClickOpen, children } = props;
  return (
    <FormikForm>
      <DialogContent>
        <Box py={5}>
          {children}
          <Box my={2}>
            <Field
              name="pokemonNick"
              label="Nick name *"
              validate={composeValidators(
                isRequired,
                maxLength(15),
                symbolNotAllowed
              )}
              component={TextField}
              fullWidth
            />
          </Box>
          <Box textAlign="right">
            <Button
              autoFocus
              onClick={() => onClickOpen(false)}
              color="primary"
            >
              CANCEL
            </Button>
            <Button
              accessKey="submit"
              variant="contained"
              color="primary"
              type="submit"
              autoFocus
            >
              SAVE POKEMON
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </FormikForm>
  );
}
