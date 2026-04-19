const axios = require("axios");
const db = require("../models");
const Pokemon = db.pokemons;

const POKE_API_BASE = "https://pokeapi.co/api/v2";

const syncPokemonFromApi = async (limit = 150) => {
  try {
    const response = await axios.get(`${POKE_API_BASE}/pokemon?limit=${limit}`);
    const pokemonList = response.data.results;

    console.log(`Syncing ${pokemonList.length} Pokemon from API...`);

    for (const pokemon of pokemonList) {
      const existing = await Pokemon.findOne({ name: pokemon.name, fromApi: true });
      if (existing) continue;

      const detailResponse = await axios.get(pokemon.url);
      const data = detailResponse.data;

      const pokemonData = {
        pokeApiId: data.id,
        name: data.name,
        imageUrl: data.sprites.other["official-artwork"].front_default || data.sprites.front_default,
        types: data.types.map(t => t.type.name),
        stats: {
          hp: data.stats.find(s => s.stat.name === "hp")?.base_stat || 50,
          attack: data.stats.find(s => s.stat.name === "attack")?.base_stat || 50,
          defense: data.stats.find(s => s.stat.name === "defense")?.base_stat || 50,
          speed: data.stats.find(s => s.stat.name === "speed")?.base_stat || 50
        },
        height: data.height,
        weight: data.weight,
        isCustom: false,
        fromApi: true
      };

      await Pokemon.create(pokemonData);
    }

    console.log("Pokemon synced from API successfully!");
  } catch (error) {
    console.error("Error syncing Pokemon from API:", error.message);
  }
};

const checkAndSyncPokemon = async (res) => {
  try {
    const customCount = await Pokemon.countDocuments({ isCustom: true });
    const apiCount = await Pokemon.countDocuments({ fromApi: true });

    console.log(`Database has ${apiCount} API Pokemon and ${customCount} custom Pokemon`);

    if (apiCount === 0) {
      await syncPokemonFromApi(150);
    } else {
      console.log("API Pokemon already in database, skipping initial sync");
    }

    const pokemons = await Pokemon.find().sort({ pokeApiId: 1 });
    res.json(pokemons);
  } catch (error) {
    console.error("Error checking Pokemon:", error.message);
    res.status(500).json({ message: error.message });
  }
};

exports.findAll = async (req, res) => {
  await checkAndSyncPokemon(res);
};

exports.getCustom = async (req, res) => {
  try {
    const customPokemon = await Pokemon.find({ isCustom: true }).sort({ createdAt: -1 });
    res.json(customPokemon);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createCustom = async (req, res) => {
  try {
    const { name, imageUrl, types } = req.body;

    if (!name || !imageUrl || !types || types.length === 0) {
      return res.status(400).json({ message: "Name, imageUrl and at least one type are required" });
    }

    const customPokemon = new Pokemon({
      name: name.toLowerCase(),
      imageUrl,
      types,
      isCustom: true,
      fromApi: false
    });

    await customPokemon.save();
    res.status(201).json(customPokemon);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteCustom = async (req, res) => {
  try {
    const pokemon = await Pokemon.findOne({ _id: req.params.id, isCustom: true });
    if (!pokemon) {
      return res.status(404).json({ message: "Custom Pokemon not found" });
    }

    await Pokemon.findByIdAndDelete(req.params.id);
    res.json({ message: "Pokemon deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.syncFromApi = async (req, res) => {
  await syncPokemonFromApi(150);
  res.json({ message: "Pokemon synced from API successfully!" });
};

exports.getStats = async (req, res) => {
  try {
    const total = await Pokemon.countDocuments();
    const custom = await Pokemon.countDocuments({ isCustom: true });
    const fromApi = await Pokemon.countDocuments({ fromApi: true });

    res.json({
      total,
      custom,
      fromApi
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};