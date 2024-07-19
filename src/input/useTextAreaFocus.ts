import {useCallback, useEffect, useRef, useState} from 'react';


const useTextAreaFocus = () => {
    const textFieldRef = useRef<HTMLTextAreaElement>();
    const [isFocus, setFocus] = useState<boolean>(false);

    const handleOnFocus = useCallback(() => setFocus(true), []);
    const handleOnBlur = useCallback(() => setFocus(false), []);

    useEffect(() => {
        if(textFieldRef.current) {
            textFieldRef.current?.addEventListener('focus', handleOnFocus);
            textFieldRef.current?.addEventListener('blur', handleOnBlur);
        }
        return () => {
            if(textFieldRef.current){
                textFieldRef.current.removeEventListener('focus', handleOnFocus);
                textFieldRef.current.removeEventListener('blur', handleOnBlur);
            }
        };

    }, []);

    /**
     * Focus
     * @param lineIndex 指定Focus在第幾行
     */
    const focus = (lineIndex: number|'last' = 0) => {
        if(!textFieldRef.current){
            return;
        }
        const lines = textFieldRef.current.value.split('\n');

        const calcLineIndex = lineIndex === 'last' ? lines.length: lineIndex;

        const start = lines.slice(0, calcLineIndex).reduce((acc, curr) => acc + curr.length + 1, 0);

        // Add the length of the previous lines and the newline character
        const end = start + (lines[lineIndex]?.length ?? 0);

        textFieldRef.current.focus();
        textFieldRef.current.setSelectionRange(end,end);
    };

    return {
        textFieldRef,
        focus,
        isFocus,
    };
};

export default useTextAreaFocus;
