import React from "react";

export default function Box(props) {
    return (
        <div className={props.state === "CORRECT" ? "correct-box" : (props.state === "MISPLACED" ? "misplaced-box" : (props.state === "ABSENT" ? "absent-box" : "box"))}>
            {props.letter}
        </div>
    );
}