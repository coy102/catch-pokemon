import React, { useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import {
  BottomNavigation,
  BottomNavigationAction,
  Badge,
  makeStyles,
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import pokemonSelector from '@modules/pokemon/dux/selectors';
import { getOwnedPokemons } from '@modules/pokemon/dux/actions';

const useStyles = makeStyles(() => ({
  image: {
    width: 25,
    height: 25,
  },
}));

function BottomNav() {
  const router = useRouter();
  const dispatch = useDispatch();
  const classes = useStyles({});
  const { selectCountOwns } = pokemonSelector();
  const [value, setValue] = React.useState('/');

  const countOwns = useSelector(selectCountOwns());
  const fetchOwnedPokemons = () => dispatch(getOwnedPokemons.request());

  useEffect(() => {
    setValue(router.asPath);
    fetchOwnedPokemons();
  }, []);

  const handleChangeNav = (_event: React.ChangeEvent<{}>, newValue: string) => {
    setValue(newValue);
    Router.push(newValue);
  };

  return (
    <BottomNavigation
      value={value}
      onChange={handleChangeNav}
      style={{
        width: '100%',
        position: 'fixed',
        bottom: 0,
      }}>
      <BottomNavigationAction
        label="Pokemon List"
        value="/"
        icon={<img className={classes.image} src="/png/smartphone.png" />}
      />
      <BottomNavigationAction
        label="My Pokemon"
        value="/mypokemon"
        icon={
          <Badge badgeContent={countOwns} max={99} color="primary">
            <img className={classes.image} src="/png/pokeballs.png" />
          </Badge>
        }
      />
    </BottomNavigation>
  );
}

export default BottomNav;
