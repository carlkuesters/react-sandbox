import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Form } from "../../../store/form-store";

import styles from "./entries.module.scss";

export function Entries() {
  const entries = useSelector(Form.getEntries);
  const dispatch = useDispatch();
  return (
    <>
      <span>Entries:</span>
      <div style={{ marginTop: "10px" }}>
        {entries.map((entry, index) => (
          <div key={index} className={styles.entry}>
            <label>Name:</label>
            <input
              id={"entryName" + index}
              type="text"
              value={entry.name}
              onChange={(e) => {
                dispatch(
                  Form.Actions.setEntryName({ index, name: e.target.value })
                );
              }}
            />
            <label>Value:</label>
            <input
              type="text"
              value={entry.value}
              onChange={(e) => {
                dispatch(
                  Form.Actions.setEntryValue({ index, value: e.target.value })
                );
              }}
            />
            <input
              id={"entryOption" + index}
              type="checkbox"
              checked={entry.option}
              onChange={(e) =>
                dispatch(
                  Form.Actions.setEntryOption({
                    index,
                    option: e.target.checked,
                  })
                )
              }
            />
            <label htmlFor={"entryOption" + index}>Option</label>
            <button onClick={() => dispatch(Form.Actions.removeEntry(index))}>
              X
            </button>
          </div>
        ))}
      </div>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value=""
          placeholder="Type to add new entry..."
          onChange={(e) => {
            dispatch(Form.Actions.addEntry(e.target.value));
            setTimeout(() => {
              document.getElementById("entryName" + entries.length)!.focus();
            });
          }}
        />
      </div>
      <div className="page-navigation">
        <Link to="/form/basics">
          <button>Back</button>
        </Link>
        <Link to="/form/links">
          <button>Next</button>
        </Link>
      </div>
    </>
  );
}
