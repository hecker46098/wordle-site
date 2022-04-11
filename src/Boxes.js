import React from "react";
import Box from "./Box";

export default class Boxes extends React.Component {
    renderBox(i) {
        return (
            < Box 
                letter={this.props.letters[i]}
                state={this.props.states[i]}
            />
        )
    }

    render() {
        return (
            <div>
                <div className="boxes-row">
                    {this.renderBox(0)}
                    {this.renderBox(1)}
                    {this.renderBox(2)}
                    {this.renderBox(3)}
                    {this.renderBox(4)}
                </div>
                <div className="boxes-row">
                    {this.renderBox(5)}
                    {this.renderBox(6)}
                    {this.renderBox(7)}
                    {this.renderBox(8)}
                    {this.renderBox(9)}
                </div>
                <div className="boxes-row">
                    {this.renderBox(10)}
                    {this.renderBox(11)}
                    {this.renderBox(12)}
                    {this.renderBox(13)}
                    {this.renderBox(14)}
                </div>
                <div className="boxes-row">
                    {this.renderBox(15)}
                    {this.renderBox(16)}
                    {this.renderBox(17)}
                    {this.renderBox(18)}
                    {this.renderBox(19)}
                </div>
                <div className="boxes-row">
                    {this.renderBox(20)}
                    {this.renderBox(21)}
                    {this.renderBox(22)}
                    {this.renderBox(23)}
                    {this.renderBox(24)}
                </div>
                <div className="boxes-row">
                    {this.renderBox(25)}
                    {this.renderBox(26)}
                    {this.renderBox(27)}
                    {this.renderBox(28)}
                    {this.renderBox(29)}
                </div>
            </div>
        );
    }
}