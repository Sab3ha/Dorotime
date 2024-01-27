import React, { useState, useEffect } from 'react';
import Timer from './components/Timer.js';
import Controls from './components/Controls.js';
import './App.css'

const App = () => {
    const [time, setTime] = useState(1500);
    const [isBreak, setIsBreak] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [mode, setMode] = useState('pomodoro');

    useEffect(() => {
        let interval;

        if (isActive && time > 0) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime - 1);
            }, 1000);
        } else if (isActive && time === 0) {
            setIsBreak((prevIsBreak) => {
                setTime(getNextTime(!prevIsBreak));
                return !prevIsBreak;
            });
        }

        return () => clearInterval(interval);
    }, [isActive, time]);

    const startTimer = () => {
        setIsActive(true);
    };

    const resetTimer = () => {
        setIsActive(false);
        setIsBreak(false);
        setTime(getNextTime(mode));
    };

    const switchMode = (newMode) => {
        setIsActive(false);
        setMode(newMode);
        setIsBreak(newMode === 'short' || newMode === 'long');
        setTime(getNextTime(newMode));
        startTimer();
    };

    const getNextTime = (newMode) => {
        return newMode === 'short' ? 300 : (newMode === 'long' ? 600 : 1500);
    };
  return (
      <div className="container">
          <h1 className='dorotime'>Dorotime</h1>
          
          <div className="square-with-diamond">
              <div className="diamond-inside">
                  <div className="timer-text">
                      <Timer time={time} isBreak={isBreak}/>
                      <Controls startTimer={startTimer} resetTimer={resetTimer} isActive={isActive}/>
                  </div>
              </div>
          </div>

          <div className="small-square-with-diamond bottom">
              <div className="diamond-inside bottom">
                  <button className="timer-text small" onClick={() => switchMode('long')}>Long Break</button>
              </div>
          </div>

          <div className="small-square-with-diamond right">
              <div className="diamond-inside right">
                  <button className="timer-text small" onClick={() => switchMode('short')}>Short Break</button>
              </div>
          </div>

          <div className="small-square-with-diamond top">
              <div className="diamond-inside top">
                  <button className="timer-text small" onClick={() => switchMode('pomodoro')}>Pomodoro</button>
              </div>
          </div>

      </div>

  );
};

export default App;