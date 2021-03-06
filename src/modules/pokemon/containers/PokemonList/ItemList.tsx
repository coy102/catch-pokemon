import React from 'react';
import shortid from 'shortid';
import { Grid } from '@material-ui/core';

import { IPokemons } from '../../types/pokemonList';
import ContentCard from '@components/Card/ContentCard';
import Link from '@components/Link';
import { getId } from '@utils/helpers/splitFromUrl';
import { getTotalOwnPokemon } from '@modules/pokemon/services/catchPokemon';

interface Props {
  pokemons: Array<IPokemons>;
}

function ItemList(props: Props) {
  const { pokemons } = props;

  return (
    <Grid spacing={2} container>
      {pokemons.map(pokemon => {
        // maping total pokemon from my pokemon list
        const totalOwn = getTotalOwnPokemon(pokemon.name);

        return (
          <Grid
            id="grid-pokemons"
            item
            key={shortid.generate()}
            md={4}
            sm={6}
            xs={6}>
            <Link href="/pokemon/[pokename]" as={`/pokemon/${pokemon.name}`}>
              <ContentCard
                owned={totalOwn}
                pokemonName={pokemon.name}
                image={`${process.env.IMAGE_URL}${getId(pokemon.url)}.png`}
              />
            </Link>
          </Grid>
        );
      })}
    </Grid>
  );
}

export default ItemList;
