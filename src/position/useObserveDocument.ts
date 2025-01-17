import {useEffect} from 'react';
import {throttle} from 'throttle-debounce';


/**
 * 偵測視窗高度異動
 * @param cb
 * @param deps
 * @param throttleMs
 */
export const useObserveDocument = (cb: () => void, deps: any[], throttleMs = 300) => {
    useEffect(() => {
        const observer = new ResizeObserver(throttleFunc);
        observer.observe(document.documentElement); // 監控整個 HTML 節點高度變化

        return () => observer.disconnect(); // 清除監聽
    }, deps);

    const throttleFunc = throttle(throttleMs, cb);
};

export default useObserveDocument;
