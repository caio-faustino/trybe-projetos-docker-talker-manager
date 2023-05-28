const { Router } = require('express');
const talkerDBModel = require('../models/modeloTalkerBaseDados');

// Cria uma instância do router para as rotas da base de dados dos talkers
const rotaTalkerDataBase = Router();

// Rota GET para obter todos os talkers da base de dados
rotaTalkerDataBase.get('/', async (_req, res) => {
  const talkers = await talkerDBModel.retornaTodos();
  return res.status(200).json(talkers);
});

module.exports = rotaTalkerDataBase;
