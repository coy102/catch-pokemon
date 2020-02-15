import { Api } from '@services/api';
import { IPokemonsResult } from '../types/pokemonList';

export default function pokemonApi() {
  const _api = new Api();

  async function getPokemonList(offset: number): Promise<IPokemonsResult> {
    const res = await _api.get(`/pokemon?offset=${offset}&limit=20`);
    return res.data;
  }

  return {
    getPokemonList,
  };
}
