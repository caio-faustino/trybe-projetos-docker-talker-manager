// Importa todos os componentes de outros arquivos que virão a ser utilizados

const { Router } = require('express');
const rotaTalker = require('./rotasTalker');
const geradorToken = require('../utils/geradorToken');
const login = require('../middlewares/loginM');
const geradorMiddlewares = require('../middlewares/indexM');

// Cria uma instância do Router do Express
const geradorRota = Router();

// Define a rota "/talker" usando o middleware rotaTalker
geradorRota.use('/talker', rotaTalker);

// Define a rota POST "/login" com os middlewares verificarEmail e verificarSenha do módulo login
// Quando essa rota for acessada, será gerado um token de autenticação e retornado na resposta
geradorRota.post('/login', login.verificarEmail, login.verificarSenha, (_, res) => {
  const token = geradorToken(); // Gera um token usando a função geradorToken do módulo geradorToken
  return res.status(200).json({ token }); // Retorna o token como resposta no formato JSON
});

// Usa o middleware handleError do módulo geradorMiddlewares
geradorRota.use(geradorMiddlewares.handleError);

// Exporta o objeto geradorRota para ser utilizado em outros arquivos
module.exports = geradorRota;
