import {useState} from 'react';




/**
 * 顯示隱藏切換 Hook
 */
const useShow = (defaultIsShow = false) => {
    const [isShow, setIsOpen] = useState<boolean>(defaultIsShow);

    const hide = () => setIsOpen(false);
    const show = () => setIsOpen(true);
    const toggle = () => setIsOpen(curr => !curr);

    return {
        isShow,
        show,
        hide,
        toggle,
    };

};

export default useShow;
