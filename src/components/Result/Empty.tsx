import React from 'react';
import Router from 'next/router';
import { Box, Button, Typography, makeStyles } from '@material-ui/core';
import Zubat from '@components/Svg/Zubat';

const useStyles = makeStyles(() => ({
  image: {
    width: 150,
    height: 150
  }
}));

export default function Empty() {
  const classes = useStyles({});

  return (
    <Box textAlign="center" my={10}>
      <Box>
        <Zubat className={classes.image} />
      </Box>
      <Typography variant="h4" gutterBottom>
        Oh ! You don't have any pokemon
      </Typography>
      <Button
        onClick={() => Router.push('/')}
        variant="contained"
        color="primary"
      >
        Let's Catch
      </Button>
    </Box>
  );
}
