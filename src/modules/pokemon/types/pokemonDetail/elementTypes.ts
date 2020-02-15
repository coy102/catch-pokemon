export interface IElementTypes {
  damage_relations: IDamageRelations;
}

export interface IDamageRelations {
  double_damage_from: Array<IDoubleDamagefrom>;
  double_damage_to: Array<IDoubleDamagefrom>;
  no_damage_from: Array<IDoubleDamagefrom>;
}

export interface IDoubleDamagefrom {
  name: string;
  url: string;
}
