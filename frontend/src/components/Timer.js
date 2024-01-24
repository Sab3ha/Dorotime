import React from 'react';

const Timer = ({ time, isBreak }) => {
    return (
        <div>
            <p>{`${Math.floor(time / 60)}:${(time % 60).toString().padStart(2, '0')}`}</p>
        </div>
    );
};

export default Timer;
