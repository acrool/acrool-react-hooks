import {useCallback, useEffect, useRef, useState} from 'react';


const updateTimeMs = 1000;

const millisecondToSec = (millisecond: number) => Math.floor(millisecond / 1000);

type TStart = (millisecond: number) => Promise<void>

/**
 * 倒數計時器 傳入需倒數的毫秒 可重複倒數
 */
const useCountDownTimer = () => {
    const [totalMillisecond, setTotalMilliseconds] = useState(0);
    const timerRef = useRef<ReturnType<typeof setInterval>>();

    useEffect(()=> {
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, []);

    const start: TStart = useCallback(async (millisecond: number) => {

        return new Promise<void>((resolve) => {

            // 檢查秒數是否大於0
            if (millisecond <= 0) {
                resolve();
                return;
            }

            setTotalMilliseconds(millisecondToSec(millisecond));

            timerRef.current = setInterval(() => {
                setTotalMilliseconds((sec) => {
                    const formatSec = sec - 1;
                    if (formatSec <= 0) {
                        resolve();
                        if (timerRef.current) clearInterval(timerRef.current);
                    }

                    return formatSec;
                });
            }, updateTimeMs);

        });

    }, [timerRef]);



    return {
        start,
        totalMillisecond,
    };
};


export default useCountDownTimer;
