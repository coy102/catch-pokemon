import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import pokemonApi from '../api';

describe('Test service pokemon all endpoint', () => {
  const pokeApi = pokemonApi();
  const mock = new MockAdapter(axios);

  it('fetches successfully all pokemons', async () => {
    const limit = 20;
    mock.onGet(`/pokemon?offset=0&limit=${limit}}`).reply(200);

    const response = await pokeApi.getPokemonList(20);

    expect(response.status).toBe(200);
    expect(response.data.results.length).toBe(20);
  });
});
