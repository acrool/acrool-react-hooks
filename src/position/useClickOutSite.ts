import {useCallback, useRef, useState} from 'react';




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
    const controlVisible = useCallback((newIsVisible?: boolean) => {


        setIsVisible(curr => {
            if(typeof newIsVisible === 'undefined'){
                if(!curr){
                    mainElRef.current?.focus();
                }

                return !curr;
            }

            if(newIsVisible){
                mainElRef.current?.focus();
            }
            return newIsVisible;
        });
    }, [handleClickOutSite]);


    return {
        mainElRef,
        isVisible,
        setIsVisible: controlVisible,
    };

};

export default useClickOutSite;
