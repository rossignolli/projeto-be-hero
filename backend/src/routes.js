const express = require("express");
const routes = express.Router();
const OngsController = require("./controllers/OngsController");
const IncidentController = require("./controllers/IncidentController");
const SessionController = require("./controllers/SessionController");
const ProfileController = require("./controllers/ProfileController");
const { celebrate, Segments, Joi } = require("celebrate");

routes.post("/sessions", SessionController.create);

routes.get("/ongs", OngsController.index);

routes.post(
  "/ongs",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string()
        .required()
        .email(),
      whatsapp: Joi.string()
        .required()
        .min(10)
        .max(11),
      city: Joi.string().required(),
      uf: Joi.string()
        .required()
        .length(2)
    })
  }),
  OngsController.create
);

routes.post("/incidents", IncidentController.create);

routes.get("/incidents", IncidentController.index);

routes.delete("/incidents/:id",celebrate({
      [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
        
      })
}), IncidentController.delete);



routes.get(
  "/profile",
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required()
    }).unknown()
  }),
  ProfileController.index
);

module.exports = routes;
