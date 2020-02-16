export interface IPokemonSpecies {
  flavor_text_entries: Array<Flavortextentry>;
  evolution_chain: IEvolutionchain;
  evolves_from_species: IEvolveFrom;
}

export interface IEvolveFrom {
  name: string;
  url: string;
}

interface IEvolutionchain {
  url: string;
}

interface Flavortextentry {
  flavor_text: string;
}
