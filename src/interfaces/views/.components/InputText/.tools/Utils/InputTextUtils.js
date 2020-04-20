import DomHandler from 'interfaces/views/.tools/Utils/DomHandler';

const DEFAULT_MASKS = {
  alpha: /[a-z_]/i,
  alphanum: /[a-z0-9_]/i,
  email: /[a-z0-9_\.\-@]/i,
  hex: /[0-9a-f]/i,
  int: /[\d\-]/,
  money: /[\d\.\s,]/,
  num: /[\d\-\.]/,
  pint: /[\d]/,
  pnum: /[\d\.]/
};

const KEYS = { BACKSPACE: 8, DELETE: 46, ESC: 27, RETURN: 13, TAB: 9 };

const SAFARI_KEYS = {
  63234: 37, // left
  63235: 39, // right
  63232: 38, // up
  63233: 40, // down
  63276: 33, // page up
  63277: 34, // page down
  63272: 46, // delete
  63273: 36, // home
  63275: 35 // end
};

const getCharCode = event => event.charCode || event.keyCode || event.which;

const getKey = event => {
  let keyCode = event.keyCode || event.charCode;
  return DomHandler.getBrowser().safari ? SAFARI_KEYS[keyCode] || keyCode : keyCode;
};

const isNavKeyPress = event => {
  let k = event.keyCode;
  k = DomHandler.getBrowser().safari ? SAFARI_KEYS[k] || k : k;

  return (k >= 33 && k <= 40) || k === KEYS.RETURN || k === KEYS.TAB || k === KEYS.ESC;
};

const isSpecialKey = event => {
  let keyCode = event.keyCode;

  return (
    keyCode === 9 ||
    keyCode === 13 ||
    keyCode === 27 ||
    keyCode === 16 ||
    keyCode === 17 ||
    (keyCode >= 18 && keyCode <= 20) ||
    (DomHandler.getBrowser().opera &&
      !event.shiftKey &&
      (keyCode === 8 || (keyCode >= 33 && keyCode <= 35) || (keyCode >= 36 && keyCode <= 39) || (keyCode >= 44 && keyCode <= 45)))
  );
};

const onKeyPress = (event, keyfilter, validateOnly) => {
  if (validateOnly) return;

  const regex = DEFAULT_MASKS[keyfilter] ? DEFAULT_MASKS[keyfilter] : keyfilter;
  const browser = DomHandler.getBrowser();

  if (event.ctrlKey || event.altKey) return;

  const key = getKey(event);
  if (browser.mozilla && (isNavKeyPress(event) || key === KEYS.BACKSPACE || (key === KEYS.DELETE && event.charCode === 0))) return;

  const chart = getCharCode(e);
  const charCode = String.fromCharCode(chart);

  if (browser.mozilla && (isSpecialKey(e) || !charCode)) return;

  if (!regex.test(charCode)) event.preventDefault();
};

const onValidate = (event, keyfilter) => {
  let value = event.target.value,
    validatePattern = true;

  if (value && !keyfilter.test(value)) validatePattern = false;

  return validatePattern;
};

export const InputTextUtils = { onKeyPress, onValidate };
