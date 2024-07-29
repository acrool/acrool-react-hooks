import {useCallback, useEffect, useRef, useState} from 'react';


/**
 * 處理 Textarea 控制
 */
const useTextArea = () => {
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const [isFocus, setFocus] = useState<boolean>(false);

    const handleOnFocus = useCallback(() => setFocus(true), []);
    const handleOnBlur = useCallback(() => setFocus(false), []);

    useEffect(() => {
        if(inputRef.current) {
            inputRef.current?.addEventListener('focus', handleOnFocus);
            inputRef.current?.addEventListener('blur', handleOnBlur);
        }
        return () => {
            if(inputRef.current){
                inputRef.current.removeEventListener('focus', handleOnFocus);
                inputRef.current.removeEventListener('blur', handleOnBlur);
            }
        };

    }, []);

    /**
     * Focus
     * @param lineIndex 指定Focus在第幾行
     */
    const focus = (lineIndex: number|'last' = 0) => {
        if(!inputRef.current){
            return;
        }
        const lines = inputRef.current.value.split('\n');

        const calcLineIndex = lineIndex === 'last' ? lines.length: lineIndex;

        const start = lines.slice(0, calcLineIndex).reduce((acc, curr) => acc + curr.length + 1, 0);

        // Add the length of the previous lines and the newline character
        const end = start + (lines[lineIndex]?.length ?? 0);

        inputRef.current.focus();
        inputRef.current.setSelectionRange(end,end);
    };

    return {
        inputRef,
        focus,
        isFocus,
    };
};

export default useTextArea;
