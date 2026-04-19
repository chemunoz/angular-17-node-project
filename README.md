# Pokemon App - Full Stack Application

A full-stack Angular 17 + Node.js application for browsing and managing Pokemon. The backend syncs Pokemon data from the PokeAPI and stores them in MongoDB, with support for custom Pokemon creation.

## Features

- **Browse Pokemon**: View all Pokemon from the PokeAPI (stored locally in MongoDB)
- **Search**: Filter Pokemon by name (minimum 3 characters)
- **Custom Pokemon**: Create your own Pokemon with custom name, image, and types
- **Delete Custom**: Remove custom Pokemon from your collection
- **Details View**: View Pokemon details including stats, types, height, and weight

## Project Structure

```
/angular-pokemon-client/  # Angular 17 frontend
/angular-pokemon-server/ # Node.js + Express backend
```

## Prerequisites

- Node.js 18+
- MongoDB (running on port 27017)
- Docker (for MongoDB container)

## Running the Project

### 1. Start MongoDB

```bash
docker run -d --name mongodb -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=password \
  mongo
```

### 2. Start Backend

```bash
cd angular-pokemon-server
npm install
node server.js
```

Backend runs on http://localhost:8080

### 3. Start Frontend

```bash
cd angular-pokemon-client
npm install
npm start
```

Frontend runs on http://localhost:8081

## First Run

On the first run, the backend will automatically:
1. Connect to MongoDB
2. Sync 150 Pokemon from the PokeAPI
3. Store them in your local database

Subsequent runs will use the cached data from MongoDB.

Custom Pokemon are preserved across runs.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/pokemons/` | Get all Pokemon (syncs from API if DB empty) |
| GET | `/api/pokemons/custom` | Get custom Pokemon only |
| GET | `/api/pokemons/stats` | Get count statistics |
| POST | `/api/pokemons/custom` | Create custom Pokemon |
| DELETE | `/api/pokemons/custom/:id` | Delete custom Pokemon |
| POST | `/api/pokemons/sync` | Force sync from PokeAPI |

## Custom Pokemon Creation

Navigate to http://localhost:8081/add to create a custom Pokemon:
- **Name**: Enter the Pokemon name
- **Image URL**: Provide a valid image URL
- **Types**: Select one or more types

Custom Pokemon will appear in the list with a "Custom" badge and can be deleted.

## Dependencies

### Backend (angular-pokemon-server)
- express: ^4.18.2
- mongoose: ^6.11.1
- cors: ^2.8.5
- axios: ^1.6.0

### Frontend (angular-pokemon-client)
- @angular/core: ^17.0.0
- bootstrap: ^4.6.2
- rxjs: ~7.8.0

## Technology Stack

- **Frontend**: Angular 17, Bootstrap 4, TypeScript
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **External API**: PokeAPI (https://pokeapi.co/api/v2)

## Database Schema

### Pokemon Model
```javascript
{
  pokeApiId: Number,      // ID from PokeAPI (unique)
  name: String,          // Pokemon name
  imageUrl: String,      // Image URL
  types: [String],      // Pokemon types
  stats: {              // Stats object
    hp: Number,
    attack: Number,
    defense: Number,
    speed: Number
  },
  height: Number,        // Height
  weight: Number,        // Weight
  isCustom: Boolean,     // True for custom Pokemon
  fromApi: Boolean      // True if from PokeAPI
}
```

## License

ISC