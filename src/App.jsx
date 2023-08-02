/* eslint-disable react/prop-types */
import { useState } from "react";
import "./App.css";

function App() {
  return <TipCalculator />;
}

export default App;

function TipCalculator() {
  // States
  const [bill, setBill] = useState("");
  const [personalRate, setPersonalRate] = useState(0);
  const [friendRate, setfriendRate] = useState(0);

  // Handlers
  const inputHandler = (e) => {
    if (isNaN(e.target.value)) return;
    setBill(e.target.value);
  };

  const personalPercentageHandler = (e) => {
    setPersonalRate(+e.target.value);
  };
  const friendPercentageHandler = (e) => {
    setfriendRate(+e.target.value);
  };

  const resetHandler = () => {
    setBill("");
    setPersonalRate(0);
    setfriendRate(0);
  };

  // Calculations
  const averageRate = (personalRate + friendRate) / 2;
  const averageBill = (bill * averageRate) / 100;
  const calculatedTip = +bill + averageBill;

  return (
    <div className="tip-calculator">
      <BillInput bill={bill} inputHandler={inputHandler} />
      <SelectPercentage
        rate={personalRate}
        percentageHandler={personalPercentageHandler}
      >
        How did you like the service?
      </SelectPercentage>
      <SelectPercentage
        rate={friendRate}
        percentageHandler={friendPercentageHandler}
      >
        How did your friend like the service?
      </SelectPercentage>
      {bill > 0 && (
        <>
          <Output
            bill={bill}
            calculatedTip={calculatedTip}
            averageBill={averageBill}
          />
          <Reset resetHandler={resetHandler} />
        </>
      )}
    </div>
  );
}

function BillInput({ bill, inputHandler }) {
  return (
    <div className="bill">
      <span>How much was the bill?</span>
      <input
        placeholder="Bill value"
        type="text"
        value={bill}
        onChange={inputHandler}
      />
    </div>
  );
}

function SelectPercentage({ rate, percentageHandler, children }) {
  return (
    <div className="rate personal-rate">
      <span>{children}</span>
      <select value={rate} onChange={percentageHandler}>
        <option value={0}>Dissatisfied (0%)</option>
        <option value={5}>It was okay (5%)</option>
        <option value={10}>It was good (10%)</option>
        <option value={20}>Absolutely amazing! (20%)</option>
      </select>
    </div>
  );
}

function Output({ calculatedTip, averageBill, bill }) {
  return (
    <div className="final-payment">
      You pay ${calculatedTip} (${bill} + ${averageBill} tip)
    </div>
  );
}

function Reset({ resetHandler }) {
  return <button onClick={resetHandler}>Reset</button>;
}
