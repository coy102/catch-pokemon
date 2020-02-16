import { generateActions } from '@utils/helpers/duxAction';

export const GET_POKEMON = generateActions('app', 'GET_POKEMON');
export const GET_MORE_POKEMON = generateActions('app', 'GET_MORE_POKEMON');
export const GET_POKEMON_DETAIL = generateActions('app', 'GET_POKEMON_DETAIL');
