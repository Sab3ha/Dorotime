import React from 'react';
// eslint-disable-next-line
export default Timer;  
const Timer = ({ time, isBreak }) => {
    return (
        <div>
            <p>{`${Math.floor(time / 60)}:${(time % 60).toString().padStart(2, '0')}`}</p>
        </div>
    )}
  
    if (Timer==="0:00"){
       var snd = new Audio('/alarm.mp3');
       snd.play();
}
