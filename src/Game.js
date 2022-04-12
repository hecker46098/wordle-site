import React from "react";
import Boxes from "./Boxes";
import Keys from "./Keys";
import m_validWords from "./valid_words";
import m_possibleAnswers from "./possible_answers";

const validWords = m_validWords();
const possibleAnswers = m_possibleAnswers();

var secretWord;

const invalidMessage = "Not a valid word";
const failureMessage = "The word was ";
const successMessage = "Congratulations!";

export default class Game extends React.Component {
    currentBoxRow = 0;
    keyPresses = [];
    enterPressed = false;
    backspacePressed = false;

    constructor(props) {
        super(props);
        this.state = this.start();

        document.addEventListener("keydown", (e) => {
            let index = this.state.keyLetters.indexOf(e.key.toUpperCase());
            if (index >= 0 && !this.keyPresses[index]) {
                this.handleKeyClick(index, this.state);
                this.keyPresses[index] = true
            } else if (e.key === "Enter" && !this.enterPressed) {
                this.handleEnter(this.state);
                this.enterPressed = true;
            } else if (e.key === "Backspace" && !this.backspacePressed) {
                this.handleBackspace(this.state);
                this.backspacePressed = true;
            }
        });
        document.addEventListener("keyup", (e) => {
            let index = this.state.keyLetters.indexOf(e.key.toUpperCase());
            if (index >= 0) {
                this.keyPresses[index] = false;
            } else if (e.key === "Enter") {
                this.enterPressed = false;
            } else if (e.key === "Backspace") {
                this.backspacePressed = false;
            }
        });
        }

    start() {
        this.currentBoxRow = 0;
        secretWord = possibleAnswers[Math.floor(Math.random() * possibleAnswers.length)];

        var initialLetterStates = [];
        for (let i = 0; i < 26; i++) {
            initialLetterStates.push("UNUSED");
        }
        var initialBoxLetters = "";
        for (let i = 0; i < 30; i++) {
            initialBoxLetters += " ";
        }
        var initialBoxStates = [];
        for (let i = 0; i < 30; i++) {
            initialBoxStates.push("UNUSED");
        }
        for (let i = 0; i < 26; i++) {
            this.keyPresses.push(false);
        }

        return {
            keyLetters : "QWERTYUIOPASDFGHJKLZXCVBNM",
            keyStates : initialLetterStates,
            boxLetters : initialBoxLetters,
            boxStates : initialBoxStates,
            topText : ""
        };
    }

    count(string, letter) {
        let result = 0;
        for (let char of string) {
            if (letter === char) {
                result++;
            }
        }
        return result;
    }

    handleKeyClick(i, state) {
        if (this.state.topText === successMessage || this.state.topText === failureMessage) {
            return;
        }
        if (this.state.topText === invalidMessage) {
            this.setState({
                keyLetters : state.keyLetters,
                keyStates : state.keyStates,
                boxLetters : state.boxLetters,
                boxStates : state.boxStates,
                topText : ""
                });
        }

        var typedKeys = state.boxLetters.substring(this.currentBoxRow * 5, this.currentBoxRow * 5 + 5).trim();
        if (typedKeys.length < 5) {
            let newBoxLetters = state.boxLetters;
            newBoxLetters = newBoxLetters.substring(0, newBoxLetters.trim().length) + state.keyLetters[i] + newBoxLetters.substring(newBoxLetters.trim().length + 1);
            this.setState({
                keyLetters : state.keyLetters,
                keyStates : state.keyStates,
                boxLetters : newBoxLetters,
                boxStates : state.boxStates
                });
        }
    }

