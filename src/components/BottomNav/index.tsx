import React, { useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import {
  BottomNavigation,
  BottomNavigationAction,
  Badge,
  makeStyles,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import pokemonSelector from '@modules/pokemon/dux/selectors';

const useStyles = makeStyles(() => ({
  image: {
    width: 25,
    height: 25,
  },
}));

function BottomNav() {
  const router = useRouter();
  const classes = useStyles({});
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));

  const { selectCountOwns } = pokemonSelector();
  const [value, setValue] = React.useState('/');

  const countOwns = useSelector(selectCountOwns());

  useEffect(() => {
    setValue(router.asPath);
  }, []);

  const handleChangeNav = (_event: React.ChangeEvent<{}>, newValue: string) => {
    setValue(newValue);
    Router.push(newValue);
  };

  return (
    mobile && (
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
    )
  );
}

export default BottomNav;
