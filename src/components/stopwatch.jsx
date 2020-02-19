import React, { Component } from "react";
import "./stopwatch.css";

class Stopwatch extends Component {
  state = {
    status: false,
    elapsedTime: 0
  };

  // A function that starts the timer
  handleStart = () => {
    this.setState(state => {
      const startTime = Date.now() - this.state.elapsedTime;
      this.timer = setInterval(() => {
        this.setState({
          elapsedTime: Date.now() - startTime
        });
      });

      return { status: !state.status };
    });
  };

  // A function that stops the timer, does not reset time value
  handleStop = () => {
    this.setState(state => {
      clearInterval(this.timer);

      return { status: !state.status };
    });
  };

  // A function that resets the time value to zero
  handleReset = () => {
    clearInterval(this.timer);
    this.setState({
      elapsedTime: 0,
      status: false
    });
  };

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  // Function that outputs the current time value
  time(sec) {
    const msec = sec % 1000;
    sec = (sec - msec) / 1000;
    const secs = sec % 60;
    sec = (sec - secs) / 60;
    const mins = sec % 60;
    const hrs = (sec - mins) / 60;

    return (
      this.addLeadingZero(hrs) +
      ":" +
      this.addLeadingZero(mins) +
      ":" +
      this.addLeadingZero(secs) +
      "." +
      this.addLeadingZero(msec)
    );
  }

  // to format that includes a leading zero
  addLeadingZero(num) {
    return ("00" + num.toString()).slice(-2);
  }

  render() {
    const { status, elapsedTime } = this.state;
    return (
      <div id="stopwatch">
        <div>{this.time(elapsedTime)}</div>
        <div>
          <button
            className="button"
            onClick={status ? this.handleStop : this.handleStart}
          >
            {status ? "Stop" : "Start"}
          </button>
          <button className="button" onClick={this.handleReset}>
            Reset
          </button>
        </div>
      </div>
    );
  }
}

export default Stopwatch;
