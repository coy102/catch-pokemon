import React from 'react';
import { Box } from '@material-ui/core';
import shortid from 'shortid';

import { Type } from '../../types/pokemonDetail/pokemon';
import ChipTypes from '@components/Chip/ChipTypes';

interface Props {
  types: Array<Type>;
}

export default function PokeTypes(props: Props) {
  const { types } = props;

  return (
    <Box my={2} justifyContent="center" display="flex">
      <Box>
        {types.map(item => {
          const { name } = item.type;
          return <ChipTypes key={shortid.generate()} type={name} />;
        })}
      </Box>
    </Box>
  );
}
