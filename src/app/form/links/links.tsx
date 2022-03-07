import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Form } from "../../../store/form-store";
import { Words } from "../../shared/words/words";

export function Links() {
  const links = useSelector(Form.getLinks);
  const isSubmitLoading = useSelector(Form.isSubmitLoading);
  const submitResponse = useSelector(Form.getSubmitResponse);
  const submitError = useSelector(Form.getSubmitError);
  const dispatch = useDispatch();
  return (
    <div>
      <div>
        <span>Links:</span>
        <div style={{ marginTop: "10px", marginBottom: "10px" }}>
          {["A", "B", "C", "D", "E"].map((link) => (
            <button
              key={link}
              onClick={() => dispatch(Form.Actions.addLink(link))}
            >
              {link}
            </button>
          ))}
        </div>
        <Words
          words={links}
          addWord={(word) => dispatch(Form.Actions.addLink(word))}
          removeWord={(word) => dispatch(Form.Actions.removeLink(word))}
        />
      </div>
      <div className="page-navigation">
        <Link to="/form/entries">
          <button>Back</button>
        </Link>
        <button onClick={() => dispatch(Form.submit)}>Submit</button>
      </div>
      <div style={{ marginTop: "10px" }}>
        {isSubmitLoading ? <>Loading...</> : null}
        {submitResponse ? <>Result: {JSON.stringify(submitResponse)}</> : null}
        {submitError ? <>Error: {JSON.stringify(submitResponse)}</> : null}
      </div>
    </div>
  );
}
