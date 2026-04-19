import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pokemon } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private apiUrl = 'http://localhost:8080/api/pokemons';

  constructor(private http: HttpClient) {}

  getAllPokemon(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(`${this.apiUrl}/`);
  }

  getCustomPokemon(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(`${this.apiUrl}/custom`);
  }

  createCustomPokemon(pokemon: Partial<Pokemon>): Observable<Pokemon> {
    return this.http.post<Pokemon>(`${this.apiUrl}/custom`, pokemon);
  }

  deleteCustomPokemon(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/custom/${id}`);
  }

  syncFromApi(): Observable<any> {
    return this.http.post(`${this.apiUrl}/sync`, {});
  }

  getStats(): Observable<{ total: number; custom: number; fromApi: number }> {
    return this.http.get<{ total: number; custom: number; fromApi: number }>(`${this.apiUrl}/stats`);
  }
}