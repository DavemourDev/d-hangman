import { useState, useEffect } from 'react'; 

const Timer = ({ period, onTick, activated: _activated }) => {
    
    const [ isActivated ] = useState(_activated);
    const [ timerInterval, setTimerInterval ] = useState(null);

    useEffect(() => {
        if (isActivated) {
            setTimerInterval(setInterval(() => {
                onTick(period);
            }, period));
        } else {
            clearInterval(timerInterval);
        }
    }, [isActivated])

    return (<></>);
};

export default Timer;