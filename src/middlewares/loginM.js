// Define uma função chamada 'verificarEmail' que recebe três parâmetros: um objeto 'req' contendo o corpo da requisição, um objeto 'res' representando a resposta e a função 'next' que chama o próximo middleware
const verificarEmail = ({ body }, _res, next) => {
  // Extrai o valor da propriedade 'email' do objeto 'body'
  const { email } = body;
  // Expressão regular para validar o formato do email
  const index = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // Verifica se o campo 'email' está vazio
  if (!email) {
    // Chama o próximo middleware passando um objeto de erro com status 400 e uma mensagem de erro
    return next({ status: 400, message: 'O campo "email" é obrigatório' });
  }
  // Verifica se o formato do email não corresponde à expressão regular
  if (!index.test(email)) {
    // Chama o próximo middleware passando um objeto de erro com status 400 e uma mensagem de erro
    return next({ status: 400,
      message: 'O "email" deve ter o formato "email@example.com"',
    }); 
}
  // Chama o próximo middleware
  return next();
};
// Define uma função chamada 'verificarSenha' que recebe três parâmetros: um objeto 'req' contendo o corpo da requisição, um objeto 'res' representando a resposta e a função 'next' que chama o próximo middleware
const verificarSenha = ({ body }, _res, next) => {
  // Extrai o valor da propriedade 'password' do objeto 'body'
  const { password } = body;
  // Verifica se o campo 'password' está vazio
  if (!password) {
    // Chama o próximo middleware passando um objeto de erro com status 400 e uma mensagem de erro
    return next({ status: 400, message: 'O campo "password" é obrigatório' });
  } if (password.length < 6) {
    // Chama o próximo middleware passando um objeto de erro com status 400 e uma mensagem de erro
    return next({ status: 400, message: 'A "password" deve ter pelo menos 6 caracteres' });
  } // Chama o próximo middleware
   return next(); 
};

// Exporta as funções 'verificarEmail' e 'verificarSenha' como um objeto
module.exports = { verificarEmail, verificarSenha };
