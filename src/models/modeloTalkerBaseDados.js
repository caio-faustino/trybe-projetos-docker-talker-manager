const conexoes = require('../db/conexoes');

const retornaTodos = async () => {
  const talkers = await conexoes.execute('SELECT * FROM talkers');
  console.log(talkers[0]);
  const formatedTalkers = talkers[0]
    .map(({ id, name, age, talk_watched_at: watchedAt, talk_rate: rate }) => ({
      name, id, age, talk: { watchedAt, rate } }));
  console.log(formatedTalkers);
  return formatedTalkers;
};

module.exports = { retornaTodos };