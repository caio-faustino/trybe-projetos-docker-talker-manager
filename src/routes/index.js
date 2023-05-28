const { Router } = require('express');
const talkerRouter = require('./talker.routes');

const indexRouter = Router();

indexRouter.use('/talker', talkerRouter);

module.exports = indexRouter;