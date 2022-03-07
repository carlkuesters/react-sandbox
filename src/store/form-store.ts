import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Dispatch } from "redux";
import { Entry } from "../model/entry.interface";
import { HttpData } from "../model/http-data.interface";
import { RootState } from "./store";

interface FormState {
  name: string;
  description: string;
  keywords: string[];
  option1: boolean;
  option2: boolean;
  entries: Entry[];
  links: string[];
  httpDataSubmit: HttpData<any> | null;
}

const initialState: FormState = {
  name: "",
  description: "",
  keywords: [],
  option1: true,
  option2: false,
  entries: [],
  links: [],
  httpDataSubmit: null,
};

const formStore = createSlice({
  name: "form",
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    },
    addKeyword: (state, action: PayloadAction<string>) => {
      if (state.keywords.indexOf(action.payload) === -1) {
        state.keywords.push(action.payload);
      }
    },
    removeKeyword: (state, action: PayloadAction<string>) => {
      state.keywords = state.keywords.filter(
        (keyword) => keyword !== action.payload
      );
    },
    setOption1: (state, action: PayloadAction<boolean>) => {
      state.option1 = action.payload;
    },
    setOption2: (state, action: PayloadAction<boolean>) => {
      state.option2 = action.payload;
    },
    addEntry: (state, action: PayloadAction<string>) => {
      state.entries.push({
        name: action.payload,
        value: "",
        option: false,
      });
    },
    setEntryName: (
      state,
      action: PayloadAction<{ index: number; name: string }>
    ) => {
      state.entries[action.payload.index].name = action.payload.name;
    },
    setEntryValue: (
      state,
      action: PayloadAction<{ index: number; value: string }>
    ) => {
      state.entries[action.payload.index].value = action.payload.value;
    },
    setEntryOption: (
      state,
      action: PayloadAction<{ index: number; option: boolean }>
    ) => {
      state.entries[action.payload.index].option = action.payload.option;
    },
    removeEntry: (state, action: PayloadAction<number>) => {
      state.entries = state.entries.filter(
        (entry, index) => index !== action.payload
      );
    },
    addLink: (state, action: PayloadAction<string>) => {
      if (state.links.indexOf(action.payload) === -1) {
        state.links.push(action.payload);
      }
    },
    removeLink: (state, action: PayloadAction<string>) => {
      state.links = state.links.filter((link) => link !== action.payload);
    },
    setHttpDataSubmit: (state, action: PayloadAction<HttpData<any>>) => {
      state.httpDataSubmit = action.payload;
    },
  },
});

export namespace Form {
  export const reducer = formStore.reducer;
  export const Actions = formStore.actions;

  const getState = (state: RootState) => state.form;
  export const getName = createSelector([getState], (state) => state.name);
  export const getDescription = createSelector(
    [getState],
    (state) => state.description
  );
  export const getKeywords = createSelector(
    [getState],
    (state) => state.keywords
  );
  export const getOption1 = createSelector(
    [getState],
    (state) => state.option1
  );
  export const getOption2 = createSelector(
    [getState],
    (state) => state.option2
  );
  export const getEntries = createSelector(
    [getState],
    (state) => state.entries
  );
  export const getLinks = createSelector([getState], (state) => state.links);
  const getHttpDataSubmit = createSelector(
    [getState],
    (state) => state.httpDataSubmit
  );
  export const isSubmitLoading = createSelector(
    [getHttpDataSubmit],
    (httpDataSubmit) => Boolean(httpDataSubmit && httpDataSubmit.loading)
  );
  export const getSubmitResponse = createSelector(
    [getHttpDataSubmit],
    (httpDataSubmit) => httpDataSubmit && httpDataSubmit.data
  );
  export const getSubmitError = createSelector(
    [getHttpDataSubmit],
    (httpDataSubmit) => httpDataSubmit && httpDataSubmit.error
  );

  export async function submit(dispatch: Dispatch<any>) {
    dispatch(
      Form.Actions.setHttpDataSubmit({
        loading: true,
        data: null,
        error: null,
      })
    );
    await axios
      .get("https://jsonplaceholder.typicode.com/todos/1")
      .then((response) => {
        dispatch(
          Form.Actions.setHttpDataSubmit({
            loading: false,
            data: response.data,
            error: null,
          })
        );
      })
      .catch((error) => {
        dispatch(
          Form.Actions.setHttpDataSubmit({
            loading: false,
            data: null,
            error: JSON.stringify(error),
          })
        );
      });
  }
}
