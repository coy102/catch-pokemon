export interface IEvolutionChain {
  chain: IChain;
}

export interface IChain {
  evolves_to: Array<IEvolvesto2>;
  species: ISpecies;
}

interface IEvolvesto2 {
  evolves_to: Array<IEvolvesto>;
  species: ISpecies;
}

export interface IEvolvesto {
  evolves_to: Array<any>;
  species: ISpecies;
}

interface ISpecies {
  name: string;
  url: string;
}
