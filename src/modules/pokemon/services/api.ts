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

  const getPokemonSpecies = async nameOrId => {
    const res = await _api.get(`/pokemon-species/${nameOrId}`);
    return res;
  };

  const universalGetWithUrl = async url => {
    const res = await _api.get(url);
    return res;
  };

  return {
    getPokemonList,
    getPokemonDetail,
    getPokemonSpecies,
    universalGetWithUrl,
  };
}
