import {useEffect} from 'react';
import {throttle} from 'throttle-debounce';


/**
 * 視窗尺寸異動測
 * @param cb
 * @param deps
 * @param throttleMs
 */
const useOnWindowResize = (cb: () => void, deps: any[], throttleMs = 300) => {

    // default
    useEffect(cb, []);

    // for update
    useEffect(() => {
        window.addEventListener('resize', throttleFunc, false);

        return () => {
            window.removeEventListener('resize', throttleFunc, false);
        };
    }, deps);

    const throttleFunc = throttle(throttleMs, cb);

};

export default useOnWindowResize;
