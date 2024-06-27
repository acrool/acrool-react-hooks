import {useRef} from 'react';


const useTextFieldFocus = () => {
    const textFieldRef = useRef<HTMLTextAreaElement>();

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
        focus
    };
};

export default useTextFieldFocus;
