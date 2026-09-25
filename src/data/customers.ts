/**
 * Customers the client has named for the site.
 *
 * Supplied by ATC Group in September 2026. Logos are each company's own mark,
 * taken from its website, and live in public/media/customers.
 */

export type Customer = {
  id: string;
  name: string;
  logo: string;
  url: string;
};

export const customers: Customer[] = [
  {
    id: "reliance",
    name: "Reliance Industries",
    logo: "customers/reliance.png",
    url: "https://www.ril.com/",
  },
  {
    id: "madhu-silica",
    name: "Madhu Silica",
    logo: "customers/madhu-silica.png",
    url: "https://www.madhusilica.com/",
  },
  {
    id: "sumilon",
    name: "Sumilon Industries",
    logo: "customers/sumilon.png",
    url: "https://www.sumilon.com/",
  },
];
