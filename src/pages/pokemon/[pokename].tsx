import React from 'react';
import Box from '@material-ui/core/Box';

import MainLayout from '@components/Layouts/Main';
import PokemonDetailContainer from '@modules/pokemon/containers/PokemonDetail';

export default function Index() {
  return (
    <MainLayout title="Awesome Pokemon" hasBackButton>
      <Box>
        <PokemonDetailContainer />
      </Box>
    </MainLayout>
  );
}
