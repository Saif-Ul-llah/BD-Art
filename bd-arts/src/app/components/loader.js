import React from 'react';
import './../globals.css'; // Import the CSS file for styling

const Loader = () => {
  return (
    <div className='h-screen flex'>
    <div className="loader-container">
      <div className="loader-line" style={{ animationDelay: '0s' }} />
      <div className="loader-line" style={{ animationDelay: '0.2s' }} />
      <div className="loader-line" style={{ animationDelay: '0.4s' }} />
    </div>
  </div>
  );
}

export default Loader;





// .loader-container {
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   width: 100%;
//   height: 100%;
// }

// .loader-line {
//   width: 8px;
//   height: 50px;
//   background-color: purple;
//   border-radius: 4px;
//   margin: 0 5px;
//   animation: pulse 1s alternate infinite, resize 1s alternate infinite;
//   animation-delay: 0s;
// }

// .loader-line:nth-child(2) {
//   animation-delay: 0.2s;
// }

// .loader-line:nth-child(3) {
//   animation-delay: 0.4s;
// }

// @keyframes pulse {
//   0% {
//     transform: scale(1);
//     opacity: 0.5;
//   }
//   100% {
//     transform: scale(1.2);
//     opacity: 1;
//   }
// }

// @keyframes resize {
//   0% {
//     height: 50px;
//   }
//   100% {
//     height: 70px;
//   }
// }
