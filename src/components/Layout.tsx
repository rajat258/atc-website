import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { ScrollToTop } from "./ScrollToTop";

/** The page frame every route renders inside. */
export function Layout() {
  return (
    <>
      <ScrollToTop />
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
