import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@material-ui/core';
import debounce from 'lodash/debounce';

import { getPokemons, getMorePokemons } from '../../dux/actions';
import pokemonSelector from '../../dux/selectors';
import { IPokemonsState } from '../../types/pokemonList';
import BallLoading from '@components/Loading/BallLoading';
import ErrorMessage from '@components/Result/ErrorMessage';
import ItemList from './ItemList';

function PokemonContainer() {
  const dispatch = useDispatch();
  const { selectPokemonList } = pokemonSelector();

  const pokemon: IPokemonsState = useSelector(selectPokemonList());
  const { isFetching, message, pokemons } = pokemon;

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    if (pokemons.length === 0) {
      // fetch 1 times on load page if it already has data on state
      handleFetchPokemons();
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // handle fetch pokemons
  const handleFetchPokemons = () =>
    dispatch(getPokemons.request({ offset: 0 }));

  // handle fetch more pokemon infinite scroll logic
  const handleScroll = debounce(() => {
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 500
    ) {
      dispatch(getMorePokemons.request({}));
    }
  }, 100);

  return (
    <React.Fragment>
      {pokemon && (
        <Box mb={1}>
          <ItemList pokemons={pokemons} />
        </Box>
      )}
      {isFetching && <BallLoading />}
      {message && (
        <ErrorMessage
          message={message}
          onClick={handleFetchPokemons}
          buttonLabel="Refresh"
        />
      )}
    </React.Fragment>
  );
}

export default PokemonContainer;
