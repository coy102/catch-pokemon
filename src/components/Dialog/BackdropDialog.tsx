import React from 'react';
import { Backdrop, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import BallLoading from '@components/Loading/BallLoading';

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  },
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

interface Props {
  isOpen: boolean;
}

export default function BackdropDialog({ isOpen }: Props) {
  const classes = useStyles({});

  return (
    <Backdrop className={classes.backdrop} open={isOpen}>
      <Box p={3} bgcolor="background.paper" borderRadius={10}>
        <BallLoading />
      </Box>
    </Backdrop>
  );
}
