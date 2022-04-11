import React from "react";
import Key from "./Key";

export default class Keys extends React.Component {

    renderKey(i) {
        return (
            <Key
                letter={this.props.letters[i]}
                state={this.props.states[i]}
                onClick={() => this.props.onClick(i)}
            />
        )
    }

    renderEnterKey() {
        return (
            <Key
                letter={"ENTER"}
                state={"UNUSED"}
                onClick={this.props.onClickEnter}
            />
        )
    }

    renderBackspaceKey() {
        return (
            <Key
                letter={"BACK"}
                state={"UNUSED"}
                onClick={this.props.onClickBackspace}
            />
        )
    }

    render() {
        return (
            <div>
                <div className="keys-row">
                    {this.renderKey(0)}
                    {this.renderKey(1)}
                    {this.renderKey(2)}
                    {this.renderKey(3)}
                    {this.renderKey(4)}
                    {this.renderKey(5)}
                    {this.renderKey(6)}
                    {this.renderKey(7)}
                    {this.renderKey(8)}
                    {this.renderKey(9)}
                </div>
                <div className="keys-row">
                    {this.renderKey(10)}
                    {this.renderKey(11)}
                    {this.renderKey(12)}
                    {this.renderKey(13)}
                    {this.renderKey(14)}
                    {this.renderKey(15)}
                    {this.renderKey(16)}
                    {this.renderKey(17)}
                    {this.renderKey(18)}
                </div>
                <div className="keys-row">
                    {this.renderEnterKey()}
                    {this.renderKey(19)}
                    {this.renderKey(20)}
                    {this.renderKey(21)}
                    {this.renderKey(22)}
                    {this.renderKey(23)}
                    {this.renderKey(24)}
                    {this.renderKey(25)}
                    {this.renderBackspaceKey()}
                </div>
            </div>
        );
    }
}