const { Router } = require('express');
const rotaTalker = require('./rotasTalker');
const geradorToken = require('../utils/geradorToken');
const login = require('../middlewares/loginM');
const geradorMiddlewares = require('../middlewares/indexM');

const geradorRota = Router();

geradorRota.use('/talker', rotaTalker);

geradorRota.post('/login', login.verificarEmail, login.verificarSenha, (_, res) => {
  const token = geradorToken();
  return res.status(200).json({ token });
});

geradorRota.use(geradorMiddlewares.handleError);

module.exports = geradorRota;