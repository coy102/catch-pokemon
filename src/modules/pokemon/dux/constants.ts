import { generateActions, generateAction } from '@utils/helpers/duxAction';

export const GET_POKEMON = generateActions('app', 'GET_POKEMON');
export const GET_MORE_POKEMON = generateActions('app', 'GET_MORE_POKEMON');
export const GET_POKEMON_DETAIL = generateActions('app', 'GET_POKEMON_DETAIL');
export const SET_OWNED_POKEMON = generateActions('app', 'SET_OWNED_POKEMON');
export const GET_OWNED_POKEMON = generateActions('app', 'GET_OWNED_POKEMON');

export const THROW_BALL = generateActions('app', 'THROW_BALL');

export const OPEN_SETNICK_DIALOG = generateAction(
  'app',
  'THROW_BALL/OPEN_SETNICK_DIALOG'
);

export const OPEN_REMOVE_DIALOG = generateAction(
  'app',
  'REMOVE_OWNED_POKEMON/OPEN_SETNICK_DIALOG'
);
export const REMOVE_OWNED_POKEMON = generateActions(
  'app',
  'REMOVE_OWNED_POKEMON'
);
