import { applyMiddleware, configureStore } from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import { Form } from "./form-store";
import { Search } from "./search-store";

export const store = configureStore({
  reducer: {
    form: Form.reducer,
    search: Search.reducer,
  },
  enhancers: [applyMiddleware(thunkMiddleware)],
});

export type RootState = ReturnType<typeof store.getState>;
