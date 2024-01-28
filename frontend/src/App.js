import React, { useState, useEffect, useRef } from 'react';
import Timer from './components/Timer.js';
import Controls from './components/Controls.js';
import './App.css'
import music from './music.png';
import sound_one from './Music/Calm Ocean Waves With Little Bird Song Sound Effect.mp3'
import sound_two from './Music/Calm River.mp3'
import sound_three from './Music/Cricket Chirping.mp3'
import sound_four from './Music/Ocean Waves.mp3'
import sound_five from './Music/Peacful Water Stream In Forest.mp3'
import sound_six from './Music/Rain.mp3'
import sound_seven from './Music/Wind In Tall Grass.mp3'

  const App = () => {
    const [time, setTime] = useState(1500);
    const [isBreak, setIsBreak] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [mode, setMode] = useState('pomodoro');
    const playlist = [sound_one, sound_two, sound_three, sound_four, sound_five, sound_six, sound_seven];
    const audioRef = useRef(new Audio()); // Manage audio element in state

  const play = () => {
    // If the audio is playing, pause it
    if (!audioRef.current.paused) {
      audioRef.current.pause();
    } else {
      // If the audio is paused, play it
      const randomIndex = Math.floor(Math.random() * playlist.length);//random playlist
      const selectedTrack = playlist[randomIndex];
      audioRef.current.src = selectedTrack;
      audioRef.current.play();
    }
  };
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
                  <button onClick={play} className='music-btn'><img src={music} alt="Logo" /> </button>
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