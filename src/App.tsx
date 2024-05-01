import React from 'react';
import './App.css';
import Timer from './timer/Timer.tsx';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Time Timer</h1>
      <Timer />
    </div>
  );
}

export default App;