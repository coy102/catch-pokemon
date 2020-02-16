import { generateActions, generateAction } from '@utils/helpers/duxAction';

export const GET_POKEMON = generateActions('app', 'GET_POKEMON');
export const GET_MORE_POKEMON = generateActions('app', 'GET_MORE_POKEMON');
export const GET_POKEMON_DETAIL = generateActions('app', 'GET_POKEMON_DETAIL');

export const THROW_BALL = generateActions('app', 'THROW_BALL');

export const OPEN_SETNICK_DIALOG = generateAction(
  'app',
  'THROW_BALL/OPEN_SETNICK_DIALOG'
);
