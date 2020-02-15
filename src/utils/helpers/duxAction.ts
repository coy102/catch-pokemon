export const generateAction = (prefix: string, action: string) =>
  `${prefix}/${action}`;

export const generateActions = (prefix: string, action: string) => ({
  REQUEST: `${generateAction(prefix, action)}_REQUEST`,
  SUCCESS: `${generateAction(prefix, action)}_SUCCESS`,
  FAILURE: `${generateAction(prefix, action)}_FAILURE`
});
