import {useCallback, useEffect, useRef, useState} from 'react';


const updateTimeMs = 1000;

const millisecondToSec = (millisecond: number) => millisecond / 1000;

/**
 * 倒數計時器 傳入需倒數的秒數 可重複倒數
 */
const useCountDownTimer = (isLoop = false) => {
    const [totalSeconds, setTotalSeconds] = useState(0);
    const timerRef = useRef<ReturnType<typeof setTimeout>>();
    const rafRef = useRef<number>();

    useEffect(()=> {
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);

        };
    }, []);

    const start = useCallback((millisecond: number, callback?: () => void ) => {

        //檢查seconds是否大於0
        if(millisecond <= 0) {
            return;
        }

        setTotalSeconds(millisecondToSec(millisecond));

        timerRef.current = setInterval(() => {
            setTotalSeconds((sec) => {
                const formatSec = sec - 1;
                if (formatSec <= 0) {

                    rafRef.current = requestAnimationFrame(callback);

                    if (isLoop) {
                        return millisecondToSec(millisecond);
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
