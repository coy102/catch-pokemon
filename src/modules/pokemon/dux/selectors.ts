import { createSelector } from 'reselect';

/**
 * Pokemons Selector
 * @export
 * @returns {selectPokemonList}
 */
export default function pokemonSelector() {
  const selectPokemon = () => state => state.pokemon;

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
    selectPokemonList,
    selectPokemonDetail,
    selectThrowBall,
  };
}
