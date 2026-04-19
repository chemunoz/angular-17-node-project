module.exports = app => {
  const pokemons = require("../controllers/pokemon.controller.js");

  var router = require("express").Router();

  router.get("/", pokemons.findAll);
  router.get("/custom", pokemons.getCustom);
  router.get("/stats", pokemons.getStats);
  router.post("/custom", pokemons.createCustom);
  router.delete("/custom/:id", pokemons.deleteCustom);
  router.post("/sync", pokemons.syncFromApi);

  app.use("/api/pokemons", router);
};