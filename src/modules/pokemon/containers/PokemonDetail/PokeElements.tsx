import React from 'react';
import { Box, Card, CardContent, Typography } from '@material-ui/core';
import shortid from 'shortid';

import { IDamageRelations } from '../../types/pokemonDetail/elementTypes';
import ChipTypes from '@components/Chip/ChipTypes';

interface Props {
  damageRelations: IDamageRelations;
}

export default function PokeElements(props: Props) {
  const { damageRelations } = props;

  return (
    <Box my={2}>
      <Card>
        <CardContent>
          <Typography variant="h6" color="primary">
            Pokemon Type
          </Typography>
          <Box my={2}>
            <Typography variant="body2">Effectives </Typography>
            {damageRelations.double_damage_to.map(item => (
              <ChipTypes type={item.name} key={shortid.generate()} />
            ))}
          </Box>

          <Box my={2}>
            <Typography variant="body2">Weeknesses </Typography>
            {damageRelations.double_damage_from.map(item => (
              <ChipTypes type={item.name} key={shortid.generate()} />
            ))}
          </Box>

          <Box my={2}>
            <Typography variant="body2">No damage </Typography>
            {damageRelations.no_damage_from.map(item => (
              <ChipTypes type={item.name} key={shortid.generate()} />
            ))}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
