import React from "react";

const LoadingSpinner = () => {
  return (

      <div className="text-center text-white">
        <svg
          className="w-16 h-16 animate-spin text-blue-600"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid"
        >
<svg width="100" height="100" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="gradient" gradientUnits="userSpaceOnUse" x1="0" y1="50" x2="100" y2="50">
      <stop offset="0%" stop-color="currentColor" stop-opacity="1"/>
      <stop offset="100%" stop-color="currentColor" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <circle
    cx="50"
    cy="50"
    fill="none"
    stroke="url(#gradient)"
    stroke-width="3"
    r="30"
    stroke-dasharray="164.93361431346415 56.97787143782138"
  >
</svg>
            <animateTransform
              attributeName="transform"
              type="rotate"
              repeatCount="indefinite"
              dur="1s"
              keyTimes="0;1"
              values="0 50 50;360 50 50"
            ></animateTransform>
          </circle>
        </svg>
        <p className="text-sky-400 text-2xl mt-3">Loading...</p>
      </div>
   
  );
};

export default LoadingSpinner;