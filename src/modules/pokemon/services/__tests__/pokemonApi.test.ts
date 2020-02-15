import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import pokemonApi from '../api';
import { expectedEvoChain } from '../datas/expectData';

describe('Test service pokemon all endpoint', () => {
  const {
    getPokemonDetail,
    getPokemonList,
    universalGetWithUrl,
  } = pokemonApi();
  const mock = new MockAdapter(axios);

  const pokemonId = 1;

  const expectedPokemon = 'bulbasaur';

  const expectedPokemonSpecies = {
    evolution_chain: {
      url: 'https://pokeapi.co/api/v2/evolution-chain/1/',
    },
    name: expectedPokemon,
  };

  it('fetches successfully all pokemons', async () => {
    const limit = 20;
    mock.onGet(`/pokemon?offset=0&limit=${limit}}`).reply(200);

    const response = await getPokemonList(20);

    expect(response.status).toBe(200);
    expect(response.data.results.length).toBe(20);
  });

  it('fetches successfully detail pokemon ', async () => {
    mock.onGet(`/pokemon/${pokemonId}}`).reply(200);

    const response = await getPokemonDetail(pokemonId);

    expect(response.status).toBe(200);
    expect(response.data.name).toEqual(expectedPokemon);
  });

  it('fetches successfully pokemon species with evolution chain', async () => {
    mock.onGet(`pokemon-species/${pokemonId}/}`).reply(200);

    const response = await universalGetWithUrl(`pokemon-species/${pokemonId}/`);

    expect(response.status).toBe(200);
    expect(response.data).toEqual(
      expect.objectContaining(expectedPokemonSpecies)
    );
  });

  it('fetches successfully evolution chain', async () => {
    const url = expectedPokemonSpecies.evolution_chain.url;

    mock.onGet(url).reply(200);

    const response = await universalGetWithUrl(url);

    expect(response.status).toBe(200);
    expect(response.data).toEqual(expect.objectContaining(expectedEvoChain));
  });
});
