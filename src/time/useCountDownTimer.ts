import {useCallback, useEffect, useRef, useState} from 'react';


const updateTimeMs = 1000;

const millisecondToSec = (millisecond: number) => Math.floor(millisecond / 1000);

type TStart = (millisecond: number) => Promise<void>

/**
 * 倒數計時器 傳入需倒數的'毫秒'數
 * - 可重複倒數
 * - 回傳為'秒數'
 */
const useCountDownTimer = () => {
    const [totalSeconds, setTotalSeconds] = useState(0);
    const timerRef = useRef<ReturnType<typeof setInterval>>(null);

    useEffect(()=> {
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, []);

    const start: TStart = useCallback(async (millisecond: number) => {

        return new Promise<void>((resolve) => {

            // 清除上一個計時器
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }

            // 檢查秒數是否大於0
            if (millisecond <= 0) {
                resolve();
                return;
            }

            setTotalSeconds(millisecondToSec(millisecond));

            timerRef.current = setInterval(() => {
                setTotalSeconds((sec) => {
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
        totalSeconds,
    };
};


export default useCountDownTimer;
