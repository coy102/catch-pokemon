import { getNewPokemons, removeOwnedPokemon } from '../catchPokemon';
import localStorage from '../__mocks__/localStorage';
import { ICaugthPokemon } from '../../types/throwBall';
import { IOwnedPokemonStorage } from '../../types/ownedPokemon';

describe('test all operations', () => {
  //
  const storageKey = 'OWNED_STORAGE';
  const pokemonNick1 = 'Dracula';
  const pokemonNick2 = 'Bulba';

  const pokemonName1 = 'Bulbasaur';
  const pokemonName2 = 'Ivisaur';
  const expectOwnPokemon = [
    {
      id: 1,
      name: 'bulbasaur',
      owneds: [{ dateCatch: 'Dec 25 2019', name: 'Dracula' }],
    },
  ];

  const fakeOwnsPokemon: Array<ICaugthPokemon> = [
    {
      name: pokemonName1,
      id: 1,
    },
    {
      name: pokemonName2,
      id: 2,
    },
  ];

  // Local storage Init
  const ownedPokemons = (): Array<IOwnedPokemonStorage> => {
    try {
      const storage = localStorage.getItem(storageKey);
      if (storage === null) {
        return [];
      }
      return JSON.parse(storage);
    } catch (error) {
      return undefined;
    }
  };
  // Setitem to localstorage
  const setOwnedPokemon = values => {
    const serializedState = JSON.stringify(values);
    localStorage.setItem(storageKey, serializedState);
  };

  beforeEach(() => localStorage.clear());

  it('init localStorage', () => expect(localStorage.store).toEqual({}));

  it(`returns undefined from ${storageKey}`, () => {
    expect(ownedPokemons()).toBeUndefined();
  });

  it(`saved nickname ${pokemonNick1} to own pokemon storage`, () => {
    const genNewPokemon = getNewPokemons({
      caughtPokemon: fakeOwnsPokemon[0],
      ownedPokemons: [],
      pokemonNick: pokemonNick1,
    });

    setOwnedPokemon(genNewPokemon.newPokemons);
    const { name, owneds } = ownedPokemons()[0];
    expect(name).toBe(pokemonName1);
    expect(owneds[0].name).toBe(expectOwnPokemon[0].owneds[0].name);
  });

  it(`returns nickname ${pokemonNick1} already exist`, () => {
    const genNewPokemon1 = getNewPokemons({
      caughtPokemon: fakeOwnsPokemon[0],
      ownedPokemons: [],
      pokemonNick: pokemonNick1,
    });

    const genNewPokemon2 = getNewPokemons({
      caughtPokemon: fakeOwnsPokemon[0],
      ownedPokemons: genNewPokemon1.newPokemons,
      pokemonNick: pokemonNick1,
    });

    const { valid } = genNewPokemon2;
    expect(valid).toBe(false);
  });

  it(`returns set different nickname ${pokemonNick2} success`, () => {
    const genNewPokemon1 = getNewPokemons({
      caughtPokemon: fakeOwnsPokemon[0],
      ownedPokemons: [],
      pokemonNick: pokemonNick1,
    });

    const genNewPokemon2 = getNewPokemons({
      caughtPokemon: fakeOwnsPokemon[0],
      ownedPokemons: genNewPokemon1.newPokemons,
      pokemonNick: pokemonNick2,
    });

    setOwnedPokemon(genNewPokemon2.newPokemons);

    const { valid, newPokemons } = genNewPokemon2;
    expect(valid).toBe(true);
    expect(newPokemons[0].owneds.length).toBe(2);
    expect(ownedPokemons()[0].owneds.length).toBe(2);
  });

  it(`returns set different pokemon ${fakeOwnsPokemon[1].name} success`, () => {
    const genNewPokemon1 = getNewPokemons({
      caughtPokemon: fakeOwnsPokemon[0],
      ownedPokemons: [],
      pokemonNick: pokemonNick1,
    });

    setOwnedPokemon(genNewPokemon1.newPokemons);

    const genNewPokemon2 = getNewPokemons({
      caughtPokemon: fakeOwnsPokemon[1],
      ownedPokemons: genNewPokemon1.newPokemons,
      pokemonNick: pokemonNick1,
    });

    setOwnedPokemon(genNewPokemon2.newPokemons);

    expect(ownedPokemons().length).toBe(2);
  });

  it(`remove single pokemon - ${pokemonNick1} - ${pokemonName1}`, () => {
    const genNewPokemon1 = getNewPokemons({
      caughtPokemon: fakeOwnsPokemon[0],
      ownedPokemons: [],
      pokemonNick: pokemonNick1,
    });

    setOwnedPokemon(genNewPokemon1.newPokemons);
    const { id, owneds } = ownedPokemons()[0];

    const removedPokemons = removeOwnedPokemon(
      id,
      owneds[0].id,
      ownedPokemons()
    );
    setOwnedPokemon(removedPokemons);

    expect(ownedPokemons().length).toBe(0);
  });
});
