import {useCallback, useEffect, useRef, useState} from 'react';


const updateTimeMs = 1000;

/**
 * 倒數計時器 傳入需倒數的秒數 可重複倒數
 */
const useCountDownTimer = (isLoop = false) => {
    const [totalSeconds, setTotalSeconds] = useState(0);
    const timerRef = useRef<ReturnType<typeof setTimeout>>();

    useEffect(()=> {
        return () => {
            timerRef?.current && clearInterval(timerRef.current);
        };
    }, []);

    const start = useCallback((seconds: number, callback?: () => void ) => {
        //檢查seconds是否大於0
        if(seconds <= 0) {
            return;
        }

        setTotalSeconds(seconds);

        timerRef.current = setInterval(() => {
            setTotalSeconds((sec) => {
                const formatSec = sec - 1;
                if (formatSec <= 0) {
                    if(callback){
                        callback();
                    }

                    if (isLoop) {
                        return seconds;
                    }

                    timerRef?.current && clearInterval(timerRef.current);
                }

                return formatSec;
            });

        }, updateTimeMs);
    }, [timerRef]);



    return {
        start,
        totalSeconds,
    };
};


export default useCountDownTimer;
