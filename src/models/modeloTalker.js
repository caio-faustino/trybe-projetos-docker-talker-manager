// Importa o módulo 'fs/promises' para lidar com operações de arquivo assíncronas
const fs = require('fs/promises');
// Importa o módulo 'presenteNoArquivo' do diretório '../utils' que contém uma função
const presenteNoArquivo = require('../utils/presenteNoArquivo');

// Define uma função assíncrona chamada 'retornaTodos' que retorna uma promessa
const retornaTodos = async () => {
  try {
    // Lê o conteúdo do arquivo 'src/talker.json' de forma assíncrona
    const talkers = await fs.readFile('src/talker.json');
    // Retorna um objeto com o status 200 e o conteúdo do arquivo convertido em objeto JavaScript
    return { status: 200, result: JSON.parse(talkers) };
  } catch (error) {
    // Retorna um objeto com o status 500 e uma mensagem de erro em caso de falha na leitura do arquivo
    return { status: 500, result: { message: 'INTERNAL SERVER ERROR, file not found' } };
  }
};

// Define uma função assíncrona chamada 'retornaPelaId' que recebe o parâmetro 'talkerId'
const retornaPelaId = async (talkerId) => {
  // Chama a função 'retornaTodos' para obter a lista de palestrantes
  const { status, message, result } = await retornaTodos();
  // Verifica se houve uma mensagem de erro ao obter a lista
  if (message) {
    // Retorna um objeto com o status e a mensagem de erro
    return { status, message };
  }
  // Procura o palestrante pelo 'id' fornecido
  const talker = result.find(({ id }) => id === Number(talkerId));
  // Verifica se o palestrante foi encontrado
  return talker
    ? { status: 200, result: talker }
    : { status: 404, result: { message: 'Pessoa palestrante não encontrada' } };
};

// Define uma função assíncrona chamada 'search' que recebe um objeto desestruturado com as propriedades 'rate', 'q' e 'date'
const search = async ({ rate, q, date }) => {
  // Chama a função 'retornaTodos' para obter a lista de palestrantes
  const { status, result } = await retornaTodos();
  try {
    // Filtra os palestrantes com base nas condições de pesquisa fornecidas
    const filtrarPorConsulta = result.filter(({ name: talkerName, talk }) => {
      const adequaTermoPesquisa = talkerName.includes(q) && talk.watchedAt.includes(date);
      const classificaTermoAdequadoPesquisa = (!rate ? true : talk.rate === Number(rate));
      return adequaTermoPesquisa && classificaTermoAdequadoPesquisa;
    });
    // Retorna um objeto com o status e o resultado da filtragem
    return { status, result: filtrarPorConsulta };
  } catch (error) {
    // Retorna um objeto com o status e o resultado original em caso de erro
    return { status, result };
  }
};

// Define uma função assíncrona chamada 'create' que recebe um objeto desestruturado com as propriedades 'name', 'age' e 'talk'
const create = async ({ name, age, talk }) => {
  // Chama a função 'retornaTodos' para obter a lista de palestrantes
  const { result } = await retornaTodos();
  // Calcula o próximo ID com base no último palestrante da lista
  const proximaId = result[result.length - 1].id + 1;
  // Cria um novo objeto 'talker' com as propriedades fornecidas
  const novoTalker = {
    name,
    age,
    id: proximaId,
    talk,
  };
  // Chama a função 'presenteNoArquivo' para adicionar o novo palestrante à lista e salvá-la no arquivo
  await presenteNoArquivo([...result, novoTalker]);
  // Retorna o novo palestrante criado
  return novoTalker;
};

// Define uma função assíncrona chamada 'atualiza' que recebe os parâmetros 'id' e 'payload'
const atualiza = async (id, payload) => {
  // Chama a função 'retornaTodos' para obter a lista de palestrantes
  const { result } = await retornaTodos();
  // Procura o palestrante a ser atualizado pelo 'id' fornecido
  const atualizadorTalker = result.find((talker) => talker.id === Number(id));
  // Verifica se o palestrante foi encontrado
  if (!atualizadorTalker) {
    // Retorna um objeto com o status 404 e uma mensagem de erro
    return { status: 404, result: { message: 'Pessoa palestrante não encontrada' } };
  }
  // Cria um novo objeto 'talkerAtualizado' mesclando o palestrante encontrado com as propriedades fornecidas em 'payload'
  const talkerAtualizado = { ...atualizadorTalker, ...payload };
  // Atualiza o palestrante na lista
  const novoTalker = result.map((talker) => (talker.id === Number(id) ? talkerAtualizado : talker));
  // Chama a função 'presenteNoArquivo' para atualizar a lista de palestrantes no arquivo
  await presenteNoArquivo(novoTalker);
  // Retorna o palestrante atualizado
  return { status: 200, result: talkerAtualizado };
};

// Define uma função assíncrona chamada 'apagarTalker' que recebe o parâmetro 'id'
const apagarTalker = async (id) => {
  // Chama a função 'retornaTodos' para obter a lista de palestrantes
  const { result } = await retornaTodos();
  // Filtra a lista de palestrantes removendo o palestrante com o 'id' fornecido
  const novoTalker = result.filter((talker) => talker.id !== Number(id));
  // Verifica se houve alteração na lista
  if (result.length <= novoTalker.length) {
    // Retorna um objeto com o status 404 e uma mensagem de erro
    return { status: 404, result: { message: 'Pessoa palestrante não encontrada' } };
  }
  // Chama a função 'presenteNoArquivo' para atualizar a lista de palestrantes no arquivo
  await presenteNoArquivo(novoTalker);
  // Retorna um objeto com o status 204 indicando sucesso na exclusão
  return { status: 204 };
};

// Define uma função assíncrona chamada 'patch' que recebe os parâmetros 'id' e 'rate'
const patch = async (id, rate) => {
  // Chama a função 'retornaTodos' para obter a lista de palestrantes
  const { result } = await retornaTodos();
  // Chama a função 'retornaPelaId' para obter informações do palestrante pelo 'id' fornecido
  const { result: { message }, status } = await retornaPelaId(id);
  // Verifica se houve uma mensagem de erro ao obter as informações do palestrante
  if (message) { return { status, message }; }
  const novoTalker = result.map((talker) => {
    const { talk } = talker;
    return Number(id) === talker.id
      ? { ...talker, talk: { ...talk, rate: Number(rate) } }
      : talker;
  });
  // Chama a função 'presenteNoArquivo' para atualizar a lista de palestrantes no arquivo
  await presenteNoArquivo(novoTalker);
  // Retorna um objeto com o status 204 indicando sucesso na atualização parcial
  return { status: 204 };
};

// Exporta todas as funções para serem utilizadas em outros módulos
module.exports = {
  retornaTodos,
  retornaPelaId,
  create,
  atualiza,
  apagarTalker,
  search,
  patch,
};
