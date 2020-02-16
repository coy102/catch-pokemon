export default function catchPokemonService() {
  /**
   * Set precentage to catch a pokemon
   * @param {number} valuePercent
   */
  const getPercentageChance = (valuePercent: number) =>
    Math.random() < valuePercent;

  return {
    getPercentageChance,
  };
}
