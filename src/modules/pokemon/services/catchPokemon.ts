import * as _ from 'lodash';
import dayjs from 'dayjs';
import shortid from 'shortid';
import { ICaugthPokemon } from '../types/throwBall';
import { IOwnedPokemonStorage, ICheckedState } from '../types/ownedPokemon';
import { getOwnedStorage } from './ownedPokemonStorage';

interface IGetOwnedPokemons {
  valid: boolean;
  message?: string;
  newPokemons?: Array<IOwnedPokemonStorage>;
}

interface IArgsSetNewPokemon {
  caughtPokemon: ICaugthPokemon;
  pokemonNick: string;
  ownedPokemons: Array<IOwnedPokemonStorage>;
}

/**
 * Set precentage to catch a pokemon
 * @param {number} valuePercent
 */
export const getPercentageChance = (valuePercent: number) =>
  Math.random() < valuePercent;

/**
 * remove selected pokemons
 * @param {Array<ICheckedState>} selectedPokemons
 * @returns
 */
export function removeSelectedPokemon(
  selectedPokemons: Array<ICheckedState>,
  ownedPokemons: Array<IOwnedPokemonStorage>
) {
  let releasedPokemon = ownedPokemons.map(item => {
    selectedPokemons.map(select => {
      if (item.id === select.pokemonId) {
        item.owneds = _.reject(item.owneds, r => {
          return select.ownsId.includes(r.id);
        });
      }
    });
    return item;
  });

  releasedPokemon = _.filter(releasedPokemon, item => {
    return item.owneds.length > 0 ? true : false;
  });

  return releasedPokemon;
}

/**
 * remove single pokemon on owmned pokemon local storage filter by pokemon name
 * and delete by nickname of pokemon
 * @export
 * @param {string} pokemonName
 * @param {string} pokemonNick
 * @returns
 */
export function removeOwnedPokemon(
  pokemonId: number,
  pokemonOwnId: string,
  ownedPokemons: Array<IOwnedPokemonStorage>
) {
  let releasedPokemon = ownedPokemons.map(item => {
    if (item.id === pokemonId) {
      item.owneds = _.reject(item.owneds, { id: pokemonOwnId });
    }
    return item;
  });

  releasedPokemon = _.filter(releasedPokemon, item => {
    return item.owneds.length > 0 ? true : false;
  });

  return releasedPokemon;
}

/**
 *  validate if spesific pokemon already has sam nickname
 * @param {IArgsSetNewPokemon} args
 * @returns {boolean}
 */
function hasNickName(args: IArgsSetNewPokemon): boolean {
  const { caughtPokemon, pokemonNick, ownedPokemons } = args;
  const filterOwnedPokemons = filteredOwnedPokemon(
    caughtPokemon.id,
    ownedPokemons
  );

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
function filteredOwnedPokemon(
  id: number,
  ownedPokemons: Array<IOwnedPokemonStorage>,
  name?: string
) {
  // filter pokemon by id or name
  const filterOwnedPokemons = _.find(ownedPokemons, o => {
    return o.id === id || o.name === name;
  });

  return filterOwnedPokemons;
}

/**
 * getting new owned pokemons for set in localstorage.
 * @param {IArgsSetNewPokemon} args
 * {
 *  caughtPokemon: state caughtpokemon,
 *  ownedPokemons: parameter from list owned pokemons localstorage
 *  pokemonNick : nickname pokemon,
 * }
 * @returns {IGetOwnedPokemons}
 */
export function getNewPokemons(args: IArgsSetNewPokemon): IGetOwnedPokemons {
  const { caughtPokemon, pokemonNick, ownedPokemons } = args;
  const { name, sprites, types, id } = caughtPokemon;
  const dateNow = dayjs().format('MMM DD YYYY');
  const pokemonsStorage = !ownedPokemons ? [] : ownedPokemons;
  const isAlreadyHasNick = hasNickName(args);
  const filterOwnedPokemons = filteredOwnedPokemon(id, pokemonsStorage);

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

/**
 * get owns total on pokemon list by pokemon name and base on getOwnedStorage
 * @export
 * @param {string} pokemonName
 * @returns
 */
export function getTotalOwnPokemon(pokemonName: string) {
  const ownedPokemons: Array<IOwnedPokemonStorage> = getOwnedStorage();
  const filterOwnedPokemons = filteredOwnedPokemon(
    null,
    ownedPokemons,
    pokemonName
  );
  if (filterOwnedPokemons) {
    // if has owned pokemon from function filteredOwnedPokemon to get object of pokemon
    // and get length of owneds
    const total = filterOwnedPokemons.owneds.length;
    return total;
  }
  // else return count 0
  return 0;
}
