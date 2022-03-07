import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Dispatch } from "redux";
import { HttpData } from "../model/http-data.interface";
import { RootState } from "./store";

interface SearchState {
  searchTerm: string;
  httpDataSearch: HttpData<any> | null;
}

const initialState: SearchState = {
  searchTerm: "",
  httpDataSearch: null,
};

const searchStore = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setHttpDataSearch: (state, action: PayloadAction<HttpData<any>>) => {
      state.httpDataSearch = action.payload;
    },
  },
});

export namespace Search {
  export const reducer = searchStore.reducer;
  export const Actions = searchStore.actions;

  const getState = (state: RootState) => state.search;
  export const getSearchTerm = createSelector(
    [getState],
    (state) => state.searchTerm
  );
  export const getHttpDataSearch = createSelector(
    [getState],
    (state) => state.httpDataSearch
  );
  export const isSearchLoading = createSelector(
    [getHttpDataSearch],
    (httpDataSearch) => Boolean(httpDataSearch && httpDataSearch.loading)
  );
  export const getSearchResponse = createSelector(
    [getHttpDataSearch],
    (httpDataSearch) => httpDataSearch && httpDataSearch.data
  );
  export const getSearchError = createSelector(
    [getHttpDataSearch],
    (httpDataSearch) => httpDataSearch && httpDataSearch.error
  );

  export async function search(
    dispatch: Dispatch<any>,
    getState: () => RootState
  ) {
    dispatch(
      Search.Actions.setHttpDataSearch({
        loading: true,
        data: null,
        error: null,
      })
    );
    const state = getState();
    await axios
      .get("https://api.github.com/users/" + state.search.searchTerm)
      .then((response) => {
        dispatch(
          Search.Actions.setHttpDataSearch({
            loading: false,
            data: response.data,
            error: null,
          })
        );
      })
      .catch((error) => {
        dispatch(
          Search.Actions.setHttpDataSearch({
            loading: false,
            data: null,
            error: JSON.stringify(error),
          })
        );
      });
  }
}
