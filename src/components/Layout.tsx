import * as React from "react";
import Header from "./Header";
import Footer from "./Footer";
import * as styles from "./Layout.module.css";

interface LayoutProps {
  children: React.ReactNode;
  wide?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, wide = false }) => (
  <>
    <a href="#main" className="skip-link">
      Skip to content
    </a>
    <Header />
    <main
      id="main"
      className={wide ? styles.mainWide : styles.main}
    >
      {children}
    </main>
    <Footer />
  </>
);

export default Layout;
