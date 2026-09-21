/**
 * The group's history, as set out in the profile deck.
 */

export type Milestone = {
  year: string;
  title: string;
  detail: string;
};

export const timeline: Milestone[] = [
  {
    year: "1988",
    title: "Akshay Trading Co. opens",
    detail:
      "The group starts in trade, not manufacture. Three and a half decades of buying and selling packaging is where the supplier network comes from.",
  },
  {
    year: "1993",
    title: "Akshay FIBC starts producing",
    detail:
      "Manufacturing begins. The decision to build bags rather than only broker them is what turns a trading house into a group.",
  },
  {
    year: "2000s",
    title: "Full integration",
    detail:
      "Extrusion, weaving, printing, cutting and stitching are brought under one roof. Controlling the fabric is what makes genuinely custom work practical.",
  },
  {
    year: "Today",
    title: "Three units, two and a half million bags",
    detail:
      "Three manufacturing units on the outskirts of Ahmedabad, more than ten states served domestically, and an export book that keeps growing.",
  },
];
