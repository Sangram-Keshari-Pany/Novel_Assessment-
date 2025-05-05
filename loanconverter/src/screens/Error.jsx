import React from 'react';
import '../css/error.css'; // Link to external CSS file

function ErrorPage() {
  return (
    <div className="error-container">
      <h4 className="error-title">Something went wrong in the application.</h4>
      <button className="error-button" onClick={() => window.location.href = '/'}>
        Go Home
      </button>
    </div>
  );
}

export default ErrorPage;
