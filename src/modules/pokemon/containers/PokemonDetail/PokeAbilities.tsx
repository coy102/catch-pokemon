import React from 'react';
import { Box, Card, CardContent, Typography } from '@material-ui/core';
import shortid from 'shortid';

import { Ability2 } from '../../types/pokemonDetail/pokemon';

interface Props {
  abilities: Array<Ability2>;
}

export default function PokeTypes(props: Props) {
  const { abilities } = props;

  return (
    <Box my={2} justifyContent="flex-start" display="flex">
      <Box width={1}>
        <Card>
          <CardContent>
            <Typography variant="h6" color="primary">
              Abilities
            </Typography>
            {abilities.map(item => {
              const { name } = item.ability;
              return <Typography key={shortid.generate()}>{name}</Typography>;
            })}
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
