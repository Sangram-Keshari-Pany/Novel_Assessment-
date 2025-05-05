import React, { useState, useEffect } from 'react';
import "../css/home.css";

const Home = () => {
  const [loanAmount, setLoanAmount] = useState(100000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [termYears, setTermYears] = useState(5);
  const [monthlyEMI, setMonthlyEMI] = useState(null);
  const [amortization, setAmortization] = useState([]);
  const [activeinput, setActiveinput] = useState("");
  const [errors, setErrors] = useState({});
  const [currency, setCurrency] = useState("USD");
  const storedTheme = localStorage.getItem('theme') || 'light';
  const [darkTheme, setDarkTheme] = useState(storedTheme === 'dark');

  useEffect(()=>{
    console.log("hii");
    setDarkTheme(storedTheme === 'dark')
  },[storedTheme])

  const calculateEMI = () => {
    setActiveinput("");
    const newErrors = {};

    if (!loanAmount || loanAmount <= 0) newErrors.loanAmount = "Loan amount is required and must be greater than 0";
    if (!interestRate || interestRate <= 0) newErrors.interestRate = "Interest rate is required and must be greater than 0";
    if (!termYears || termYears <= 0) newErrors.termYears = "Loan term is required and must be be greater than 0";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    const P = parseFloat(loanAmount);
    const r = parseFloat(interestRate) / 12 / 100;
    const n = parseFloat(termYears) * 12;
    const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

    setMonthlyEMI(emi.toFixed(2));

    let balance = P;
    const schedule = [];

    for (let i = 1; i <= n; i++) {
      const interest = balance * r;
      const principal = emi - interest;
      balance -= principal;

      schedule.push({
        month: i,
        principal: principal.toFixed(2),
        interest: interest.toFixed(2),
        balance: balance > 0 ? balance.toFixed(2) : '0.00',
      });
    }

    setAmortization(schedule);
  };

  const resetTable = () => {
    setMonthlyEMI(null);
    setAmortization([]);
  };

  

  return (
    <div className={`container ${darkTheme ? 'dark' : 'light'}`}>
      <h1>Loan Calculator Dashboard</h1>
      <div className="input-group">
        {/* Loan Amount */}
        <div>
          {loanAmount ? (
            <label className="label" style={{ color: activeinput === "loanamount" ? "#1976d2" : errors.loanAmount ? "red" : null }}>
              Loan Amount
            </label>
          ) : null}
          <input
            type="number"
            value={loanAmount}
            onChange={e => setLoanAmount(e.target.value)}
            placeholder="Loan Amount"
            onClick={() => setActiveinput("loanamount")}
            style={{
              outlineColor: activeinput === "loanamount" ? "#1976d2" : null,
              borderColor: errors.loanAmount ? "red" : null,
            }}
            className={`input-field ${errors.loanAmount ? 'input-error' : ''}`}
          />
          {errors.loanAmount && <p className="error-text">{errors.loanAmount}</p>}
        </div>

        {/* Interest Rate */}
        <div >
          {interestRate ? (
            <label className="label" style={{ color: activeinput === "intrestrate" ? "#1976d2" : errors.interestRate ? "red" : null }}>
              Interest Rate (%)
            </label>
          ) : null}
          <input
            type="number"
            value={interestRate}
            onChange={e => setInterestRate(e.target.value)}
            placeholder="Interest Rate (%)"
            onClick={() => setActiveinput("intrestrate")}
            style={{
              outlineColor: activeinput === "intrestrate" ? "#1976d2" : null,
              borderColor: errors.interestRate ? "red" : null,
            }}
            className={`input-field ${errors.interestRate ? 'input-error' : ''}`}
          />
          {errors.interestRate && <p className="error-text">{errors.interestRate}</p>}
        </div>

        {/* Term Years */}
        <div>
          {termYears ? (
            <label className="label" style={{ color: activeinput === "year" ? "#1976d2" : errors.termYears ? "red" : null }}>
              Term (Years)
            </label>
          ) : null}
          <input
            type="number"
            value={termYears}
            onChange={e => setTermYears(e.target.value)}
            placeholder="Term (Years)"
            onClick={() => setActiveinput("year")}
            style={{
              outlineColor: activeinput === "year" ? "#1976d2" : null,
              borderColor: errors.termYears ? "red" : null,
            }}
            className={`input-field ${errors.termYears ? 'input-error' : ''}`}
          />
          {errors.termYears && <p className="error-text">{errors.termYears}</p>}
        </div>
      </div>

      <button onClick={calculateEMI} className="calculate-btn">CALCULATE</button>

      {monthlyEMI && (
        <div className="middle-section">
          <h2>Monthly EMI: ${monthlyEMI}</h2>
          <div className="currency-select">
            <label className="label2" style={{ color: activeinput === "select" ? "#1976d2" : null }}>Currency</label>
            <select style={{ outlineColor: activeinput === "select" ? "#1976d2" : null }} onClick={() => setActiveinput("select")} onChange={e => setCurrency(e.target.value)}>
              <option>USD</option>
              <option>EUR</option>
              <option>INR</option>
              <option>GBP</option>
              <option>JPY</option>
              <option>AUD</option>
              <option>CAD</option>
            </select>
            <button onClick={resetTable} className="reset-btn">RESET TABLE</button>
          </div>
        </div>
      )}

      {amortization.length > 0 && (
        <div className="amortization">
          <h2>Amortization Schedule ({currency})</h2>
          <div className="amortization-div">
            <table className="amortization-table">
              <thead>
                <tr>
                  <td>Month</td>
                  <td>Principal</td>
                  <td>Interest</td>
                  <td>Remaining Balance</td>
                </tr>
              </thead>
              <tbody>
                {amortization.map((row, index) => (
                  <tr key={index}>
                    <td>{row.month}</td>
                    <td>{row.principal} {currency}</td>
                    <td>{row.interest} {currency}</td>
                    <td>{row.balance} {currency}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
