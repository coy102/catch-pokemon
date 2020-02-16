import React from 'react';
import { makeStyles, Fab, Theme } from '@material-ui/core';

import BackdropDialog from '@components/Dialog/BackdropDialog';

const useStyles = makeStyles((theme: Theme) => ({
  fabBottom: {
    position: 'fixed',
    zIndex: 1,
    bottom: 40,
    left: '50%',
    /* bring your own prefixes */
    transform: ' translate(-50%, -50%)',
  },
  image: {
    width: 30,
    height: 30,
    marginRight: theme.spacing(1),
  },
}));

interface Props {
  throwing: boolean;
  onThrowBall: () => void;
}

export default function ThrowBall({ throwing, onThrowBall }: Props) {
  const classes = useStyles({});

  return (
    <div>
      <BackdropDialog isOpen={throwing} />
      <Fab
        aria-label="add"
        className={classes.fabBottom}
        onClick={() => onThrowBall()}
        variant="extended"
        color="secondary">
        <img className={classes.image} src="/svg/pokeball.svg" />
        Catch Pokemon
      </Fab>
    </div>
  );
}
