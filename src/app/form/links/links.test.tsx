import { render, screen } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import { Links } from "./links";

describe("Links", () => {
  it("displays title", () => {
    // Given
    const store = configureStore()({
      form: {
        links: [],
      },
    });

    // When
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Links />
        </Provider>
      </BrowserRouter>
    );

    // Then
    const titleElement = screen.getByText(/Links/i);
    expect(titleElement).toBeInTheDocument();
  });
});
