import { IOwnedPokemonStorage } from '../types/ownedPokemon';

const OWNED_STORAGE = 'OWNED_STORAGE';

export function setOwnedStorage(caughtPokemon: any) {
  const serializedState = JSON.stringify(caughtPokemon);
  localStorage.setItem(OWNED_STORAGE, serializedState);
}

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

export function removeOwnedStorage() {
  localStorage.removeItem(OWNED_STORAGE);
}
