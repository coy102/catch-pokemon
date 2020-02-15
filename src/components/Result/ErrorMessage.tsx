import React from 'react';
import { Box, Button, Typography, makeStyles } from '@material-ui/core';
import Zubat from '@components/Svg/Zubat';

const useStyles = makeStyles(() => ({
  image: {
    width: 150,
    height: 150
  }
}));

interface Props {
  message: string;
  onClick: any;
  buttonLabel: string;
}

export default function ErrorMessage(props: Props) {
  const { message, buttonLabel, onClick } = props;
  const classes = useStyles({});

  return (
    <Box textAlign="center" my={3}>
      <Box>
        <Zubat className={classes.image} />
      </Box>
      <Typography variant="h4" gutterBottom>
        {message}
      </Typography>
      <Button onClick={onClick} variant="contained" color="primary">
        {buttonLabel}
      </Button>
    </Box>
  );
}
