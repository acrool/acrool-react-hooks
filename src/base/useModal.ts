import {useState} from 'react';




/**
 * 光箱控制 Hook
 */
const useModal = () => {
    const [isOpen, setIsOpen] = useState(false);

    const closeModal = () => {
        return setIsOpen(false);
    };

    const openModal = () => {
        return setIsOpen(true);
    };

    const toggleModal = () => {
        return setIsOpen(curr => !curr);
    };

    return {
        isOpen,
        openModal,
        closeModal,
        toggleModal,
    };

};

export default useModal;
