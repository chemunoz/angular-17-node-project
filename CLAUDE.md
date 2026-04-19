# Project Instructions

## Overview
This is an Angular 17 + Node.js Pokemon application with MongoDB database.

## Project Structure
- `/angular-pokemon-client` - Angular 17 frontend application
- `/angular-pokemon-server` - Node.js Express backend server

## Running the Project

### Prerequisites
- Node.js 18+
- MongoDB (running on port 27017)

### Backend (Node.js + Express)
```bash
cd angular-pokemon-server
node server.js
```
Server runs on http://localhost:8080

### Frontend (Angular 17)
```bash
cd angular-pokemon-client
ng serve --port 8081
```
App runs on http://localhost:8081

### MongoDB via Docker
```bash
docker run -d --name mongodb -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=password \
  mongo
```

## Database Configuration
MongoDB connection is configured in `angular-pokemon-server/app/config/db.config.js`

## API Endpoints
- `GET /api/pokemons/` - Get all Pokemon (syncs from API if empty)
- `GET /api/pokemons/custom` - Get custom Pokemon only
- `GET /api/pokemons/stats` - Get count statistics
- `POST /api/pokemons/custom` - Create custom Pokemon
- `DELETE /api/pokemons/custom/:id` - Delete custom Pokemon
- `POST /api/pokemons/sync` - Force sync from PokeAPI