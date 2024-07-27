import {useCallback, useEffect, useRef, useState} from 'react';


/**
 * 自訂的計時器 hook
 */
const useCountUpTimer = () => {
    const [time, setTime] = useState<number>(0);
    const timerRef = useRef<ReturnType<typeof setInterval>>();

    const start = useCallback((startTime: string) => {
        if (startTime) {
            const startTimeInSeconds = Math.floor(new Date(startTime).getTime() / 1000);
            const currentTime = Math.floor(Date.now() / 1000);
            const initialElapsedTime = currentTime - startTimeInSeconds;
            setTime(initialElapsedTime);

            timerRef.current = setInterval(() => {
                setTime((prevTime) => prevTime + 1);
            }, 1000);
        }
    }, []);

    const stop = useCallback(() => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = undefined;
        }
    }, []);

    useEffect(() => {
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, []);


    return {
        start,
        stop,
        time,
    };
};


export default useCountUpTimer;
