// App.js
import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Nav from './component/Nav';
import Home from './screens/Home';
import About from './screens/About';
import ErrorPage from './screens/Error';
import { ThemeProvider } from './Themes';
import ExchangeRatesTable from './screens/Exchange';


function MainApp() {
  const location = useLocation();
  const hideNavRoutes = ['/error'];
  const shouldHideNav = hideNavRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideNav && <Nav />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="/exchange-rate" element={<ExchangeRatesTable />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <MainApp />
      </BrowserRouter>
    </ThemeProvider>
  );
}



export default App;
