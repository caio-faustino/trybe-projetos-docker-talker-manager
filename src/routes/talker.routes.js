const { Router } = require('express');
const talkerModel = require('../models/talker.model');
const talkerMiddleware = require('../middlewares/talker.middlewares');

const talkerRouter = Router();

talkerRouter.get('/', async (_req, res) => {
  const { status, result } = await talkerModel.getAll();
  return res.status(status).json(result);
});

talkerRouter.get('/:id', talkerMiddleware.validateId, async (req, res) => {
  const { id } = req.params;
  const { status, result } = await talkerModel.getById(id);
  return res.status(status).json(result);
});

talkerRouter.use(talkerMiddleware.handleError);

module.exports = talkerRouter;