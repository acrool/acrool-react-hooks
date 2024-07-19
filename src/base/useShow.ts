import {useState} from 'react';




/**
 * 顯示隱藏切換 Hook
 */
const useShow = () => {
    const [isShow, setIsOpen] = useState<boolean>(false);

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
