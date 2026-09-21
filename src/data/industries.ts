/**
 * Verticals, as named in the ATC Group profile deck.
 *
 * Each entry pairs the sector with the bag that usually suits it and the
 * commodities buyers in that sector actually ship, rather than leaving the
 * reader to work it out.
 */

export type Industry = {
  id: string;
  name: string;
  commodities: string;
  recommends: string;
};

export const industries: Industry[] = [
  {
    id: "agrochemical",
    name: "Agrochemical",
    commodities: "Fertiliser, urea, soil conditioners, crop inputs",
    recommends: "U panel with liner",
  },
  {
    id: "agriculture",
    name: "Agriculture",
    commodities: "Grain, pulses, seed, animal feed, oil cake",
    recommends: "Ventilated or food grade",
  },
  {
    id: "chemical",
    name: "Chemical",
    commodities: "Soda ash, resins, polymer pellets, additives",
    recommends: "Baffle, or Type C where flammable",
  },
  {
    id: "minerals",
    name: "Minerals",
    commodities: "Ores, silica, talc, barytes, quartz",
    recommends: "Circular cross corner",
  },
  {
    id: "dyes",
    name: "Dyes and pigments",
    commodities: "Dye intermediates, pigments, fine powders",
    recommends: "Industrial clean, dust proof seams",
  },
  {
    id: "sand",
    name: "Sand",
    commodities: "Foundry sand, silica sand, frac sand",
    recommends: "Circular cross corner, 2,000 kg",
  },
  {
    id: "construction",
    name: "Construction",
    commodities: "Cement, aggregate, gravel, dry mix",
    recommends: "Builder bags, or reconditioned",
  },
  {
    id: "sugar",
    name: "Sugar",
    commodities: "Refined sugar, jaggery, sweeteners",
    recommends: "Food grade with liner",
  },
  {
    id: "ceramic",
    name: "Ceramic",
    commodities: "Frit, glaze, clay bodies, feldspar",
    recommends: "Circular cross corner",
  },
];
