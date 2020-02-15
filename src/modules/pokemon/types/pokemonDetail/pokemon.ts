export interface IDetailPokemon {
  abilities: Array<Ability2>;
  base_experience: number;
  forms: Array<Ability>;
  height: number;
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: Array<Move>;
  name: string;
  order: number;
  species: Ability;
  sprites: Sprites;
  types: Array<Type>;
  stats: Array<Stat2>;
  weight: number;
}

export interface Ability2 {
  ability: Ability;
  is_hidden: boolean;
  slot: number;
}

export interface Move {
  move: Ability;
  version_group_details: Array<Versiongroupdetail>;
}

export interface Versiongroupdetail {
  level_learned_at: number;
  move_learn_method: Ability;
  version_group: Ability;
}

export interface Ability {
  name: string;
  url: string;
}

export interface Type {
  slot: number;
  type: Ability;
}

export interface Stat2 {
  base_stat: number;
  effort: number;
  stat: Stat;
}

export interface Stat {
  name: string;
  url: string;
}

export interface Sprites {
  back_default: string;
  back_female?: any;
  back_shiny: string;
  back_shiny_female?: any;
  front_default: string;
  front_female?: any;
  front_shiny: string;
  front_shiny_female?: any;
}