    handleEnter(state) {
        if (this.state.topText === successMessage || this.state.topText === failureMessage + secretWord) {
            this.setState(this.start());
            return;
        }
        var keyLetters = state.keyLetters;
        var keyStates = state.keyStates;
        var boxLetters = state.boxLetters;
        var boxStates = state.boxStates;
        var topText = state.topText;
        if (topText === invalidMessage) {
            topText = "";
        }

        var typedKeys = boxLetters.substring(this.currentBoxRow * 5, this.currentBoxRow * 5 + 5).trim();
        if (typedKeys.length >= 5) {
            if (validWords.includes(typedKeys.toLowerCase())) {
                var letterCounts = {};
                for (let i = 0; i < 5; i++) {
                    if (typedKeys[i] === secretWord[i]) {
                        if (letterCounts.hasOwnProperty(typedKeys[i])) {
                            letterCounts[typedKeys[i]]++;
                        } else {
                            letterCounts[typedKeys[i]] = 1;
                        }
                        keyStates[keyLetters.indexOf(secretWord[i])] = "CORRECT";
                        boxStates[this.currentBoxRow * 5 + i] = "CORRECT";
                    }
                }
                for (let i = 0; i < 5; i++) {
                    if (typedKeys[i] !== secretWord[i]) {
                        if (letterCounts.hasOwnProperty(typedKeys[i])) {
                            letterCounts[typedKeys[i]]++;
                        } else {
                            letterCounts[typedKeys[i]] = 1;
                        }
                        let containsLetter = false;
                        for (let letter of secretWord) {
                            if (typedKeys[i] === letter && this.count(secretWord, letter) >= letterCounts[typedKeys[i]]) {
                                if (keyStates[keyLetters.indexOf(typedKeys[i])] !== "CORRECT") {
                                    keyStates[keyLetters.indexOf(typedKeys[i])] = "MISPLACED";
                                    containsLetter = true;
                                }
                                if (boxStates[this.currentBoxRow * 5 + i] !== "CORRECT") {
                                    boxStates[this.currentBoxRow * 5 + i] = "MISPLACED";
                                }
                            }
                        }
                        if (!containsLetter && keyStates[keyLetters.indexOf(typedKeys[i])] !== "CORRECT") {
                            boxStates[this.currentBoxRow * 5 + i] = "ABSENT";
                            if (keyStates[keyLetters.indexOf(typedKeys[i])] !== "MISPLACED") {
                                keyStates[keyLetters.indexOf(typedKeys[i])] = "ABSENT";
                            }
                        }
                    }
                }

                this.currentBoxRow++;
                if (typedKeys === secretWord) {
                    topText = successMessage;
                } else if (this.currentBoxRow >= 6) {
                    topText = failureMessage + secretWord;
                }
            } else {
                topText = invalidMessage;
            }
        }

        this.setState({
            keyLetters : keyLetters,
            keyStates : keyStates,
            boxLetters: boxLetters,
            boxStates : boxStates,
            topText : topText
        });
    }

    handleBackspace(state) {
        if (this.state.topText === successMessage || this.state.topText === failureMessage) {
            return;
        }
        if (this.state.topText === invalidMessage) {
            this.setState({
                keyLetters : state.keyLetters,
                keyStates : state.keyStates,
                boxLetters : state.boxLetters,
                boxStates : state.boxStates,
                topText : ""
                });
        }

        var typedKeys = state.boxLetters.substring(this.currentBoxRow * 5, this.currentBoxRow * 5 + 5).trim();
        if (typedKeys.length > 0) {
            let newBoxLetters = state.boxLetters;
            newBoxLetters = newBoxLetters.substring(0, newBoxLetters.trim().length - 1) + " " + newBoxLetters.substring(newBoxLetters.trim().length);
            this.setState({
                keyLetters : state.keyLetters,
                keyStates : state.keyStates,
                boxLetters : newBoxLetters,
                boxStates : state.boxStates
                });
        }
    }

    render() {
        return (
            <div>
                <div className="top-text">
                    {this.state.topText}
                </div>
                <Boxes 
                    letters={this.state.boxLetters}
                    states={this.state.boxStates}
                />
                <Keys 
                    letters={this.state.keyLetters}
                    states={this.state.keyStates}
                    state={this.state}
                    onClick={(i) => this.handleKeyClick(i, this.state)}
                    onClickEnter={() => this.handleEnter(this.state)}
                    onClickBackspace={() => this.handleBackspace(this.state)}
                />
            </div>
        )
    }
}