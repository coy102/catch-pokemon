import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Box, Grid } from '@material-ui/core';
import capitalize from 'lodash/capitalize';

import { getPokemonDetail } from '../../dux/actions';
import pokemonSelector from '../../dux/selectors';
import { PokemonDetailState } from '../../types/pokemonDetail';
import PokeAvatar from './PokeAvatar';
import PokeDescription from './PokeDescription';
import PokeTypes from './PokeTypes';
import PokeAbilities from './PokeAbilities';
import PokeStats from './PokeStats';
import PokeEvolutions from './PokeEvolution';
import PokeElements from './PokeElements';
import Loading from './Loading';
import ErrorMessage from '@components/Result/ErrorMessage';

function PokemonDetailContainer() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { selectPokemonDetail } = pokemonSelector();
  const { pokename } = router.query;

  const pokemonDetail: PokemonDetailState = useSelector(selectPokemonDetail());
  const { isFetching, pokemon, message } = pokemonDetail;
  const { detail, species, evolutions, elementType } = pokemon;

  useEffect(() => {
    handleFetchPokemon(pokename);
  }, [pokename]);

  const handleFetchPokemon = nameOrId =>
    dispatch(getPokemonDetail.request({ nameOrId }));

  if (isFetching) {
    return <Loading />;
  }

  if (message) {
    return (
      <ErrorMessage
        message={message}
        onClick={() => handleFetchPokemon(pokename)}
        buttonLabel="Refresh"
      />
    );
  }

  return (
    <div>
      {pokemon.detail && (
        <Box>
          <PokeAvatar imagePath={detail.sprites.front_default} />
          <PokeTypes types={detail.types} />
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <PokeDescription
                textEntries={species.flavor_text_entries}
                pokeName={capitalize(detail.name)}
              />
              <PokeEvolutions evolutions={evolutions} />
            </Grid>

            <Grid item xs={12} md={6}>
              <PokeAbilities abilities={detail.abilities} />
              <PokeElements damageRelations={elementType.damage_relations} />
              <PokeStats stats={detail.stats} />
            </Grid>
          </Grid>
        </Box>
      )}
    </div>
  );
}

export default PokemonDetailContainer;
