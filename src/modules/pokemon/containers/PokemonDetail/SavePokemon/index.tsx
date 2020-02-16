import React from 'react';
import { Dialog, Typography, useTheme, useMediaQuery } from '@material-ui/core';
import { Formik, FormikProps } from 'formik';
import capitalize from 'lodash/capitalize';
import { IInitialValue } from './InitialValue';
import FormSavePokemon from './Form';
import { ICaugthPokemon } from '@modules/pokemon/types/throwBall';
import PokeAvatar from '../PokeAvatar';

const initialValue: IInitialValue = {
  pokemonNick: ''
};

interface Props {
  caughtPokemon: ICaugthPokemon;
  isOpen: boolean;
  onClickOpen: any;
  onSubmit: any;
}

export default function SavePokemon(props: Props) {
  const { caughtPokemon, isOpen, onClickOpen, onSubmit } = props;
  const { name, sprites } = caughtPokemon;
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Dialog
      fullScreen={fullScreen}
      open={isOpen}
      onClose={() => onClickOpen(false)}
      disableBackdropClick
    >
      <Formik onSubmit={onSubmit} initialValues={initialValue}>
        {(formikProps: FormikProps<IInitialValue>) => (
          <FormSavePokemon
            {...formikProps}
            onClickOpen={() => onClickOpen(false)}
          >
            <PokeAvatar imagePath={sprites.front_default} />
            <Typography variant="h4">{capitalize(name)} was caught</Typography>
            <Typography> Lets give a nickname! </Typography>
          </FormSavePokemon>
        )}
      </Formik>
    </Dialog>
  );
}
