const { Router } = require('express');
const talkerDBModel = require('../models/modeloTalkerBaseDados');

const rotaTalkerDataBase = Router();

rotaTalkerDataBase.get('/', async (_req, res) => {
  const talkers = await talkerDBModel.retornaTodos();
  return res.status(200).json(talkers);
});

module.exports = rotaTalkerDataBase;