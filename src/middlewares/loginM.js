const verificarEmail = ({ body }, _res, next) => {
    const { email } = body;
    const index = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return next({ status: 400, message: 'O campo "email" é obrigatório' });
    if (!index.test(email)) {
      return next({
        status: 400,
        message: 'O "email" deve ter o formato "email@email.com"',
      });
    }
    return next();
  };
  
  const verificarSenha = ({ body }, _res, next) => {
    const { password } = body;
    if (!password) return next({ status: 400, message: 'O campo "password" é obrigatório' });
    if (password.length < 6) {
      return next({ status: 400, message: 'O "password" deve ter pelo menos 6 caracteres' });
    }
    return next();
  };
  
  module.exports = { verificarEmail, verificarSenha };