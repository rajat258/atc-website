/**
 * Product catalogue.
 *
 * Bag types and the two divisions come straight from the ATC Group profile
 * deck. Specification ranges describe what the plant builds to; anything a
 * buyer would treat as a certificate is deliberately absent until the client
 * supplies the documents. See CONTENT-TODO.md.
 */

export type Division = "fibc" | "trading";

export type Product = {
  id: string;
  name: string;
  division: Division;
  /** One line a buyer can scan. */
  summary: string;
  /** The longer explanation shown when a card is opened. */
  detail: string;
  /** Key/value pairs rendered as a spec table. */
  specs: { label: string; value: string }[];
  /** Named commodities rather than abstract verticals. */
  applications: string[];
  image: string;
};

export const divisions = {
  fibc: {
    id: "fibc",
    name: "Akshay FIBC",
    since: 1993,
    tagline: "Fill it. Shut it. Forget it.",
    blurb:
      "New bulk bags, woven sacks and silo bags out of a fully integrated plant. Extrusion, weaving, printing, cutting and stitching all happen under one roof, which is why a custom size does not mean a custom lead time.",
  },
  trading: {
    id: "trading",
    name: "Akshay Trading Co.",
    since: 1988,
    tagline: "The second life of a good bag.",
    blurb:
      "Reconditioned jumbo bags and paper sacks, graded and sorted before they ship. For commodities that do not need a virgin bag, this is the cheapest honest way to move a tonne.",
  },
} as const;

