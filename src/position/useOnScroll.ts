import {useEffect, useRef} from 'react';
import {throttle} from 'throttle-debounce';


/**
 * 偵測視窗捲動
 * @param throttleMs
 * @param cb
 * @param deps
 */
export const useOnScroll = (cb: () => void, deps: any[], throttleMs = 300) => {
    const targetRef = useRef(null);

    useEffect(() => {
        const target = targetRef.current || window;
        target.addEventListener('scroll', throttleFunc);

        return () => {
            target.removeEventListener('scroll', throttleFunc);
        };
    }, deps);

    const throttleFunc = throttle(throttleMs, cb);

    return targetRef;
};

export default useOnScroll;
