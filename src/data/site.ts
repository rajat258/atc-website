/**
 * Company-wide facts and contact details.
 *
 * Everything here is sourced from the ATC Group profile decks supplied by the
 * client. Figures that age (years in business) are derived at runtime so the
 * site never quietly goes stale.
 */

export const FOUNDED_GROUP = 1988;
export const FOUNDED_FIBC = 1993;

/** Years the group has traded, recalculated on every render. */
export const yearsTrading = (): number => new Date().getFullYear() - FOUNDED_GROUP;

export const site = {
  name: "ATC Group",
  legalEntities: ["Akshay FIBC", "Akshay Trading Co."],
  tagline: "Fill it. Shut it. Forget it.",
  description:
    "ATC Group manufactures FIBC jumbo bags, woven sacks and industrial packaging from three units outside Ahmedabad, Gujarat. Akshay FIBC builds new bags; Akshay Trading Co. supplies reconditioned jumbo bags and paper sacks.",
  url: "https://rajat258.github.io/atc-website/",
} as const;

export const contact = {
  person: "Akshat Shah",
  phone: "+91 98250 28793",
  phoneHref: "tel:+919825028793",
  email: "info@akshaytradingco.in",
  emailHref: "mailto:info@akshaytradingco.in",
  whatsappHref: "https://wa.me/919825028793",
  linkedin: "https://www.linkedin.com/company/akshay-trading-company",
  address: {
    line1: "Narol",
    city: "Ahmedabad",
    state: "Gujarat",
    country: "India",
  },
  hours: "Monday to Saturday, 9:30am to 6:30pm IST",
} as const;

/** Headline figures. `suffix` renders in a lighter weight beside the number. */
export const stats = [
  {
    value: 2.5,
    decimals: 1,
    suffix: "M+",
    label: "Bags produced annually",
    note: "Across three units, and still climbing",
  },
  {
    value: 3,
    suffix: "",
    label: "Manufacturing units",
    note: "On the outskirts of Ahmedabad",
  },
  {
    value: 10,
    suffix: "+",
    label: "States served in India",
    note: "Alongside a growing export book",
  },
  {
    value: yearsTrading(),
    suffix: "",
    label: "Years in packaging",
    note: `Trading since ${FOUNDED_GROUP}`,
  },
] as const;

/** Short claims that scroll in the credential ticker. */
export const credentials = [
  "Fully integrated FIBC facility",
  "Food grade production",
  "Type C conductive bags",
  "In-house extrusion and weaving",
  "Custom sizing to drawing",
  "Sanitised clean-room packing",
  "Export ready documentation",
  "Three units near Ahmedabad",
] as const;

export const navigation = [
  { label: "Products", to: "/products" },
  { label: "Capabilities", to: "/capabilities" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
] as const;
