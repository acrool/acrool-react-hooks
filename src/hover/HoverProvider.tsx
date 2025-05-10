import {createContext, ReactNode, RefObject, useCallback, useEffect, useRef, useState} from 'react';

interface HoverContextValue<T extends HTMLElement> {
  isHovering: boolean
  ref?: RefObject<T|null>
}

export const HoverContext = createContext<HoverContextValue<HTMLElement>>({
    isHovering: false,
});


interface IHoverProviderProps {
    children: ReactNode
}


/**
 * Hover Provider
 * @param children
 */
export const HoverProvider = ({
    children
}: IHoverProviderProps) => {

    const [isHovering, setHovering] = useState(false);
    const ref = useRef<HTMLElement>(null);

    const handleMouseEnter = useCallback(() => setHovering(true), []);
    const handleMouseLeave = useCallback(() => setHovering(false), []);

    useEffect(() => {
        const node = ref.current;
        if (!node) return;
        node.addEventListener('mouseenter', handleMouseEnter);
        node.addEventListener('mouseleave', handleMouseLeave);
        return () => {
            node.removeEventListener('mouseenter', handleMouseEnter);
            node.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [handleMouseEnter, handleMouseLeave]);

    return (
        <HoverContext.Provider value={{isHovering, ref}}>
            {children}
        </HoverContext.Provider>
    );
};

export const HoverConsumer = HoverContext.Consumer;


