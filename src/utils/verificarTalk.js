const definido = require('./definido');

const verificaValidacao = (watchedAt) => {
  const index = /^(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
  if (!index.test(watchedAt)) {
    return { status: 400, message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' };
  }
};

const valido = (rate) => {
  if (!definido(rate)) {
    return { status: 400, message: 'O campo "rate" é obrigatório' };
  }
  if (!Number.isInteger(rate) || !(rate >= 1 && rate <= 5)) {
    return { status: 400, message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' };
  }
};

const verificaPropriedadesTalk = ({ watchedAt, rate }) => {
  if (!watchedAt) return { status: 400, message: 'O campo "watchedAt" é obrigatório' };
  const objetoValido = verificaValidacao(watchedAt);
  if (objetoValido) return objetoValido;
  const classificaValidos = valido(rate);
  if (classificaValidos) return classificaValidos;
};

module.exports = { verificaPropriedadesTalk, valido };