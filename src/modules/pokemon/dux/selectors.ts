import { createSelector } from 'reselect';

/**
 * Pokemons Selector
 * @export
 * @returns {selectPokemonList}
 */
export default function pokemonSelector() {
  const selectPokemon = () => state => state.pokemon;

  /**
   * Select State of pokemons List
   */
  const selectPokemonList = () =>
    createSelector(selectPokemon(), state => state.pokemonList);

  return {
    selectPokemonList,
  };
}
