const fs = require('fs/promises');

const presenteNoArquivo = async (payload) => {
  await fs.writeFile('src/talker.json', JSON.stringify(payload, null, 2));
};

module.exports = presenteNoArquivo;