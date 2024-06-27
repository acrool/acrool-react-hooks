import {useEffect, useLayoutEffect, useRef, useState} from 'react';


export interface IPosition {vertical: 'top'|'bottom', horizontal: 'left'|'right'};


/**
 * 取得適合的顯示位置
 * @param el
 */
const getVisiblePosition = (el: HTMLElement): IPosition => {
    const rect = el.getBoundingClientRect();
    const bottom = rect.bottom;
    const right = rect.right;
    const screenWidth = window.innerWidth || document.documentElement.clientWidth;
    const screenHeight = window.innerHeight || document.documentElement.clientHeight;

    const vertical = bottom >= screenHeight ? 'top' : 'bottom';
    const horizontal = right >= screenWidth ? 'left' : 'right';


    return {
        vertical,
        horizontal
    };
};


/**
 * 取得項目適合顯示的位置
 */
const usePosition = () => {
    const positionRef = useRef<HTMLDivElement>(null);

    const [position, setPosition] = useState<IPosition>();

    useLayoutEffect(() => {
        if(positionRef?.current){
            setPosition(getVisiblePosition(positionRef.current));
        }
    }, []);

    return {
        positionRef,
        position,
    };
};

export default usePosition;
