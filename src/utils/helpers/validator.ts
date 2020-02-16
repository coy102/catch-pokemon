export const isRequired = value => (!value ? 'You must give a nickname' : '');

export const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined;

export const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined;

export const composeValidators = (
  // tslint:disable-next-line:prefer-array-literal
  ...args: Array<(value: any) => string | undefined>
) => (value: any) => {
  for (const validator of args) {
    const error = validator(value);

    if (error) {
      return error;
    }
  }

  return undefined;
};

export const symbolNotAllowed = value =>
  /[^A-Za-z0-9 ]+/.test(value) ? 'Symbols not allowed, sorry..' : undefined;
