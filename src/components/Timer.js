import React, { useEffect } from 'react';
import AlarmSound from '../Music/Alarm.mp3';

const Timer = ({ time, isBreak }) => {
    useEffect(() => {
        if (time === 0) {
            var snd = new Audio(AlarmSound);
            snd.play();
        }
    }, [time]);

    return (
        <div>
            <p>{`${Math.floor(time / 60)}:${(time % 60).toString().padStart(2, '0')}`}</p>
        </div>
    );
};

export default Timer;
