const handleError = (error, _req, res, _next) => {
  const { status, message } = error;
  return res.status(status).json({ message });
};

const validateId = ({ params: { id } }, _res, next) => {
  const numberId = Number(id);
  if (Number.isInteger(numberId) && !Number.isNaN(numberId)) return next();
  return next({ status: 400, message: 'Id inválido' });
};

module.exports = { handleError, validateId };