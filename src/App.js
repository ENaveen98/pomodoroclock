import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Clock />
    </div>
  );
}

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breakLength: 5,
      sessionLength: 25,
      statusUpdate: "Idle",
      timeLeftmm: "25",
      timeLeftss: "00",
      timerRunning: false,
      reset: true,
      inBreak: false,
    };
    this.Reset = this.Reset.bind(this);
    this.DecreaseBreak = this.DecreaseBreak.bind(this);
    this.DecreaseSession = this.DecreaseSession.bind(this);
    this.IncreaseBreak = this.IncreaseBreak.bind(this);
    this.IncreaseSession = this.IncreaseSession.bind(this);
    this.ToggleStartStop = this.ToggleStartStop.bind(this);
    this.startCountDown = this.startCountDown.bind(this);
    this.Tick = this.Tick.bind(this);

    // this.intervalHandle = 0;
    this.secondsRemaining = 0;
  }

  Reset() {
    this.setState({
      breakLength: 5,
      sessionLength: 25,
      statusUpdate: "Idle",
      timeLeftmm: "25",
      timeLeftss: "00",
      timerRunning: false,
      reset: true,
      inBreak: false,
    });
    clearInterval(this.intervalHandle);
  }

  DecreaseBreak() {
    if (this.state.breakLength > 1) {
      this.setState((state) => ({ breakLength: state.breakLength - 1 }));
    }
  }

  DecreaseSession() {
    if (this.state.sessionLength > 1) {
      if (this.state.reset) {
        this.setState((state) => ({
          sessionLength: state.sessionLength - 1,
          timeLeftmm: state.sessionLength - 1,
        }));
      } else {
        this.setState((state) => ({
          sessionLength: state.sessionLength - 1,
        }));
      }
    }
  }

  IncreaseBreak() {
    if (this.state.breakLength < 60) {
      this.setState((state) => ({ breakLength: state.breakLength + 1 }));
    }
  }

  IncreaseSession() {
    if (this.state.sessionLength < 60) {
      if (this.state.reset) {
        this.setState((state) => ({
          sessionLength: state.sessionLength + 1,
          timeLeftmm: state.sessionLength + 1,
        }));
      } else {
        this.setState((state) => ({
          sessionLength: state.sessionLength + 1,
        }));
      }
    }
  }

  ToggleStartStop() {
    if (this.state.timerRunning) {
      this.setState({ timerRunning: false, reset: false });
      this.startCountDown();
    } else {
      this.setState({ timerRunning: true, reset: false });
      this.startCountDown();
    }
  }

  Tick() {
    this.secondsRemaining--;

    var min = Math.floor(this.secondsRemaining / 60);
    var sec = this.secondsRemaining - min * 60;

    this.setState({
      timeLeftmm: min,
      timeLeftss: sec,
    });
    if (min < 10) {
      this.setState((state) => ({
        timeLeftmm: "0" + state.timeLeftmm,
      }));
    }
    if (sec < 10) {
      this.setState((state) => ({
        timeLeftss: "0" + state.timeLeftss,
      }));
    }

    if ((min === 0) & (sec === 0)) {
      // Starting Break
      if (!this.state.inBreak) {
        this.setState({ statusUpdate: "In Breaaak" });
        this.secondsRemaining =
          this.secondsRemaining + this.state.breakLength * 60 + 1;
        this.state.inBreak = true;
      }
      // Starting Session
      else {
        this.setState({ statusUpdate: "In Sesssion" });
        this.secondsRemaining =
          this.secondsRemaining + this.state.sessionLength * 60 + 1;
        this.state.inBreak = false;
      }
    }
  }

  startCountDown() {
    // Just after Resetting
    if (this.state.reset) {
      this.secondsRemaining = this.state.sessionLength * 60;
      this.intervalHandle = setInterval(this.Tick, 1000);
    }
    // While Running and if Stopped
    else if (this.state.timerRunning) {
      clearInterval(this.intervalHandle);
    }
    // While Runnning and Stopped and then Started
    else if (!this.state.timerRunning) {
      this.intervalHandle = setInterval(this.Tick, 1000);
    }
  }

  render() {
    return (
      <div id="clocl-elements">
        <div id="break-label">
          <p>Break Length</p>
        </div>
        <div id="session-label">
          <p>Session Length</p>
        </div>
        <button id="break-decrement" onClick={this.DecreaseBreak}>
          bd
        </button>
        <button id="session-decrement" onClick={this.DecreaseSession}>
          sd
        </button>
        <button id="break-increment" onClick={this.IncreaseBreak}>
          bi
        </button>
        <button id="session-increment" onClick={this.IncreaseSession}>
          si
        </button>
        <div id="break-length">{this.state.breakLength}</div>
        <div id="session-length">{this.state.sessionLength}</div>
        <div id="timer-label">{this.state.statusUpdate}</div>
        <div id="time-left">
          {this.state.timeLeftmm}:{this.state.timeLeftss}
        </div>
        <button id="start_stop" onClick={this.ToggleStartStop}>
          Start/Stop
        </button>
        <button id="reset" onClick={this.Reset}>
          Reset!
        </button>
      </div>
    );
  }
}

export default App;
