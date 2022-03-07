import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Search as SearchStore } from "../../store/search-store";

export function Search() {
  const searchTerm = useSelector(SearchStore.getSearchTerm);
  const isSearchLoading = useSelector(SearchStore.isSearchLoading);
  const searchResponse = useSelector(SearchStore.getSearchResponse);
  const searchError = useSelector(SearchStore.getSearchError);
  const dispatch = useDispatch();
  return (
    <div>
      <h1>Search</h1>
      <div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) =>
            dispatch(SearchStore.Actions.setSearchTerm(e.target.value))
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              dispatch(SearchStore.search);
            }
          }}
        />
        <button onClick={() => dispatch(SearchStore.search)}>Search</button>
      </div>
      <div style={{ marginTop: "10px" }}>
        {isSearchLoading ? <>Loading...</> : null}
        {searchResponse ? (
          <div>
            <b>{searchResponse.name}</b>
            <br />
            <img src={searchResponse.avatar_url} height={200} />
            <br />
            <code style={{ fontSize: "12px" }}>
              {JSON.stringify(searchResponse)}
            </code>
          </div>
        ) : null}
        {searchError ? <>Error: {JSON.stringify(searchError)}</> : null}
      </div>
    </div>
  );
}
