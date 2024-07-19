import {useEffect, useRef} from 'react';



/**
 * 初始不更新的 Hook
 */
const useUpdateEffect = (fn: Function, inputs: any[]) => {
    const didMountRef = useRef(false);
    useEffect(() => {
        if(didMountRef.current) fn();
        else didMountRef.current = true;

    }, inputs);
};

export default useUpdateEffect;
