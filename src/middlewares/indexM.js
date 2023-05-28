// Importa o módulo 'Router' do Express
const { Router } = require('express');
// Importa a função 'verificaPropriedadesTalk' do módulo '../utils/verificarTalk'
const { verificaPropriedadesTalk } = require('../utils/verificarTalk');

// Cria um objeto 'autenticacaoTalker' utilizando o Router do Express
const autenticacaoTalker = Router();

// Define uma função chamada 'handleError' que recebe quatro parâmetros: um objeto 'error', um objeto 'req', um objeto 'res' e a função 'next'
const handleError = (error, _req, res, _next) => {
  // Extrai as propriedades 'status' e 'message' do objeto 'error'
  const { status, message } = error;
  // Retorna a resposta com o status e a mensagem de erro
  return res.status(status).json({ message });
};

// Define uma função chamada 'autenticacao' que recebe três parâmetros: um objeto 'req' contendo os cabeçalhos da requisição, um objeto 'res' representando a resposta e a função 'next' que chama o próximo middleware
const autenticacao = ({ headers }, _res, next) => {
  // Extrai o valor da propriedade 'authorization' dos cabeçalhos
  const { authorization } = headers;
  // Converte o valor da propriedade 'authorization' em uma string
  const retornoAutenticacao = `${authorization}`;
  
  // Verifica se a propriedade 'authorization' está vazia
  if (!authorization) {
    // Chama o próximo middleware passando um objeto de erro com status 401 e uma mensagem de erro
    return next({ status: 401, message: 'Token não encontrado' });
  }
  
  // Verifica se o tamanho da string da propriedade 'authorization' não é igual a 16
  if (retornoAutenticacao.length !== 16) {
    // Chama o próximo middleware passando um objeto de erro com status 401 e uma mensagem de erro
    return next({ status: 401, message: 'Token inválido' });
  }
  
  // Chama o próximo middleware
  return next();
};

// Define uma função chamada 'verificarNome' que recebe três parâmetros: um objeto 'req' contendo o corpo da requisição, um objeto 'res' representando a resposta e a função 'next' que chama o próximo middleware
const verificarNome = ({ body }, _res, next) => {
  // Extrai o valor da propriedade 'name' do objeto 'body'
  const { name } = body;
  
  // Verifica se o campo 'name' está vazio
  if (!name) {
    // Chama o próximo middleware passando um objeto de erro com status 400 e uma mensagem de erro
    return next({ status: 400, message: 'O campo "name" é obrigatório' });
  }
  
  // Verifica se o tamanho da string 'name' é menor que 3 caracteres
  if (name.length < 3) {
    // Chama o próximo middleware passando um objeto de erro com status 400 e uma mensagem de erro
    return next({ status: 400, message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  
  // Chama o próximo middleware
  return next();
};

// Define uma função chamada 'verificarIdade' que recebe três parâmetros: um objeto 'req' contendo o corpo da requisição, um objeto 'res' representando a resposta e a função 'next' que chama o próximo middleware
const verificarIdade = ({ body }, _res, next) => {
  // Extrai o valor da propriedade 'age' do objeto 'body'
  const { age } = body;
  
  // Verifica se o campo 'age' está vazio
  if (!age) {
    // Chama o próximo middleware passando um objeto de erro com status 400 e uma mensagem de erro
    return next({ status: 400, message: 'O campo "age" é obrigatório' });
  }
  
  // Verifica se o valor de 'age' não é um número, não é um número inteiro ou é menor que 18
  if (Number.isNaN(age) || !Number.isInteger(age) || age < 18) {
    // Chama o próximo middleware passando um objeto de erro com status 400 e uma mensagem de erro
    return next({ 
      status: 400,
      message: 'O campo "age" deve ser um número inteiro igual ou maior que 18',
    });
  }
  
  // Chama o próximo middleware
  return next();
};

// Define uma função chamada 'verificarTalk' que recebe três parâmetros: um objeto 'req' contendo o corpo da requisição, um objeto 'res' representando a resposta e a função 'next' que chama o próximo middleware
const verificarTalk = ({ body }, _res, next) => {
  // Extrai o valor da propriedade 'talk' do objeto 'body'
  const { talk } = body;
  
  // Verifica se o campo 'talk' está vazio
  if (!talk) {
    // Chama o próximo middleware passando um objeto de erro com status 400 e uma mensagem de erro
    return next({ status: 400, message: 'O campo "talk" é obrigatório' });
  }
  
  // Verifica se o tipo de 'talk' não é um objeto
  if (typeof talk !== 'object') {
    // Chama o próximo middleware passando um objeto de erro com status 400 e uma mensagem de erro
    return next({
      status: 400,
      message: 'O campo "talk" deve ser um objeto com as chaves "watchedAt" e "rate"',
    });
  }
  
  // Chama a função 'verificaPropriedadesTalk' para validar as propriedades do objeto 'talk'
  const talkIsValid = verificaPropriedadesTalk(talk);
  if (talkIsValid) {
    // Chama o próximo middleware passando o objeto de erro retornado pela função 'verificaPropriedadesTalk'
    return next(talkIsValid);
  }
  
  // Chama o próximo middleware
  return next();
};

// Utiliza os middlewares 'autenticacao', 'verificarNome', 'verificarIdade' e 'verificarTalk' no objeto 'autenticacaoTalker'
autenticacaoTalker.use(autenticacao, verificarNome, verificarIdade, verificarTalk);

// Exporta as funções e o objeto como um módulo
module.exports = {
  autenticacaoTalker,
  handleError,
  autenticacao,
  verificarNome,
  verificarIdade,
  verificarTalk,
};
