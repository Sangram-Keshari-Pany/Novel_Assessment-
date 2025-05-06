import React, { useState, useEffect, useContext } from "react";
import "../css/exchange.css";
import { ThemeContext } from '../Themes';
import axios from 'axios';

const ExchangeRatesTable = () => {
  const [rates, setRates] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [hasError, setHasError] = useState(false);

  const { theme } = useContext(ThemeContext);
  const [darkTheme, setDarkTheme] = useState(theme === 'dark');

  useEffect(() => {
    axios.get('https://v6.exchangerate-api.com/v6/5cfbab11e13e71fdb4a4baed/latest/USD')
      .then(response => {
        const formattedRates = Object.entries(response.data.conversion_rates).map(
          ([currency, rate]) => ({ currency, rate })
        );
        setRates(formattedRates);
        setHasError(false);
      })
      .catch(error => {
        console.error("Failed to fetch exchange rates:", error);
        setHasError(true);
      });
  }, []);

  useEffect(() => {
    setDarkTheme(theme === 'dark');
  }, [theme]);

  const totalPages = Math.ceil(rates.length / rowsPerPage);
  const startIndex = (page - 1) * rowsPerPage;
  const currentRates = rates.slice(startIndex, startIndex + rowsPerPage);

  const handleRowsChange = (e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  };

  return (
    <div className={`container ${darkTheme ? 'darkhome' : 'lighthome'}`}>

      {hasError ? (
        <p style={{ color: 'red', fontSize: '1.1rem', marginTop: '1rem' }}>
          ❌ Something went wrong while fetching exchange rates.
        </p>
      ) : (
        <>
          <h1>Exchange Rates Table</h1>

          <label>
            Rows per page:
            <select
              className={`select ${darkTheme ? 'darklable' : 'lightlable'}`}
              value={rowsPerPage}
              onChange={handleRowsChange}
            >
              {[10, 20, 30, 40, 50].map(val => (
                <option key={val} value={val}>{val}</option>
              ))}
            </select>
          </label>

          <table>
            <thead>
              <tr>
                <th>Currency</th>
                <th>Exchange Rate</th>
              </tr>
            </thead>
            <tbody>
              {currentRates.map((rateObj, index) => (
                <tr key={index}>
                  <td>{rateObj.currency}</td>
                  <td>{rateObj.rate}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pagination">
            <button onClick={() => setPage(page - 1)} disabled={page === 1}>
              Previous
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button onClick={() => setPage(page + 1)} disabled={page === totalPages}>
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ExchangeRatesTable;
