const { Router } = require('express');
const { verificaPropriedadesTalk } = require('../utils/verificarTalk');

const autenticacaoTalker = Router();

const handleError = (error, _req, res, _next) => {
  const { status, message } = error;
  return res.status(status).json({ message });
};

const autenticacao = ({ headers }, _res, next) => {
  const { authorization } = headers;
  const retornoAutenticacao = `${authorization}`;
  if (!authorization) {
    return next({ status: 401, message: 'Token não encontrado' });
  }
  if (retornoAutenticacao.length !== 16) {
    return next({ status: 401, message: 'Token inválido' });
  }
  return next();
};

const verificarNome = ({ body }, _res, next) => {
  const { name } = body;
  if (!name) return next({ status: 400, message: 'O campo "name" é obrigatório' });
  if (name.length < 3) {
    return next({ status: 400, message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  return next();
};

const verificarIdade = ({ body }, _res, next) => {
  const { age } = body;
  if (!age) return next({ status: 400, message: 'O campo "age" é obrigatório' });
  if (Number.isNaN(age) || !Number.isInteger(age) || age < 18) {
    return next({ 
      status: 400,
      message: 'O campo "age" deve ser um número inteiro igual ou maior que 18',
    });
  }
  return next();
};

const verificarTalk = ({ body }, _res, next) => {
  const { talk } = body;
  if (!talk) return next({ status: 400, message: 'O campo "talk" é obrigatório' });
  if (typeof talk !== 'object') {
    return next({
      status: 400,
      message: 'O campo "talk" deve ser um objeto com as chaves "watchedAt" e "rate"',
    });
  }
  const talkIsValid = verificaPropriedadesTalk(talk);
  if (talkIsValid) return next(talkIsValid);
  return next();
};

autenticacaoTalker.use(autenticacao, verificarNome, verificarIdade, verificarTalk);

module.exports = {
  autenticacaoTalker,
  handleError,
  autenticacao,
  verificarNome,
  verificarIdade,
  verificarTalk,
};