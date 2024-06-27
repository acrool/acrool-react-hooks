import {useCallback, useEffect, useId,useRef, useState} from 'react';




/**
 * 點擊非主Element, 進行點擊取消
 * (非遮罩做法)
 */
const useClickOutSite = <T extends HTMLElement>() => {
    // 主體
    const mainElRef = useRef<T|null>(null);

    // 顯示控制
    const [isVisible, setIsVisible] = useState(false);



    /**
     * 處理點擊遮罩後的動作
     */
    const handleClickOutSite = useCallback((evt: MouseEvent) => {
        if (mainElRef && mainElRef.current && mainElRef.current.contains(evt.target as Node)) return;

        controlVisible(false);
    }, [mainElRef]);


    /**
     * 處理控制顯示隱藏
     */
    const controlVisible = useCallback((isVisible = false) => {
        setIsVisible(isVisible);

        setTimeout(() => {
            if(isVisible){
                document.addEventListener('click', handleClickOutSite);
            }else{
                document.removeEventListener('click', handleClickOutSite);
            }
        }, 0);
    }, [handleClickOutSite]);



    return {
        mainElRef,
        isVisible,
        setIsVisible: controlVisible,
    };

};

export default useClickOutSite;
