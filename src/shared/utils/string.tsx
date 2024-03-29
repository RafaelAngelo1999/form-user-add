export const removeDot = (string: string) => {
  return string.replace(/[^\d]+/g, '');
};

export const getOnlyNumberString = (string: string | undefined) => {
  return string?.replace(/[^0-9]/g, '') || '';
};

export const isValidCPF = (cpf: string | undefined) => {
  if (typeof cpf !== 'string') return false;
  cpf = removeDot(cpf);
  if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false;
  const cpfArray = cpf.split('');
  const validator = cpfArray.filter((digit, index, array) => index >= array.length - 2 && digit).map((el) => +el);
  const toValidate = (pop) =>
    cpfArray.filter((digit, index, array) => index < array.length - pop && digit).map((el) => +el);
  const rest = (count, pop) => ((toValidate(pop).reduce((soma, el, i) => soma + el * (count - i), 0) * 10) % 11) % 10;
  return !(rest(10, 2) !== validator[0] || rest(11, 1) !== validator[1]);
};

export const isValidCellOrTell = (cellOrTell: string) => {
  const regex = /^\(?[1-9]{2}\)? ?(?:[2-8]|9[1-9])[0-9]{3}-?[0-9]{4}$/;
  return regex.test(String(cellOrTell).toLowerCase());
};
