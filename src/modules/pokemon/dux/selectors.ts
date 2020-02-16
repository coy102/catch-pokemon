import { createSelector } from 'reselect';

/**
 * Pokemons Selector
 * @export
 * @returns {selectPokemonList}
 */
export default function pokemonSelector() {
  const selectPokemon = () => state => state.pokemon;

  /**
   * Select count from pokemons list by owned pokemons
   */
  const selectCountOwns = () =>
    createSelector(selectOwnedPokemon(), ({ pokemons }) => {
      let count = 0;
      pokemons.map(poke => {
        count += poke.owneds.length;
      });

      return count;
    });

  /**
   * Select State of owneds pokemon
   */
  const selectOwnedPokemon = () =>
    createSelector(selectPokemon(), state => state.ownedPokemons);

  /**
   * Select State of throw ball
   */
  const selectThrowBall = () =>
    createSelector(selectPokemon(), state => state.throwBall);

  /**
   * Select State of pokemons detail
   */
  const selectPokemonDetail = () =>
    createSelector(selectPokemon(), state => state.pokemonDetail);

  /**
   * Select State of pokemons List
   */
  const selectPokemonList = () =>
    createSelector(selectPokemon(), state => state.pokemonList);

  return {
    selectCountOwns,
    selectOwnedPokemon,
    selectPokemonList,
    selectPokemonDetail,
    selectThrowBall,
  };
}
