const { Router } = require('express');

const verificarConsultas = Router();

const verificarId = ({ params: { id } }, _res, next) => {
  const idNumero = Number(id);
  if (Number.isInteger(idNumero) && !Number.isNaN(idNumero)) return next();
  return next({ status: 400, message: 'Id inválido' });
};

const verificarOcorrenciaTermoProcurado = (req, _res, next) => {
  const { rate } = req.query;
  const numeroOcorrencias = Number(rate);
  const foraAlcance = numeroOcorrencias < 1 || numeroOcorrencias > 5;
  if (rate !== undefined && (!Number.isInteger(numeroOcorrencias) || foraAlcance)) {
    return next({ status: 400, message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' });
  }
  return next();
};

const verificarProcuraTermoNome = (req, _res, next) => {
  const { q } = req.query;
  req.query = { ...req.query, q: q || '' };
  next();
};

const verificarProcuraTermoData = (req, _res, next) => {
  const { date } = req.query;
  const index = /^(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
  if (date && !index.test(date)) {
    return next({ status: 400, message: 'O parâmetro "date" deve ter o formato "dd/mm/aaaa"' });
  }
  req.query = { ...req.query, date: date || '' };
  return next();
};

verificarConsultas.use(
  verificarOcorrenciaTermoProcurado, 
  verificarProcuraTermoNome, 
  verificarProcuraTermoData,
  );

module.exports = {
  verificarId,
  verificarOcorrenciaTermoProcurado,
  verificarProcuraTermoNome,
  verificarProcuraTermoData,
  verificarConsultas,
};