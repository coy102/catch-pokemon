import React from 'react';
import Typography from '@material-ui/core/Typography';
import MainLayout from '@components/Layouts/Main';
import PokemonContainer from '@modules/pokemon/containers/PokemonList';

export default function Index() {
  return (
    <MainLayout title="Awesome Pokemon">
      <React.Fragment>
        <Typography variant="h6" component="h1" gutterBottom>
          Pokemon List
        </Typography>
        <PokemonContainer />
      </React.Fragment>
    </MainLayout>
  );
}
