import {useEffect} from 'react';
import {throttle} from 'throttle-debounce';


/**
 * 視窗尺寸異動測
 * @param cb
 * @param deps
 */
const useWindowResize = (cb: () => void, deps: any[]) => {

    // default
    useEffect(cb, []);

    // for update
    useEffect(() => {
        window.addEventListener('resize', throttleFunc, false);

        return () => {
            window.removeEventListener('resize', throttleFunc, false);
        };
    }, deps);

    const throttleFunc = throttle(300, cb);

};

export default useWindowResize;
