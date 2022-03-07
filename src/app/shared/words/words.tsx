import React from "react";

export function Words(props: {
  words: string[];
  addWord: (word: string) => void;
  removeWord: (word: string) => void;
}) {
  let input: HTMLInputElement;
  return (
    <>
      <div>
        <input
          ref={(ref) => (input = ref!)}
          type="text"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addWordIfFilled();
            }
          }}
        />
        <button onClick={() => addWordIfFilled()}>Add</button>
      </div>
      <div style={{ marginTop: "10px" }}>
        {props.words.map((word) => (
          <button key={word} onClick={() => props.removeWord(word)}>
            {word}
          </button>
        ))}
      </div>
    </>
  );

  function addWordIfFilled(): void {
    if (input.value) {
      props.addWord(input.value);
      input.value = "";
    }
  }
}
