import React from 'react';
import find from 'lodash/find';
import { Box, Card, CardContent, Typography } from '@material-ui/core';
import shortid from 'shortid';

interface Props {
  textEntries: Array<any>;
  pokeName: string;
}

export default function PokeTypes(props: Props) {
  const { textEntries, pokeName } = props;

  const descText = find(textEntries, t => {
    return t.language.name === 'en';
  });

  return (
    <Box my={2}>
      <Box width={1}>
        <Card>
          <CardContent>
            <Typography variant="h6" key={shortid.generate()} color="primary">
              {pokeName}
            </Typography>
            <Box>{descText.flavor_text}</Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
