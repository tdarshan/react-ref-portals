import { useRef, useState } from "react";

import ResultModal from "./ResultModal";

const TimerChallenge = ({ title, targetTime }) => {

    const timer = useRef();
    const dialog = useRef();

    const [remainingTime, setRemainingTime] = useState(targetTime * 1000);

    const timerIsActive = remainingTime > 0 && remainingTime < targetTime * 1000;


    if (remainingTime <= 0) {
        clearInterval(timer.current);
        dialog.current.open();
    }

    function handleReset() {
        setRemainingTime(targetTime*1000);
    }


    function handleStart() {
        timer.current = setInterval(() => {
            setRemainingTime(prevTimeRemaining => prevTimeRemaining - 10);
        }, 10);
    }

    function handleStop() {
        dialog.current.open();
        clearInterval(timer.current);
    }

    return (
        <>
            <ResultModal ref={dialog} targetTime={targetTime} remainingTime={remainingTime} onReset={handleReset} />

            <section className="challenge">
                <h2>{title}</h2>

                <p className="challenge-time">
                    {targetTime} second{targetTime > 1 ? 's' : ''}
                </p>

                <p>
                    <button onClick={timerIsActive ? handleStop : handleStart}>
                        {timerIsActive ? 'Stop' : 'Start'} Challenge
                    </button>
                </p>

                <p className={timerIsActive ? "active" : ""}>
                    {timerIsActive ? 'Timer running...' : 'Timer inactive'}
                </p>
            </section>
        </>
    )
}

export default TimerChallenge