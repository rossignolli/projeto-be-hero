const express = require('express');
const routes = require('./routes');
const cors = require('cors')

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);


//** Rotas e recursos */
/**Metodos HTTP 
 * 
 * 
 * GET: BUSCAR UMA INFO!
 * POST: Criar uma informação no backend
 * PUT: Alterar uma informação no back-end
 * DELETE: Deletar uma informação
 * 
 * Request Body: Corpo da requisição, utlizando para criar ou alterar recursos
 * 
*/

app.listen(3333);

