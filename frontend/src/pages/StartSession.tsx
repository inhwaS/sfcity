// NewWindowContent.tsx
import React from 'react';
import ReactDOM from 'react-dom';
import Meeting from './Meeting';

const startSession = () => {
  ReactDOM.render(<Meeting />, document.getElementById('root'));
};

const StartSession: React.FC = () => {
  return (
    <div>
      <h1>book session </h1>
      {/* Add more content as needed */}
      <button onClick={startSession}>Start Session</button>
    </div>
  );
}

export default StartSession;