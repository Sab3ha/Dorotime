import React from 'react';

const Controls = ({ startTimer, resetTimer, isActive }) => {
    return (
        <div>
            {isActive ? (
                <button onClick={resetTimer}>Reset</button>
            ) : (
                <button onClick={startTimer}>Start</button>
            )}
        </div>
    );
};

export default Controls;
