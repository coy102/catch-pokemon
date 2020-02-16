import * as _ from 'lodash';
import dayjs from 'dayjs';
import shortid from 'shortid';
import { ICaugthPokemon } from '../types/throwBall';
import { IOwnedPokemonStorage } from '../types/ownedPokemon';

interface IGetOwnedPokemons {
  valid: boolean;
  message?: string;
  newPokemons?: Array<IOwnedPokemonStorage>;
}

interface IArgsSetNewPokemon {
  caughtPokemon: ICaugthPokemon;
  pokemonNick: string;
}

export default function catchPokemonService(
  pokemonsStorage: Array<IOwnedPokemonStorage>
) {
  const ownedPokemons = !pokemonsStorage ? [] : pokemonsStorage;

  /**
   * Set precentage to catch a pokemon
   * @param {number} valuePercent
   */
  const getPercentageChance = (valuePercent: number) =>
    Math.random() < valuePercent;

  /**
   *  validate if spesific pokemon already has sam nickname
   * @param {IArgsSetNewPokemon} args
   * @returns {boolean}
   */
  function hasNickName(args: IArgsSetNewPokemon): boolean {
    const { caughtPokemon, pokemonNick } = args;
    const filterOwnedPokemons = filteredOwnedPokemon(caughtPokemon.id);

    if (filterOwnedPokemons) {
      // check if already have nickname from spesific pokemon
      const isAlreadyHasNickname = _.filter(filterOwnedPokemons.owneds, o => {
        return o.name === pokemonNick;
      });
      return isAlreadyHasNickname.length > 0;
    }

    return false;
  }

  /**
   * this function its for finding object of owned pokemon by pokemon name
   * and reuse it for push an array of owneds pokemon.
   * @param {number} id pokemon generate id
   * @param {string} [name] pokemon name
   * @returns
   */
  function filteredOwnedPokemon(id: number, name?: string) {
    // filter pokemon by id or name
    const filterOwnedPokemons = _.find(ownedPokemons, o => {
      return o.id === id || o.name === name;
    });

    return filterOwnedPokemons;
  }

  /**
   * NOTE: getting new owned pokemons for set in localstorage.
   *
   * @export
   * @param {IArgsSetNewPokemon} args
   * {
   *  caughtPokemon: state caughtpokemon,
   *  ownedPokemons: parameter from list owned pokemons localstorage,
   *  pokemonNick : nickname pokemon,
   * }
   * @returns {IGetOwnedPokemons}
   */
  function getNewPokemons(args: IArgsSetNewPokemon): IGetOwnedPokemons {
    const { caughtPokemon, pokemonNick } = args;

    const { name, sprites, types, id } = caughtPokemon;
    const dateNow = dayjs().format('MMM DD YYYY');

    const isAlreadyHasNick = hasNickName(args);
    const filterOwnedPokemons = filteredOwnedPokemon(id);

    if (!isAlreadyHasNick) {
      //  if pokemon not has same nickname, process to generate new owned pokemons

      if (filterOwnedPokemons) {
        //  if has ownedpokemon and push nickname only to {pokemon.owneds}.
        pokemonsStorage.map(pokemon => {
          if (pokemon.name === filterOwnedPokemons.name) {
            pokemon.owneds.push({
              id: shortid.generate(), // original id pokemon
              dateCatch: dateNow,
              name: pokemonNick,
            });
          }
        });
      } else {
        // else push new pokemon with new nickname.
        pokemonsStorage.push({
          id, // original id pokemon
          name,
          sprites,
          types,
          owneds: [
            {
              id: shortid.generate(), // created random id owned pokemon
              dateCatch: dateNow,
              name: pokemonNick,
            },
          ],
        });
      }

      return {
        valid: true,
        newPokemons: pokemonsStorage,
      };
    }

    // else return have same nickname on spesific pokemon.
    return {
      valid: false,
      newPokemons: [],
      message: `You already set nickname ${pokemonNick} to your ${caughtPokemon.name}`,
    };
  }

  return {
    getPercentageChance,
    filteredOwnedPokemon,
    getNewPokemons,
  };
}
