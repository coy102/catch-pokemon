import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import MainLayout from '@components/Layouts/Main';
import PokemoneOwnedContainer from '@modules/pokemon/containers/PokemonOwned';

export default function Index() {
  return (
    <MainLayout title="Awesome Pokemon" hasBackButton>
      <Box>
        <Typography variant="h6" component="h1" gutterBottom>
          My Pokemons
        </Typography>
        <PokemoneOwnedContainer />
      </Box>
    </MainLayout>
  );
}
