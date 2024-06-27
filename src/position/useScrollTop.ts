import {useCallback, useEffect, useState} from 'react';







/**
 * 偵測ScrollTop到頂
 */
const useScrollTop = () => {
    const [isScrollTop, setIsScrollTop] = useState(window.scrollY === 0);

    const handleCheckTopState = useCallback((ev: Event) => {
        setIsScrollTop(window.scrollY === 0);
    }, []);


    useEffect(() => {
        window.addEventListener('scroll', handleCheckTopState);
        return () => {
            window.removeEventListener('scroll', handleCheckTopState);
        };
    }, []);


    return {
        isScrollTop,
    };

};

export default useScrollTop;