export const products: Product[] = [
  {
    id: "circular-cross-corner",
    name: "Circular cross corner bags",
    division: "fibc",
    summary:
      "Woven as a seamless tube, so there are no side seams to fail under load.",
    detail:
      "The body comes off the circular loom as one continuous tube. With no vertical seams there is nothing for a tear to follow, which makes this the bag of choice for dense, abrasive material. Loops are stitched across the corners so the bag hangs square on a four-point lift.",
    specs: [
      { label: "Construction", value: "Seamless circular tube, cross corner loops" },
      { label: "Safe working load", value: "500 kg to 2,000 kg" },
      { label: "Safety factor", value: "5:1 single trip, 6:1 multi trip" },
      { label: "Fabric", value: "Coated or uncoated PP, UV stabilised" },
      { label: "Liner", value: "Optional, tubular or shaped PE" },
    ],
    applications: ["Cement", "Sand", "Minerals", "Ceramic frit", "Resins"],
    image: "bags-stacked-yard.jpg",
  },
  {
    id: "u-panel",
    name: "U + 2 panel bags",
    division: "fibc",
    summary:
      "One panel wraps base and two sides; two more close the ends. The workhorse.",
    detail:
      "A single piece of fabric forms the bottom and two opposing walls, with two further panels sewn in to complete the body. The construction carries load through the fabric rather than the seams, holds its shape when filled, and is the most economical way to reach the higher SWL bands.",
    specs: [
      { label: "Construction", value: "U panel base and sides, two end panels" },
      { label: "Safe working load", value: "500 kg to 2,000 kg" },
      { label: "Safety factor", value: "5:1 single trip, 6:1 multi trip" },
      { label: "Base", value: "75 x 75 cm to 115 x 115 cm" },
      { label: "Height", value: "75 cm to 200 cm" },
    ],
    applications: ["Fertiliser", "Sugar", "Grain", "Polymer pellets", "Soda ash"],
    image: "warehouse-exterior.jpg",
  },
  {
    id: "baffle-q",
    name: "Baffle and Q bags",
    division: "fibc",
    summary:
      "Internal baffles hold the corners square, so the bag stays a cube when filled.",
    detail:
      "Panels of fabric are sewn across each of the four inside corners. Filled, the bag holds a near-cubic shape instead of bulging into a barrel. That is worth roughly a third more pallet and container utilisation, and it means bags stack without walking.",
    specs: [
      { label: "Construction", value: "Four internal baffles, form stabilised" },
      { label: "Shape retention", value: "Holds square under full load" },
      { label: "Safe working load", value: "500 kg to 1,500 kg" },
      { label: "Best for", value: "Container and warehouse density" },
      { label: "Baffle style", value: "Sewn panel or barless" },
    ],
    applications: ["Chemicals", "Agro commodities", "Dyes", "Pet food"],
    image: "truck-loaded-night.jpg",
  },
  {
    id: "food-grade",
    name: "Food grade bags",
    division: "fibc",
    summary:
      "Produced and packed in clean conditions, from virgin polymer only.",
    detail:
      "Food grade work runs on virgin polymer and is assembled, inspected and baled in a separated clean area. Bags are sanitised, sealed and wrapped before they leave, so what arrives at the filling line is free of dust, insects and the general grit of a factory floor.",
    specs: [
      { label: "Polymer", value: "Virgin PP, no recycled content" },
      { label: "Assembly", value: "Segregated clean area" },
      { label: "Packing", value: "Sanitised, sealed and stretch wrapped" },
      { label: "Liner", value: "Food grade PE, glued or sewn" },
      { label: "Traceability", value: "Batch and production date per bag" },
    ],
    applications: ["Sugar", "Rice", "Pulses", "Spices", "Milk powder", "Starch"],
    image: "stitching-floor.jpg",
  },
  {
    id: "industrial-clean",
    name: "Industrial clean bags",
    division: "fibc",
    summary:
      "The hygiene discipline of a food bag, at an industrial price point.",
    detail:
      "For material that is not food but still cannot tolerate contamination. Same segregated handling and dust control as the food grade line, without the virgin-polymer premium where the application does not require it.",
    specs: [
      { label: "Handling", value: "Dust controlled, segregated line" },
      { label: "Seams", value: "Dust proof or double dust proof" },
      { label: "Packing", value: "Sealed and wrapped" },
      { label: "Safe working load", value: "500 kg to 2,000 kg" },
    ],
    applications: ["Pharma intermediates", "Fine chemicals", "Pigments", "Additives"],
    image: "fabric-rolls.jpg",
  },
  {
    id: "type-c",
    name: "Type C conductive bags",
    division: "fibc",
    summary:
      "Conductive threads woven through the fabric, grounded during fill and discharge.",
    detail:
      "Conductive yarn is interwoven through the body on a grid. Connected to earth while the bag is filled or emptied, the bag carries static charge safely away instead of letting it build toward a discharge. The ground connection is not optional, and the bag must not be used ungrounded.",
    specs: [
      { label: "Type", value: "Type C, conductive, groundable" },
      { label: "Fabric", value: "PP with interwoven conductive yarn grid" },
      { label: "Grounding", value: "Required during filling and discharge" },
      { label: "Use with", value: "Flammable powders, flammable atmospheres" },
      { label: "Safety factor", value: "5:1 or 6:1" },
    ],
    applications: ["Flammable powders", "Solvent-adjacent handling", "Combustible dust"],
    image: "extrusion-line.jpg",
  },
  {
    id: "small-pp",
    name: "Small PP and HDPE sacks",
    division: "fibc",
    summary: "25 kg and 50 kg woven sacks, printed to your artwork.",
    detail:
      "The same extrusion and weaving lines that make bulk bag fabric run small sack stock. Available laminated or unlaminated, with BOPP for retail-facing print work where the bag is doing some of the selling.",
    specs: [
      { label: "Sizes", value: "25 kg and 50 kg" },
      { label: "Material", value: "PP or HDPE woven" },
      { label: "Finish", value: "Laminated, unlaminated, or BOPP" },
      { label: "Print", value: "Up to four colours" },
    ],
    applications: ["Grain", "Cement", "Animal feed", "Retail agro packs"],
    image: "webbing-reels.jpg",
  },
  {
    id: "used-jumbo",
    name: "Once used jumbo bags",
    division: "trading",
    summary: "1 tonne and 500 kg bags, inspected and graded before resale.",
    detail:
      "Bags that have carried one load and have plenty left in them. Every bag is opened, checked for tears, seam damage and loop wear, then graded. What fails inspection does not ship. For commodities where a virgin bag is money spent on nothing, this is the sensible line.",
    specs: [
      { label: "Capacity", value: "500 kg and 1,000 kg" },
      { label: "Condition", value: "Once used, inspected and graded" },
      { label: "Inspection", value: "Body, seams and lifting loops" },
      { label: "Supply", value: "Baled, quantity to order" },
    ],
    applications: ["Aggregates", "Scrap", "Waste handling", "Site material"],
    image: "bags-stacked-yard-2.jpg",
  },
  {
    id: "used-liner",
    name: "Used jumbo bags with liner",
    division: "trading",
    summary: "Reconditioned bags that still carry their inner liner.",
    detail:
      "Where the material needs a moisture or dust barrier but the outer bag does not need to be new. Liner integrity is checked alongside the body, so the barrier is a real one rather than a leftover.",
    specs: [
      { label: "Capacity", value: "500 kg and 1,000 kg" },
      { label: "Liner", value: "PE, checked for integrity" },
      { label: "Condition", value: "Once used, inspected and graded" },
    ],
    applications: ["Hygroscopic powders", "Granules", "Fine aggregates"],
    image: "forklift-loading.jpg",
  },
  {
    id: "used-dust",
    name: "Used bags for dust",
    division: "trading",
    summary: "800 kg bags set aside specifically for dust and fines.",
    detail:
      "Graded for fine material, where seam tightness matters more than headline load rating. A practical, low-cost answer to a job that otherwise wastes a new bag.",
    specs: [
      { label: "Capacity", value: "800 kg" },
      { label: "Graded for", value: "Dust and fine material" },
      { label: "Seams", value: "Checked for tightness" },
    ],
    applications: ["Fly ash", "Mill dust", "Fines", "Sweepings"],
    image: "plant-dusk-tall.jpg",
  },
  {
    id: "used-u-panel",
    name: "Used U + 2 panel bags",
    division: "trading",
    summary: "The standard U panel construction, second time round.",
    detail:
      "Same construction as the new U panel line, sourced and graded after a first use. Consistent shape and handling, at a fraction of the cost of new.",
    specs: [
      { label: "Construction", value: "U panel, four loop" },
      { label: "Condition", value: "Once used, inspected and graded" },
      { label: "Supply", value: "Baled, quantity to order" },
    ],
    applications: ["Bulk commodities", "Construction material", "Recycling"],
    image: "plant-exterior-dusk.jpg",
  },
  {
    id: "paper-sacks",
    name: "Paper sacks",
    division: "trading",
    summary: "New 4-ply pure paper, and HDPE laminated paper at 25 kg.",
    detail:
      "Multiwall paper sacks for dry powders and granules. The laminated version adds an HDPE ply where the contents need a moisture barrier or the sack needs to survive a damp yard.",
    specs: [
      { label: "Pure paper", value: "New, 4-ply" },
      { label: "Laminated", value: "New, HDPE laminated, 25 kg" },
      { label: "Contents", value: "Dry powders and granules" },
    ],
    applications: ["Cement", "Chemicals", "Food ingredients", "Minerals"],
    image: "plant-dusk-wide.jpg",
  },
];

export const productsByDivision = (division: Division): Product[] =>
  products.filter((product) => product.division === division);
