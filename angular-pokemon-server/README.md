# Angular Pokemon Server

Backend server for the Angular Pokemon App.

## Setup

```bash
npm install
```

## Run

```bash
node server.js
```

Server runs on port 8080

## API Endpoints

- `GET /api/pokemons/` - Get all Pokemon
- `GET /api/pokemons/custom` - Get custom Pokemon
- `GET /api/pokemons/stats` - Get statistics
- `POST /api/pokemons/custom` - Create custom Pokemon
- `DELETE /api/pokemons/custom/:id` - Delete custom Pokemon
- `POST /api/pokemons/sync` - Sync from PokeAPI