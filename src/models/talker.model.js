const fs = require('fs/promises');

const getAll = async () => {
  try {
    const talkers = await fs.readFile('src/talker.json');
    return { status: 200, result: JSON.parse(talkers) };
  } catch (error) {
    return { status: 500, result: { message: 'INTERNAL SERVER ERROR, file not found' } };
  }
};

const getById = async (talkerId) => {
  const { status, message, result } = await getAll();
  if (message) return { status, message };
  const talker = result.find(({ id }) => id === Number(talkerId));
  return talker
    ? { status: 200, result: talker }
    : { status: 404, result: { message: 'Pessoa palestrante não encontrada' } };
};

module.exports = { getAll, getById };