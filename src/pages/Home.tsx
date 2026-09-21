import { Seo } from "../components/Seo";
import { CallToAction } from "../sections/CallToAction";
import { Divisions } from "../sections/Divisions";
import { Hero } from "../sections/Hero";
import { Industries } from "../sections/Industries";
import { Numbers } from "../sections/Numbers";
import { Process } from "../sections/Process";
import { Range } from "../sections/Range";
import { Ticker } from "../sections/Ticker";

/**
 * Home.
 *
 * The order is deliberate: who we are, what we make, the numbers, how we
 * make it, who we make it for, then the ask. A buyer who stops after the
 * second band has still seen the catalogue.
 */
export function Home() {
  return (
    <>
      <Seo
        title="FIBC jumbo bags built to spec"
        description="ATC Group manufactures FIBC bulk bags, woven sacks and industrial packaging near Ahmedabad, Gujarat. U panel, circular cross corner, baffle, food grade and Type C. 500 to 2,000 kg safe working load."
      />
      <Hero />
      <Ticker />
      <Divisions />
      <Range />
      <Numbers />
      <Process />
      <Industries />
      <CallToAction />
    </>
  );
}
