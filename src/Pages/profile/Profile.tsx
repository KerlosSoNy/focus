import Select from '@mui/material/Select';
import { useEffect, useState } from 'react';
import { seconds } from '../../Variables/Seconds';
import { minutes } from '../../Variables/minutes';
import { hours } from '../../Variables/hours';
import Button from '../../components/Button/Button';


export default function Profile() {
    const [hours2, setHours] = useState<any>(0)
    const [seconds2, setSeconds] = useState<any>(0)
    const [minute2, setMinutes] = useState<any>(0)
    const [disabled, setDisabled] = useState(false)
    const [intervalId, setIntervalId] = useState<any>(null);

    const handleSeconds = (e: any) => {
        setSeconds(e)
    }
    const handleHours = (e: any) => {
        setHours(e)
    }
    const handleMinutes = (e: any) => {
        setMinutes(e)
    }

    const startTimer = () => {
        setDisabled(true);
        setIntervalId(
            setInterval(() => {
                setSeconds((prevSeconds: any) => {
                    const nextSeconds = prevSeconds - 1;
                    if (nextSeconds === -1) {
                        setMinutes(0);
                        return 59;
                    }
                    return nextSeconds;
                });
            }, 1000)
        );
    };

    useEffect(() => {
        if (minutes === 0) {
            setHours((prevHours: any) => prevHours - 1);
            setMinutes(59);
        }
    }, [minutes]);

    useEffect(() => {
        if (seconds2 === 0 && minute2 === 0 && hours2 === 0) {
            clearInterval(intervalId)
            setDisabled(false)
            setSeconds(0)
            setMinutes(0)
            setHours(0)
            alert('Time is up')
        }
    }, [seconds2])
    return (
        <div
            className="flex flex-col gap-5 items-center py-4 justify-center h-[85vh] bg-black text-white"
        >
            <h1 className="text-3xl font-bold">Count Down</h1>
            <div className='flex flex-row-reverse gap-3'>
                <Select
                    disabled={disabled}
                    multiple
                    native
                    value={seconds2}
                    onChange={(e: any) => handleSeconds(e.currentTarget.value)}
                    inputProps={{
                        id: 'select-multiple-native',
                    }}
                    sx={{
                        color: 'white',
                    }}
                >
                    {
                        seconds.map((e: any) => {
                            return (
                                <option key={e} value={e}>
                                    {e < 10 ? `0${e}` : e}
                                </option>
                            )
                        })
                    }
                </Select>
                <span className='text-3xl my-auto'>:</span>
                <Select
                    disabled={disabled}
                    multiple
                    native
                    value={minute2}
                    onChange={(e: any) => handleMinutes(e.currentTarget.value)}
                    inputProps={{
                        id: 'select-multiple-native',
                    }}
                    sx={{
                        color: 'white',
                    }}
                >
                    {
                        minutes.map((e: any) => {
                            return (
                                <option key={e} value={e}>
                                    {e < 10 ? `0${e}` : e}
                                </option>
                            )
                        })
                    }
                </Select>
                <span className='text-3xl my-auto'>:</span>
                <Select
                    multiple
                    native
                    disabled={disabled}
                    value={hours2}
                    onChange={(e: any) => handleHours(e.currentTarget.value)}
                    inputProps={{
                        id: 'select-multiple-native',
                    }}
                    sx={{
                        color: 'white',
                    }}
                >
                    {
                        hours.map((e: any) => {
                            return (
                                <option key={e} value={e}>
                                    {e < 10 ? `0${e}` : e}
                                </option>
                            )
                        })
                    }
                </Select>
            </div>
            <div className='flex flex-row gap-14'>
                <span className='flex flex-col text-center'>
                    <span>Hours</span>
                    <span>{hours2 < 10 ? `0${hours2}` : hours2}</span>
                </span>
                <span className='my-auto text-2xl'>:</span>
                <span className='flex flex-col text-center'>
                    <span>Minutes</span>
                    <span>{minute2 < 10 ? `0${minute2}` : minute2}</span>
                </span>
                <span className='my-auto text-2xl'>:</span>
                <span className='flex flex-col text-center'>
                    <span>Seconds</span>
                    <span>{seconds2 < 10 ? `0${seconds2}` : seconds2}</span>
                </span>
            </div>

            <Button
                color="bg-green-500 px-4"
                title="Start"
                doSomething={startTimer}
            />
        </div>
    )
}
