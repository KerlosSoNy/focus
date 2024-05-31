import { useEffect, useState } from "react"
import { Circle } from 'rc-progress';


export default function Home() {
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(59);
    const [seconds, setSeconds] = useState(55);
    const [intervalId, setIntervalId] = useState<any>(null);
    const [stopCounter, setStopCounter] = useState<any>(false)

    const startTimer = () => {
        setStopCounter(true)
        setIntervalId(
            setInterval(() => {
                setSeconds((prevSeconds) => {
                    const nextSeconds = prevSeconds + 1;
                    if (nextSeconds === 60) {
                        setMinutes(prevMinutes => prevMinutes + 1);
                        return 0;
                    }
                    return nextSeconds;
                });
            }, 1000)
        );
    }

    const stopTimer = () => {
        setStopCounter(false)
        clearInterval(intervalId)
    }

    const resetCounter = () => {
        clearInterval(intervalId)
        setSeconds(0)
        setStopCounter(false)
    }

    useEffect(() => {
        return () => clearInterval(intervalId);
    }, [intervalId]);

    useEffect(() => {
        if (minutes === 60) {
            setHours(prevHours => prevHours + 1);
            setMinutes(0);
        }
    }, [minutes]);

    return (
        <div
            className="flex flex-col items-center justify-center h-[85vh] bg-black text-white"
        >
            <Circle percent={seconds * 1.666666666666667} strokeWidth={4} strokeColor="#D3D3D3" />
            <span className="font-mono text-6xl pb-9 absolute">
                {`${hours < 10 ? "0" + hours : hours}` + ":" + "" + `${minutes < 10 ? "0" + minutes : minutes}` + ":" + "" + `${seconds < 10 ? "0" + seconds : seconds}`}
            </span>
            <div>
                <button
                    className={`${stopCounter ? "hidden" : "block"}`}
                    onClick={startTimer} type="button">{seconds > 0 ? "Continue" : "Start Timer"}</button>
                <button
                    className={`${stopCounter ? "block" : "hidden"}`}
                    onClick={stopTimer} type="button">Stop Timer</button>
            </div>
            <button onClick={resetCounter}>Reset</button>
        </div>
    )
}
