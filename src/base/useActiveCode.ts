import {useCallback, useState} from 'react';




/**
 * 選定狀態切換
 */
const useActiveCode = <T>(defaultActiveCode: T) => {
    const [activeCode, setActiveCode] = useState<T>(defaultActiveCode);

    /**
     * 產生 設定ActiveCode 方法
     */
    const generatorSetActiveCode = useCallback((code: T) => {
        return () => {
            setActiveCode(code);
        };
    }, []);

    /**
     * 檢查是否為 Active
     */
    const checkIsActive = useCallback((code: T) => {
        return activeCode === code;
    }, [activeCode]);

    return {
        activeCode,
        checkIsActive,
        setActiveCode,
        generatorSetActiveCode,
    };

};

export default useActiveCode;
