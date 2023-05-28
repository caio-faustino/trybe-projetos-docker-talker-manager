// Importa o módulo conexoes do arquivo '../db/conexoes'
const conexoes = require('../db/conexoes');

// Define a função assíncrona retornaTodos
const retornaTodos = async () => {
  // Executa uma consulta no banco de dados usando a função execute do objeto conexoes
  // A consulta seleciona todos os registros da tabela talkers
  const talkers = await conexoes.execute('SELECT * FROM talkers');

  // Exibe o primeiro elemento (índice 0) do array talkers no console
  console.log(talkers[0]);
  const formatedTalkers = talkers[0].map(({ 
    id, name, age, talk_watched_at: watchedAt, talk_rate: rate,
   }) => ({
    name, id, age, talk: { watchedAt, rate },
  }));

  // Exibe o array formatedTalkers no console
  console.log(formatedTalkers);

  // Retorna o array formatedTalkers como resultado da função
  return formatedTalkers;
};

// Exporta a função retornaTodos
module.exports = { retornaTodos };
