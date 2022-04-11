import React from "react";

export default function Key(props) {
    return (
        <button className={props.letter.length > 1 ? "wide-key" : props.state === "CORRECT" ? "correct-key" : (props.state === "MISPLACED" ? "misplaced-key" : (props.state === "ABSENT" ? "absent-key" : "key"))} onClick={props.onClick}>
            {props.letter}
        </button>
    );
}