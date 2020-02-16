import { IOwnedPokemonStorage } from '../types/ownedPokemon';

const OWNED_STORAGE = 'OWNED_STORAGE';

/**
 * set value to locastorage `OWNED_STORAGE`
 * @export
 * @param {*} caughtPokemon
 */
export function setOwnedStorage(caughtPokemon: any) {
  const serializedState = JSON.stringify(caughtPokemon);
  localStorage.setItem(OWNED_STORAGE, serializedState);
}

/**
 *  get value to locastorage `OWNED_STORAGE`
 * @export
 * @returns {Array<IOwnedPokemonStorage>}
 */
export function getOwnedStorage(): Array<IOwnedPokemonStorage> {
  try {
    const storage = localStorage.getItem(OWNED_STORAGE);
    if (storage === null) {
      return [];
    }
    return JSON.parse(storage);
  } catch (error) {
    return undefined;
  }
}

/**
 *  remove value to locastorage `OWNED_STORAGE`
 * @export
 */
export function removeOwnedStorage() {
  localStorage.removeItem(OWNED_STORAGE);
}
