import React from 'react';

// Loading spinner component
function LoadingSpinner() {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}

export default LoadingSpinner;
