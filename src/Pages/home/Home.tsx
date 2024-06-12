import { useEffect, useRef, useState } from "react"
import { Circle } from 'rc-progress';
import Button from "../../components/Button/Button";
import { motion } from "framer-motion";

export default function Home() {
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [intervalId, setIntervalId] = useState<any>(null);
    const [stopCounter, setStopCounter] = useState<any>(false)
    const ref = useRef<any>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

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
        setMinutes(0)
        setHours(0)
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

    const handleMouse = (e: any) => {

        const { clientX, clientY } = e;

        const { height, width, left, top } = ref.current.getBoundingClientRect();

        const middleX = clientX - (left + width / 2)

        const middleY = clientY - (top + height / 2)

        setPosition({ x: middleX, y: middleY })

    }



    const reset = () => {
        setPosition({ x: 0, y: 0 })
    }
    return (
        <div
            className="flex flex-col items-center py-4 justify-center h-[85vh] bg-black text-white"
        >
            <Circle percent={seconds * 1.666666666666667} strokeWidth={4} strokeColor="#D3D3D3" />

            <span className="font-mono text-6xl pb-24 absolute">
                {`${hours < 10 ? "0" + hours : hours}` + ":" + "" + `${minutes < 10 ? "0" + minutes : minutes}` + ":" + "" + `${seconds < 10 ? "0" + seconds : seconds}`}
            </span>

            <div className="flex flex-row justify-between md:w-[600px] w-[350px] lg:w-[550px] mb-10">
                <motion.div
                    onMouseMove={handleMouse}
                    ref={ref}
                    onMouseLeave={reset}
                    animate={{ x: position.x, y: position.y }}
                    transition={{ type: "spring", stiffness: 200, damping: 15, mass: 0.1 }}
                >
                    {!stopCounter ?
                        <Button
                            color="bg-green-500 px-4"
                            title="Start"
                            doSomething={startTimer}
                        /> :
                        <Button
                            color="bg-red-500 text-red-200 px-[1.4rem] py-8"
                            title="Stop"
                            doSomething={stopTimer}
                        />}
                </motion.div>
                <button type='reset' className="mt-3 hover:scale-110 duration-700 font-mono text-2xl bg-gray-500
                    text-white px-4 py-1.5 rounded-full bg-opacity-20" onClick={resetCounter}>Reset</button>
            </div>
        </div>
    )
}
