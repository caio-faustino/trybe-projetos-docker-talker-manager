const express = require('express');
const geradorRota = require('./routes');

// Cria uma instância do aplicativo Express
const app = express();

// Utiliza o middleware do Express para interpretar o corpo das requisições como JSON
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

// Define uma rota de acesso à raiz ("/") que retorna uma resposta com status 200 (OK)
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// Utiliza as rotas definidas no módulo "routes"
app.use(geradorRota);

// Inicia o servidor na porta definida (ou na porta 3001, se não especificada em process.env.PORT)
app.listen(PORT, () => {
  console.log('Online');
});
