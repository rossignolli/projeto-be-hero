



const express = require('express');
const routes = express.Router();
const OngsController = require('./controllers/OngsController')
const IncidentController = require('./controllers/IncidentController')
const SessionController = require('./controllers/SessionController')
const ProfileController = require('./controllers/ProfileController')



routes.post('/sessions', SessionController.create);


routes.get('/ongs', OngsController.index);
routes.post('/ongs', OngsController.create);
routes.post('/incidents', IncidentController.create)
routes.get('/incidents', IncidentController.index)
routes.delete('/incidents/:id', IncidentController.delete)
routes.get('/profile', ProfileController.index)


module.exports = routes;
