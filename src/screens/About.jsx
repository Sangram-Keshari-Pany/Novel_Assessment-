import React, { useContext, useEffect, useState } from 'react';
import '../css/about.css';
import { ThemeContext } from '../Themes';

function About() {
  const { theme } = useContext(ThemeContext);
  const [darkTheme, setDarkTheme] = useState(theme === 'dark');

  useEffect(() => {
    setDarkTheme((theme === 'dark'))
  }, [theme])
  return (
    <div className={`about-container ${darkTheme ? 'darkhome' : 'lighthome'}`}>
      <h4>About This App</h4>
      <p>
        This Loan Calculator App is a modern, single-page web application built using <strong>React JS</strong> and <strong>Material UI</strong>.
        It allows users to calculate loan EMIs (Equated Monthly Installments), view a detailed amortization schedule,
        and see real-time currency conversions of their EMI using live exchange rates.
      </p>
      <hr />

      <h5>📋 Instructions for Candidates</h5>
      <p>Please follow these instructions to complete and submit your project:</p>
      <ul>
        <li>Push the entire project to a public <strong>GitHub repository</strong>.</li>
        <li>Make sure to <strong>commit regularly</strong> with clear messages after completing each feature.</li>
        <li>Use the provided EMI formula to perform calculations.</li>
        <li>Use <strong>Context API</strong> for global state management (e.g. theme, currency).</li>
        <li>Create <strong>custom React hooks</strong> for reusable logic (e.g. EMI calculation, fetching exchange rates).</li>
        <li>Integrate the <strong>ExchangeRate API</strong> for live currency conversion.</li>
        <li>Ensure the app is fully <strong>responsive</strong> on all screen sizes.</li>
        <li>Implement both <strong>light and dark modes</strong> using Material UI's theming system.</li>
        <li>Add a <strong>404 Not Found</strong> page for unmatched routes.</li>
        <li>Handle runtime errors gracefully by showing an <strong>Error Page</strong>.</li>
        <li>Once deployed, add the live deployment <strong>link in the About section</strong> of your GitHub repo.</li>
        <li>Deploy the project on any platform (e.g. Vercel, Netlify, GitHub Pages).</li>
      </ul>
      <p>✅ Your final GitHub repository should include a live demo link, and your code should be readable, modular, and well-structured.</p>
      <hr />

      <h5>🔧 Features</h5>
      <ul>
        <li>Loan EMI calculation using standard financial formulas</li>
        <li>Dynamic amortization schedule table with monthly breakdown</li>
        <li>Real-time currency conversion of EMI using a live exchange rate API</li>
        <li>Paginated exchange rate table for 160+ currencies</li>
        <li>Dark/Light mode toggle for a customizable experience</li>
        <li>Collapsible header navigation on mobile screens</li>
        <li>Fully responsive UI built with Material UI</li>
      </ul>
      <hr />

      <h5>📦 Technologies Used</h5>
      <ul>
        <li><strong>React</strong> (Hooks, Routing, Context API)</li>
        <li><strong>Material UI</strong> for styling and responsive components</li>
        <li><strong>Axios</strong> for API calls</li>
        <li><strong>Exchange Rate API</strong> for real-time currency conversion</li>
      </ul>
      <hr />

      <h5>🔣 EMI Formula Used</h5>
      <p>The EMI (Equated Monthly Installment) is calculated using the standard formula:</p>
      <p>EMI = [P × R × (1+R)<sup>N</sup>] / [(1+R)<sup>N</sup> – 1]</p>
      <div>
        <p>Where:</p>
        <ul>
          <li><strong>P</strong> = Principal loan amount</li>
          <li><strong>R</strong> = Monthly interest rate (annual rate / 12 / 100)</li>
          <li><strong>N</strong> = Loan duration in months</li>
        </ul>
      </div>
      <hr />

      <h5>🌍 Currency Conversion API</h5>
      <p>
        This app integrates with the free tier of the <a href="https://app.exchangerate-api.com" target="_blank" rel="noopener noreferrer">ExchangeRate-API</a>
        to fetch live exchange rates.
      </p>
      <p>
        API Endpoint Example:<br />
        <code>https://v6.exchangerate-api.com/v6/YOUR_API_KEY/latest/USD</code>
      </p>
      <p>
        You must register and obtain a free API key to use this endpoint. Then, replace <code>YOUR_API_KEY</code> in the app code with your actual key.
      </p>
      <hr />

      <h5>🎯 Purpose of This App</h5>
      <p>This project is designed to assess a candidate's React development skills, including:</p>
      <ul>
        <li>React fundamentals (state, props, hooks)</li>
        <li>Component structure and code reusability</li>
        <li>Third-party API integration and live data rendering</li>
        <li>Working with tables, lists, and pagination</li>
        <li>Theme customization (dark/light mode toggle)</li>
        <li>Error handling and graceful UI fallbacks</li>
        <li>Responsive design and collapsible mobile header navigation (In Mobile view)</li>
      </ul>
      <p>✨ For any currency conversion feature to work, make sure the API key is valid and the network allows external API calls.</p>
      <br />
      <p style={{ textAlign: "center", color: "#aaa" }}>SPANY</p>
      <p style={{ textAlign: "center" }}>
        <a href="mailto:sangrampany546@gmail.com">sangrampany546@gmail.com</a>
      </p>
      <br />
    </div>
  );
}

export default About;
