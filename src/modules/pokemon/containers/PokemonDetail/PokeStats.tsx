import React from 'react';
import { Box, Card, CardContent, Typography, Chip } from '@material-ui/core';
import shortid from 'shortid';

import { Stat2 } from '../../types/pokemonDetail/pokemon';

interface Props {
  stats: Array<Stat2>;
}

export default function PokeTypes(props: Props) {
  const { stats } = props;

  return (
    <Box my={2}>
      <Box width={1}>
        <Card>
          <CardContent>
            <Typography variant="h6" key={shortid.generate()} color="primary">
              Stats
            </Typography>
            <Box>
              {stats.map(item => {
                const { base_stat, stat } = item;
                return (
                  <Box
                    display="flex"
                    displayPrint="row"
                    mb={1}
                    key={shortid.generate()}
                    width={1}
                  >
                    <Box width={1 / 2}>
                      <Typography> {stat.name} </Typography>
                    </Box>
                    <Box width={1 / 2} textAlign="right">
                      <Chip label={base_stat} />
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
