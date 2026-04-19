export interface Pokemon {
  _id?: string;
  pokeApiId?: number;
  name: string;
  imageUrl?: string;
  sprites?: {
    front_default: string;
    other: {
      'official-artwork': {
        front_default: string;
      };
      dream_world: {
        front_default: string;
      };
    };
  };
  types: string[];
  stats?: {
    hp: number;
    attack: number;
    defense: number;
    speed: number;
  };
  height?: number;
  weight?: number;
  isCustom?: boolean;
  fromApi?: boolean;
}

export interface CustomPokemonInput {
  name: string;
  imageUrl: string;
  types: string[];
}