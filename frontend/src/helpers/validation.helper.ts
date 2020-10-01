export const LATIN_LETTER_ONLY = '(only Latin letters allowed)';
export const DIGITS_LATIN_LETTERS_SPEC_CHARS_ONLY = '(only digits, Latin letters and special characters allowed)';
export const EMAIL_MESSAGE = `Email length must be 5-71(with @) symbols ${DIGITS_LATIN_LETTERS_SPEC_CHARS_ONLY}.`;
export const PASSWORD_MESSAGE = `Password length must be 8-32 symbols ${DIGITS_LATIN_LETTERS_SPEC_CHARS_ONLY}.`;
export const PASSWORDS_NOT_MATCH = 'Passwords do not match.';
export const FIRST_NAME_MESSAGE = `First name must be 1-15 symbols ${LATIN_LETTER_ONLY}.`;
export const LAST_NAME_MESSAGE = `Last name must be 1-15 symbols ${LATIN_LETTER_ONLY}.`;

// eslint-disable-next-line max-len
const emailRegex = /^\w[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~"-]*@((\[?[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}]?)|(([a-zA-Z0-9][a-zA-Z\-0-9]*\.)+[a-zA-Z]+))$/;
const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,32}$/;
const userNameRegex = /^[a-zA-Z]{1,15}$/;
const bulletinNameRegex = /^[\d\D]{2,100}$/;
const bulletinBodyRegex = /^[\d\D]{2,500}$/;

export const isValidEmail = (str: string): boolean => emailRegex.test(str) && str.length >= 5 && str.length <= 71;
export const isValidPassword = (str: string): boolean => passwordRegex.test(str) && str.length >= 8 && str.length <= 32;
export const isValidNameSurname = (str: string): boolean => userNameRegex.test(str);
export const isValidBulletinName = (str: string): boolean => bulletinNameRegex.test(str);
export const isValidBulletinBody = (str: string): boolean => bulletinBodyRegex.test(str);
