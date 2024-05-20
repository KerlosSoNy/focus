import { useEffect, useState } from "react"


export default function Home() {
    const [secounds, setSecounds] = useState(0)
    const [minutes, setMinutes] = useState(0)
    const [hours, setHours] = useState(0)
    const [days, setDays] = useState(0)
    const [startCount, setStartCount] = useState(false)
    const [intervalId, setIntervalId] = useState<any>(null);
    const [stopCounter, setStopCounter] = useState<any>(false)
    const handleCounter = () => {
        setStartCount(true)
        const intervalId = setInterval(() => {
            if (secounds === 59) {
                setSecounds(0);
                if (minutes === 59) {
                    setMinutes(0);
                    if (hours === 23) {
                        setHours(0);
                        setDays(prevDays => prevDays + 1);
                    } else {
                        setHours(prevHours => prevHours + 1);
                    }
                } else {
                    setMinutes(prevMinutes => prevMinutes + 1);
                }
            } else {
                setSecounds(prevSeconds => prevSeconds + 1);
            }
        }, 1000);

        setIntervalId(intervalId);
    }
    useEffect(() => {
        if (!stopCounter && startCount) {
            handleCounter
        } else {
            clearInterval(intervalId)
        }
    }, [secounds, minutes, hours, days]);
    return (
        <div
            className="flex flex-col items-center justify-center h-[85vh] bg-black text-white"
        >
            {days + ":" + hours + ":" + minutes + ":" + secounds}
            <div>
                <button
                    className={`${startCount ? "hidden" : "block"}`}
                    onClick={() => handleCounter()} type="button">Start Timer</button>
                <button
                    className={`${startCount ? "block" : "hidden"}`}
                    onClick={() => {
                        setStopCounter(true)
                    }} type="button">Stop Timer</button>
            </div>
            <button onClick={() => {
                setSecounds(0)
                setMinutes(0)
                setHours(0)
                setDays(0)
                setStopCounter(true)
                setStartCount(false)
            }}>Reset</button>
        </div>
    )
}
