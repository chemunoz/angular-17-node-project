import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-add-pokemon',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-pokemon.component.html',
  styleUrl: './add-pokemon.component.css'
})
export class AddPokemonComponent {
  private pokemonService = inject(PokemonService);
  private router = inject(Router);

  name = '';
  imageUrl = '';
  selectedTypes: string[] = [];

  pokemonTypes = [
    'normal', 'fire', 'water', 'electric', 'grass', 'ice',
    'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug',
    'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'
  ];

  getTypeColor(type: string): string {
    const colors: Record<string, string> = {
      normal: '#A8A878',
      fire: '#F08030',
      water: '#6890F0',
      electric: '#F8D030',
      grass: '#78C850',
      ice: '#98D8D8',
      fighting: '#C03028',
      poison: '#A040A0',
      ground: '#E0C068',
      flying: '#A890F0',
      psychic: '#F85888',
      bug: '#A8B820',
      rock: '#B8A038',
      ghost: '#705898',
      dragon: '#7038F8',
      dark: '#705848',
      steel: '#B8B8D0',
      fairy: '#EE99AC'
    };
    return colors[type] || '#A8A878';
  }

  onTypeChange(type: string, event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      this.selectedTypes.push(type);
    } else {
      this.selectedTypes = this.selectedTypes.filter(t => t !== type);
    }
  }

  onSubmit(): void {
    if (!this.name.trim() || !this.imageUrl.trim() || this.selectedTypes.length === 0) {
      alert('Please fill all fields');
      return;
    }

    const customPokemon = {
      name: this.name,
      imageUrl: this.imageUrl,
      types: this.selectedTypes
    };

    this.pokemonService.createCustomPokemon(customPokemon).subscribe({
      next: () => {
        this.router.navigate(['/pokemon']);
      },
      error: (e) => {
        console.error(e);
        alert('Error creating Pokemon');
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/pokemon']);
  }
}
