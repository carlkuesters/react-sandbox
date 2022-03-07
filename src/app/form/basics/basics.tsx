import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Form } from "../../../store/form-store";
import { Words } from "../../shared/words/words";

export function Basics() {
  const name = useSelector(Form.getName);
  const description = useSelector(Form.getDescription);
  const keywords = useSelector(Form.getKeywords);
  const option1 = useSelector(Form.getOption1);
  const option2 = useSelector(Form.getOption2);
  const dispatch = useDispatch();
  return (
    <div>
      <div className="field">
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => dispatch(Form.Actions.setName(e.target.value))}
        />
      </div>
      <div className="field">
        <label>Description:</label>
        <input
          type="text"
          value={description}
          onChange={(e) =>
            dispatch(Form.Actions.setDescription(e.target.value))
          }
        />
      </div>
      <div className="field">
        <label style={{ display: "block", marginBottom: "5px" }}>
          Keywords:
        </label>
        <Words
          words={keywords}
          addWord={(word) => dispatch(Form.Actions.addKeyword(word))}
          removeWord={(word) => dispatch(Form.Actions.removeKeyword(word))}
        />
      </div>
      <div className="field">
        <span>Options:</span>
        <div>
          <input
            id="option1"
            type="checkbox"
            checked={option1}
            onChange={(e) =>
              dispatch(Form.Actions.setOption1(e.target.checked))
            }
          />
          <label htmlFor="option1">Option 1</label>
        </div>
        <div>
          <input
            id="option2"
            type="checkbox"
            checked={option2}
            onChange={(e) =>
              dispatch(Form.Actions.setOption2(e.target.checked))
            }
          />
          <label htmlFor="option2">Option 2</label>
        </div>
      </div>
      <div className="page-navigation">
        <Link to="/form/entries">
          <button>Next</button>
        </Link>
      </div>
    </div>
  );
}
