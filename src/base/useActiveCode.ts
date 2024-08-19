import {useCallback, useState} from 'react';




/**
 * 選定狀態切換
 */
const useActiveCode = <T>(defaultActiveCode) => {
    const [activeCode, setActiveCode] = useState<T>(defaultActiveCode);

    const generatorSetActiveCode = useCallback((code: T) => {
        return () => {
            setActiveCode(code);
        };
    }, []);

    return {
        activeCode,
        setActiveCode,
        generatorSetActiveCode,
    };

};

export default useActiveCode;
