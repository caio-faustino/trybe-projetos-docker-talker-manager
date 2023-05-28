// Importa o módulo definido do arquivo './definido'
const definido = require('./definido');

// Define a função verificaValidacao que recebe o parâmetro watchedAt
const verificaValidacao = (watchedAt) => {
  // Expressão regular para validar o formato "dd/mm/aaaa"
  const index = /^(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

  // Verifica se o formato de watchedAt não corresponde ao padrão esperado
  if (!index.test(watchedAt)) {
    // Retorna um objeto indicando um erro com o status 400 e uma mensagem de erro
    return { status: 400, message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' };
  }
};

// Define a função valido que recebe o parâmetro rate
const valido = (rate) => {
  // Verifica se o rate não está definido ou é falso de acordo com a função definido
  if (!definido(rate)) {
    // Retorna um objeto indicando um erro com o status 400 e uma mensagem de erro
    return { status: 400, message: 'O campo "rate" é obrigatório' };
  }

  // Verifica se o rate não é um número inteiro ou está fora do intervalo entre 1 e 5
  if (!Number.isInteger(rate) || !(rate >= 1 && rate <= 5)) {
    // Retorna um objeto indicando um erro com o status 400 e uma mensagem de erro
    return { status: 400, message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' };
  }
};

// Define a função verificaPropriedadesTalk que recebe um objeto com as propriedades watchedAt e rate
const verificaPropriedadesTalk = ({ watchedAt, rate }) => {
  // Verifica se watchedAt não está definido
  if (!watchedAt) {
    // Retorna um objeto indicando um erro com o status 400 e uma mensagem de erro
    return { status: 400, message: 'O campo "watchedAt" é obrigatório' };
  }

  // Verifica a validação de watchedAt chamando a função verificaValidacao
  const objetoValido = verificaValidacao(watchedAt);
  if (objetoValido) { return objetoValido; }

  // Verifica a validade de rate chamando a função valido
  const classificaValidos = valido(rate);
  if (classificaValidos) {
    // Se houver um objeto de validação retornado, indica que houve um erro na validação
    // Retorna o objeto de validação contendo o status e a mensagem de erro
    return classificaValidos;
  }
};

// Exporta as funções verificaPropriedadesTalk e valido
module.exports = { verificaPropriedadesTalk, valido };
