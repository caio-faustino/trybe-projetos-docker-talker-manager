const { Router } = require('express');
const talkerModel = require('../models/modeloTalker');
const talkerMiddleware = require('../middlewares/talkerM');
const geradorMiddlewares = require('../middlewares/indexM');
const { valido } = require('../utils/verificarTalk');
const rotaTalkerDataBase = require('./rotasTalkerBaseDados');

const rotaTalker = Router();

rotaTalker.get('/', async (_req, res) => {
  const { status, result } = await talkerModel.retornaTodos();
  return res.status(status).json(result);
});

rotaTalker.get('/search',
  geradorMiddlewares.autenticacao,
  talkerMiddleware.verificarConsultas,
  async (req, res) => {
    const { status, result } = await talkerModel.search(req.query);
    return res.status(status).json(result);
  });

rotaTalker.use('/db', rotaTalkerDataBase);

rotaTalker.get('/:id', talkerMiddleware.verificarId, async (req, res) => {
  const { id } = req.params;
  const { status, result } = await talkerModel.retornaPelaId(id);
  return res.status(status).json(result);
});

rotaTalker.post('/', geradorMiddlewares.autenticacaoTalker, async (req, res) => {
  const novoTalker = await talkerModel.create(req.body);
  return res.status(201).json(novoTalker);
});

rotaTalker.put('/:id',
  talkerMiddleware.verificarId,
  geradorMiddlewares.autenticacaoTalker,
  async (req, res) => {
    const { id } = req.params;
    const { status, result } = await talkerModel.atualiza(id, req.body);
    return res.status(status).json(result);
  });

rotaTalker.patch('/rate/:id',
talkerMiddleware.verificarId,
geradorMiddlewares.autenticacao,
 async ({ params, body }, res) => {
  const invalido = valido(body.rate);
  if (!invalido) {
    const { status, message } = await talkerModel.patch(params.id, body.rate);
    return res.status(status).json({ message });
  }
  return res.status(invalido.status).json({ message: invalido.message });
});

rotaTalker.delete('/:id',
  talkerMiddleware.verificarId,
  geradorMiddlewares.autenticacao,
  async (req, res) => {
    const { id } = req.params;
    const { status, result } = await talkerModel.apagarTalker(id);
    return res.status(status).json(result);
  });

module.exports = rotaTalker;