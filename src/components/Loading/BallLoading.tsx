import React from 'react';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PokeBall from '@components/Svg/PokeBall';

const useStyles = makeStyles(() => ({
  iconSpinner: {
    width: 50,
    height: 50,
    '-webkit-animation': '$spin 0.5s linear infinite',
    '-moz-animation': '$spin 0.5s linear infinite',
    animation: '$spin 0.5s linear infinite'
  },
  '@keyframes spin': {
    '100%': {
      '-webkit-transform': 'rotate(360deg)',
      transform: 'rotate(360deg)'
    }
  }
}));

export default function BallLoading() {
  const classes = useStyles({});

  return (
    <Box textAlign="center">
      <PokeBall className={classes.iconSpinner} />
    </Box>
  );
}
