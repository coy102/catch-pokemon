import React from 'react';
import capitalize from 'lodash/capitalize';
import {
  Card,
  Box,
  Typography,
  CardContent,
  makeStyles,
  Theme,
} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  media: {
    height: 200,
    width: '70%',
    [theme.breakpoints.down('sm')]: {
      width: '70%',
      height: 150,
    },
  },
  card: {
    cursor: 'pointer',
  },
}));

interface Props {
  pokemonName: string;
  owned: number;
  image: string;
}

export default function ContentCard(props: Props) {
  const { image, owned, pokemonName } = props;
  const classes = useStyles({});

  return (
    <Card className={classes.card}>
      <Box textAlign="center">
        <img className={classes.media} src={image} alt="" />
      </Box>
      <CardContent>
        <Typography variant="h6">{capitalize(pokemonName)}</Typography>
        <Typography variant="caption">owns : {owned}</Typography>
      </CardContent>
    </Card>
  );
}
