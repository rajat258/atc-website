import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { About } from "./pages/About";
import { Capabilities } from "./pages/Capabilities";
import { Contact } from "./pages/Contact";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { Products } from "./pages/Products";

/**
 * `BASE_URL` comes from Vite, so the router agrees with the build's base
 * path whether the site is served from a subdirectory on GitHub Pages or
 * from the root of a custom domain.
 */
const basename = import.meta.env.BASE_URL.replace(/\/$/, "");

export function App() {
  return (
    <BrowserRouter basename={basename || undefined}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="capabilities" element={<Capabilities />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
