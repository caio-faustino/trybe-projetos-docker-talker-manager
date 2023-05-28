const { Router } = require('express');
const talkerModel = require('../models/modeloTalker');
const talkerMiddleware = require('../middlewares/talkerM');
const geradorMiddlewares = require('../middlewares/indexM');
const { valido } = require('../utils/verificarTalk');
const rotaTalkerDataBase = require('./rotasTalkerBaseDados');

// Cria uma instância do router para as rotas dos talkers
const rotaTalker = Router();

// Rota GET para obter todos os talkers
rotaTalker.get('/', async (_req, res) => {
  const { status, result } = await talkerModel.retornaTodos();
  return res.status(status).json(result);
});

// Rota GET para pesquisa de talkers com consultas
rotaTalker.get('/search',
  geradorMiddlewares.autenticacao,
  talkerMiddleware.verificarConsultas,
  async (req, res) => {
    const { status, result } = await talkerModel.search(req.query);
    return res.status(status).json(result);
  });

// Utiliza as rotas de talkers base de dados
rotaTalker.use('/db', rotaTalkerDataBase);

// Rota GET para obter um talker pelo ID
rotaTalker.get('/:id', talkerMiddleware.verificarId, async (req, res) => {
  const { id } = req.params;
  const { status, result } = await talkerModel.retornaPelaId(id);
  return res.status(status).json(result);
});

// Rota POST para criar um novo talker
rotaTalker.post('/', geradorMiddlewares.autenticacaoTalker, async (req, res) => {
  const novoTalker = await talkerModel.create(req.body);
  return res.status(201).json(novoTalker);
});

// Rota PUT para atualizar um talker pelo ID
rotaTalker.put('/:id',
  talkerMiddleware.verificarId,
  geradorMiddlewares.autenticacaoTalker,
  async (req, res) => {
    const { id } = req.params;
    const { status, result } = await talkerModel.atualiza(id, req.body);
    return res.status(status).json(result);
  });

// Rota PATCH para alterar a classificação de um talker pelo ID
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

// Rota DELETE para remover um talker pelo ID
rotaTalker.delete('/:id',
  talkerMiddleware.verificarId,
  geradorMiddlewares.autenticacao,
  async (req, res) => {
    const { id } = req.params;
    const { status, result } = await talkerModel.apagarTalker(id);
    return res.status(status).json(result);
  });

module.exports = rotaTalker;
