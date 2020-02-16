import React from 'react';
import capitalize from 'lodash/capitalize';
import { Chip, makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  poison: {
    background: '#b97fc9',
    color: '#fff'
  },
  grass: {
    background: '#9bcc50'
  },
  ice: {
    background: '#51c4e7'
  },
  flying: {
    background: 'inear-gradient(180deg, #3dc7ef 50%, #bdb9b8 50%)'
  },
  fire: {
    background: '#fd7d24',
    color: '#fff'
  },
  psychic: {
    background: '#f366b9',
    color: '#fff'
  },
  bug: {
    background: '#729f3f',
    color: '#fff'
  },
  dragon: {
    background: 'linear-gradient(180deg, #53a4cf 50%, #f16e57 50%)'
  },
  fairy: {
    background: '#fdb9e9'
  },
  ghost: {
    background: '#7b62a3',
    color: '#fff'
  },
  ground: {
    background: 'linear-gradient(180deg, #f7de3f 50%, #ab9842 50%)'
  },
  normal: {
    background: '#a4acaf'
  },
  steel: {
    background: '#9eb7b8'
  },
  dark: {
    background: '#707070',
    color: '#fff'
  },
  electric: {
    background: '#eed535'
  },
  fighting: {
    background: '#d56723',
    color: '#fff'
  },
  rock: {
    background: '#a38c21',
    color: '#fff'
  },
  water: {
    background: '#4592c4',
    color: '#fff'
  }
}));

interface Props {
  type: string;
}

export default function ChipTypes(props: Props) {
  const classes = useStyles({});
  const { type } = props;

  return (
    <Chip
      size="small"
      label={capitalize(type)}
      classes={{ root: classes.root }}
      className={classes[type]}
    />
  );
}
