import {useState} from 'react';




/**
 * 光箱控制 Hook
 * (非遮罩做法)
 */
const useModal = () => {
    const [isOpen, setIsOpen] = useState(false);

    const closeModal = () => {
        return setIsOpen(false);
    };

    const openModal = () => {
        return setIsOpen(true);
    };

    return {
        isOpen,
        openModal,
        closeModal,
    };

};

export default useModal;