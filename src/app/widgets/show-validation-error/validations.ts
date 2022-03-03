export enum eValidationErrorMessage {
  EMAIL = 'This email <strong>is invalid</strong>',
  REQUIRED = 'This field <strong>is required</strong>',
  MIN = 'This field <strong> must be at least </strong>',
  MAX = 'This field <strong> must be at most </strong>',
  MIN_LENGTH = 'This field <strong> must be at least </strong>',
  MAX_LENGTH = 'This field <strong> must be at most </strong>',
  MATCHING = 'This field <strong> does not match </strong>',
}

export enum eValidationErrorKeys {
  EMAIL = 'email',
  MIN = 'min',
  MAX = 'max',
  REQUIRED = 'required',
  MIN_LENGTH = 'minlength',
  MATCHING = 'matching',
}

export const VALIDATIONS = [
  {
    errorName: eValidationErrorKeys.MIN_LENGTH,
    messageFn: () => eValidationErrorMessage.MIN_LENGTH,
  },
  {
    errorName: eValidationErrorKeys.EMAIL,
    messageFn: () => eValidationErrorMessage.EMAIL,
  },
  {
    errorName: eValidationErrorKeys.REQUIRED,
    messageFn: () => eValidationErrorMessage.REQUIRED,
  },

  {
    errorName: eValidationErrorKeys.MIN,
    messageFn: () => eValidationErrorMessage.MIN,
  },
  {
    errorName: eValidationErrorKeys.MAX,
    messageFn: () => eValidationErrorMessage.MAX,
  },
  {
    errorName: eValidationErrorKeys.MATCHING,
    messageFn: () => eValidationErrorMessage.MATCHING,
  },
];
