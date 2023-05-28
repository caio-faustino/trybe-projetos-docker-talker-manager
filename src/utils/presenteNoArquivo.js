// Importa o módulo fs/promises para lidar com operações de arquivo assíncronas
const fs = require('fs/promises');

// Define a função presenteNoArquivo que recebe o parâmetro payload
const presenteNoArquivo = async (payload) => {
  // Escreve o conteúdo do payload no arquivo 'src/talker.json' como uma string JSON formatada
  await fs.writeFile('src/talker.json', JSON.stringify(payload, null, 2));
};

// Exporta a função presenteNoArquivo
module.exports = presenteNoArquivo;
