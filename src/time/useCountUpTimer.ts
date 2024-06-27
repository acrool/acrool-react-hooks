import {useCallback, useEffect, useState} from 'react';


/**
 * 自訂的計時器 hook
 */
const useCountUpTimer = () => {
    const [time, setTime] = useState<number>(0);
    let timer: NodeJS.Timeout | null = null;

    const start = useCallback((startTime: string) => {
        if (startTime) {
            const startTimeInSeconds = Math.floor(new Date(startTime).getTime() / 1000);
            const currentTime = Math.floor(Date.now() / 1000);
            const initialElapsedTime = currentTime - startTimeInSeconds;
            setTime(initialElapsedTime);

            timer = setInterval(() => {
                setTime((prevTime) => prevTime + 1);
            }, 1000);
        }
    }, []);

    useEffect(() => {
        return () => {
            // 無論何時，只要 useEffect 運行，我們就清除定時器
            timer && clearInterval(timer);
        };
    }, []);


    return {start, time};
};


export default useCountUpTimer;
