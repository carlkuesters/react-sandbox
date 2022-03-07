import React from "react";
import { Link, Outlet } from "react-router-dom";

import styles from "./app.module.scss";

export function App() {
  return (
    <>
      <nav className={styles.nav}>
        <Link to="/">Home</Link>
        <Link to="/form/basics">Form</Link>
        <Link to="/search">Search</Link>
      </nav>
      <div className={styles.container}>
        <Outlet />
      </div>
    </>
  );
}
