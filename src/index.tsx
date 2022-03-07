import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Form } from "./app/form/form";
import { Home } from "./app/home/home";
import { Entries } from "./app/form/entries/entries";
import { Basics } from "./app/form/basics/basics";
import { Links } from "./app/form/links/links";
import { Search } from "./app/search/search";
import { App } from "./app/app";
import { store } from "./store/store";
import { reportWebVitals } from "./reportWebVitals";

import "./index.scss";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="" element={<Home />} />
            <Route path="form" element={<Form />}>
              <Route path="basics" element={<Basics />} />
              <Route path="entries" element={<Entries />} />
              <Route path="links" element={<Links />} />
            </Route>
            <Route path="search" element={<Search />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
