// Importa o módulo 'crypto' que fornece funcionalidades de criptografia em Node.js
const crypto = require('crypto');

// Define uma função chamada 'geradorToken'
const geradorToken = () => crypto.randomBytes(8).toString('hex');

// Exporta a função 'geradorToken' para ser utilizada em outros arquivos
module.exports = geradorToken;
