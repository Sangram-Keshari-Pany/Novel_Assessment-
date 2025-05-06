import React, { useState, useEffect, useContext } from 'react';
import "../css/home.css";
import { ThemeContext } from '../Themes';

const Home = () => {
  const [loanAmount, setLoanAmount] = useState(100000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [termYears, setTermYears] = useState(5);
  const [monthlyEMI, setMonthlyEMI] = useState(null);
  const [amortization, setAmortization] = useState([]);
  const [errors, setErrors] = useState({});
  const [currency, setCurrency] = useState("USD");
  const { theme } = useContext(ThemeContext);
  const [darkTheme, setDarkTheme] = useState(theme === 'dark');

  useEffect(() => {
    setDarkTheme(theme === 'dark');
  }, [theme]);

  const calculateEMI = () => {
    const newErrors = {};
    if (!loanAmount || loanAmount <= 0) newErrors.loanAmount = "Loan amount is required and must be greater than 0";
    if (!interestRate || interestRate <= 0) newErrors.interestRate = "Interest rate is required and must be greater than 0";
    if (!termYears || termYears <= 0) newErrors.termYears = "Loan term is required and must be greater than 0";
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
    <div className={`container ${darkTheme ? 'darkhome' : 'lighthome'}`}>
      <h1>Loan Calculator Dashboard</h1>

      <div className="input-group">
        <div className="form-field">
          <input
            type="text"
            className={`floating-input ${darkTheme ? 'darklable' : 'lightlable'} ${errors.loanAmount ? 'input-error' : ''}`}
            value={loanAmount}
            onChange={e => setLoanAmount(e.target.value)}
            required
            placeholder=" "
          />
          <label className={`floating-label ${darkTheme ? 'darkhome' : 'lighthome'}`}>Loan Amount</label>
          {errors.loanAmount && <p className="error-text">{errors.loanAmount}</p>}
        </div>
        <div className="form-field">
          <input
            type="text"
            className={`floating-input ${darkTheme ? 'darklable' : 'lightlable'} ${errors.interestRate ? 'input-error' : ''}`}
            value={interestRate}
            onChange={e => setInterestRate(e.target.value)}
            required
            placeholder=" "
          />
          <label className={`floating-label ${darkTheme ? 'darkhome' : 'lighthome'}`}>Interest Rate (%)</label>
          {errors.interestRate && <p className="error-text">{errors.interestRate}</p>}
        </div>
        <div className="form-field">
          <input
            type="text"
            className={`floating-input ${darkTheme ? 'darklable' : 'lightlable'} ${errors.termYears ? 'input-error' : ''}`}
            value={termYears}
            onChange={e => setTermYears(e.target.value)}
            required
            placeholder=" "
          />
          <label className={`floating-label ${darkTheme ? 'darkhome' : 'lighthome'}`}>Term (Years)</label>
          {errors.termYears && <p className="error-text">{errors.termYears}</p>}
        </div>
      </div>

      <button onClick={calculateEMI} className={`calculate-btn ${darkTheme ? 'darkbtn' : 'lightbtn'}`}>CALCULATE</button>

      {monthlyEMI && (
        <div className="middle-section">
          <h2 className={darkTheme ? 'darklable' : 'lightlable'}>Monthly EMI: {currency} {monthlyEMI}</h2>
          <div className="currency-select">
            <div className="form-field select-field">
              <select
                value={currency}
                onChange={e => setCurrency(e.target.value)}
                className={`${darkTheme ? 'darkhome' : 'lighthome'}`}
                required
              >
                <option disabled hidden onChange={e => setCurrency(e.target.value)}>Select Currency</option>
                <option>USD</option>
                <option>EUR</option>
                <option>INR</option>
                <option>GBP</option>
                <option>JPY</option>
                <option>AUD</option>
                <option>CAD</option>
              </select>
              <label className={`floating-label ${darkTheme ? 'darkhome' : 'lighthome'}`}>Currency</label>
            </div>
            <button onClick={resetTable} className="reset-btn">RESET TABLE</button>
          </div>
        </div>
      )}

      {amortization.length > 0 && (
        <div className="amortization">
          <h2 className={darkTheme ? 'darklable' : 'lightlable'}>Amortization Schedule ({currency})</h2>
          <div className="amortization-div">
            <table className={`amortization-table ${darkTheme ? 'darklable' : 'lightlable'}`}>
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
