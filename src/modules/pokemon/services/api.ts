import { Api } from '@services/api';

export default function pokemonApi() {
  const _api = new Api();

  const getPokemonList = async (offset: number) => {
    const res = await _api.get(`/pokemon?offset=${offset}&limit=20`);
    return res;
  };

  const getPokemonDetail = async nameOrId => {
    const res = await _api.get(`/pokemon/${nameOrId}`);
    return res;
  };

  return {
    getPokemonList,
    getPokemonDetail,
  };
}
