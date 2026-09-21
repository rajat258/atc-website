/**
 * Manufacturing process chain and build options.
 *
 * The process steps describe a fully integrated FIBC plant, which is how the
 * group profile deck describes the Akshay FIBC facility. Option lists are the
 * standard configuration axes a buyer needs to specify a bag.
 */

export type ProcessStep = {
  index: string;
  name: string;
  detail: string;
};

export const processChain: ProcessStep[] = [
  {
    index: "01",
    name: "Extrusion",
    detail:
      "Polymer is melted, cast into film and slit into tape. Tape denier and stretch ratio are set here, and they decide what the finished fabric can carry.",
  },
  {
    index: "02",
    name: "Weaving",
    detail:
      "Tape is woven on circular and flat looms. Circular gives a seamless tube; flat gives the panels. UV stabiliser is carried in the tape, not sprayed on after.",
  },
  {
    index: "03",
    name: "Coating and lamination",
    detail:
      "Fabric is coated where the contents are fine enough to sift through a weave, and left uncoated where the material needs to breathe.",
  },
  {
    index: "04",
    name: "Printing",
    detail:
      "Up to four colours, on up to four sides. Artwork, batch marks and handling symbols go on before the bag is cut.",
  },
  {
    index: "05",
    name: "Cutting",
    detail:
      "Fabric and webbing are cut to the drawing. Custom sizes get cut on the same line as standard ones, which is why a bespoke base does not add weeks.",
  },
  {
    index: "06",
    name: "Stitching",
    detail:
      "Bodies, loops, spouts and baffles are assembled on heavy-duty machines. Seam type is chosen for the contents: standard, dust proof, or double dust proof.",
  },
  {
    index: "07",
    name: "Inspection",
    detail:
      "Every bag is checked for seam integrity, loop attachment and dimensional accuracy before it is folded.",
  },
  {
    index: "08",
    name: "Clean packing",
    detail:
      "Food grade and clean work is sanitised, sealed and wrapped in a segregated area, then baled for dispatch free of dust and pollutants.",
  },
];

export type OptionGroup = {
  id: string;
  title: string;
  note: string;
  options: string[];
};

export const buildOptions: OptionGroup[] = [
  {
    id: "loops",
    title: "Lifting loops",
    note: "How the bag meets the forklift.",
    options: [
      "Corner loops",
      "Cross corner loops",
      "Side seam loops",
      "Loops sewn inside",
      "Tunnel loops",
      "Single stevedore strap",
      "Double stevedore straps",
      "One and two loop",
    ],
  },
  {
    id: "top",
    title: "Top and filling",
    note: "How the bag is filled and closed.",
    options: [
      "Open top with hem",
      "Open top with draw cord",
      "Open top with tightening holes",
      "Duffel top and filling skirt",
      "Filling spout",
      "Conical spout",
      "Spout with cone top",
    ],
  },
  {
    id: "bottom",
    title: "Bottom and discharge",
    note: "How the bag is emptied.",
    options: [
      "Plain closed bottom",
      "Discharge spout",
      "Spout with protection flap",
      "Spout with petal closure",
      "Spout with sewn cover",
      "Full drop bottom",
      "Conical quick discharge",
    ],
  },
  {
    id: "liner",
    title: "Liners and seams",
    note: "What stands between the bag and the contents.",
    options: [
      "Tubular PE liner",
      "Shaped or bottle neck liner",
      "Glued, sewn or loose",
      "Food grade PE",
      "Standard seam",
      "Dust proof seam",
      "Double dust proof seam",
    ],
  },
];
