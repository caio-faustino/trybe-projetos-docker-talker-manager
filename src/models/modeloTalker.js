const fs = require('fs/promises');
const presenteNoArquivo = require('../utils/presenteNoArquivo');

const retornaTodos = async () => {
  try {
    const talkers = await fs.readFile('src/talker.json');
    return { status: 200, result: JSON.parse(talkers) };
  } catch (error) {
    return { status: 500, result: { message: 'INTERNAL SERVER ERROR, file not found' } };
  }
};

const retornaPelaId = async (talkerId) => {
  const { status, message, result } = await retornaTodos();
  if (message) return { status, message };
  const talker = result.find(({ id }) => id === Number(talkerId));
  return talker
    ? { status: 200, result: talker }
    : { status: 404, result: { message: 'Pessoa palestrante não encontrada' } };
};

const search = async ({ rate, q, date }) => {
  const { status, result } = await retornaTodos();
  try {
    const filtrarPorConsulta = result.filter(({ name: talkerName, talk }) => {
      const adequaTermoPesquisa = talkerName.includes(q) && talk.watchedAt.includes(date);
      const classificaTermoAdequadoPesquisa = (!rate ? true : talk.rate === Number(rate));
      return adequaTermoPesquisa && classificaTermoAdequadoPesquisa;
    });
    return { status, result: filtrarPorConsulta };
  } catch (error) {
    return { status, result };
  }
};

const create = async ({ name, age, talk }) => {
  const { result } = await retornaTodos();
  const proximaId = result[result.length - 1].id + 1;
  const novoTalker = {
    name,
    age,
    id: proximaId,
    talk,
  };
  await presenteNoArquivo([...result, novoTalker]);
  return novoTalker;
};

const atualiza = async (id, payload) => {
  const { result } = await retornaTodos();
  const atualizadorTalker = result.find((talker) => talker.id === Number(id));
  if (!atualizadorTalker) {
    return { status: 404, result: { message: 'Pessoa palestrante não encontrada' } };
  }
  const talkerAtualizado = { ...atualizadorTalker, ...payload };
  const novoTalker = result.map((talker) => (talker.id === Number(id) ? talkerAtualizado : talker));
  await presenteNoArquivo(novoTalker);
  return { status: 200, result: talkerAtualizado };
};

const apagarTalker = async (id) => {
  const { result } = await retornaTodos();
  const novoTalker = result.filter((talker) => talker.id !== Number(id));
  if (result.length <= novoTalker.length) {
    return { status: 404, result: { message: 'Pessoa palestrante não encontrada' } };
  }
  await presenteNoArquivo(novoTalker);
  return { status: 204 };
};

const patch = async (id, rate) => {
  const { result } = await retornaTodos();
  const { result: { message }, status } = await retornaPelaId(id);
  if (message) return { status, message }; 
  const novoTalker = result.map((talker) => {
    const { talk } = talker;
    return Number(id) === talker.id ? {
        ...talker, talk: { ...talk, rate: Number(rate) },
      } : talker;
  });
  await presenteNoArquivo(novoTalker);
  return { status: 204 };
};

module.exports = { retornaTodos, retornaPelaId, create, atualiza, apagarTalker, search, patch };