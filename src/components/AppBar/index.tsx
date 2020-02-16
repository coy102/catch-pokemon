import React, { useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  useScrollTrigger,
  Typography,
  IconButton,
  makeStyles,
  Theme,
  Chip,
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';

import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import Router from 'next/router';
import Link from '@components/Link';
import { getOwnedPokemons } from '@modules/pokemon/dux/actions';
import pokemonSelector from '@modules/pokemon/dux/selectors';

type Props = {
  children: React.ReactElement;
  title: string;
  hasBackButton: boolean;
  window?: () => Window;
};

const useStyles = makeStyles((theme: Theme) => ({
  grow: {
    flexGrow: 1,
  },
  chip: {
    marginLeft: 5,
    borderRadius: 5,
    height: 20,
  },
  menuButton: {
    marginRight: theme.spacing(5),
    '&:hover': {
      textDecoration: 'none',
    },
  },
  active: {
    color: '#fff600',
    fontWeight: 'bolder',
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

function ElevationScroll(props: Props) {
  const { children, window } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

export default function MainAppBar(props: Props) {
  const classes = useStyles({});
  const dispatch = useDispatch();
  const { selectCountOwns } = pokemonSelector();

  const countOwns = useSelector(selectCountOwns());

  useEffect(() => {
    fetchOwnedPokemons();
  }, []);

  const fetchOwnedPokemons = () => dispatch(getOwnedPokemons.request());

  return (
    <div className={classes.grow}>
      <ElevationScroll {...props}>
        <AppBar>
          <Toolbar>
            {props.hasBackButton && (
              <div className={classes.sectionMobile}>
                <IconButton onClick={() => Router.back()}>
                  <NavigateBeforeIcon style={{ color: '#fff' }} />
                </IconButton>
              </div>
            )}

            <Typography variant="h6" style={{ flexGrow: 1 }}>
              {props.title}
            </Typography>

            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <Link
                href="/"
                color="inherit"
                activeClassName={classes.active}
                className={classes.menuButton}>
                Pokemon List
              </Link>

              <Link
                href="/mypokemon"
                color="inherit"
                activeClassName={classes.active}
                className={classes.menuButton}>
                My Pokemon
                <Chip
                  className={classes.chip}
                  label={countOwns}
                  size="small"
                  color="secondary"
                />
              </Link>
            </div>
            <img src="/svg/pikachu.svg" width={30} height={30} />
          </Toolbar>
        </AppBar>
      </ElevationScroll>
    </div>
  );
}
