import {Ref} from 'react';


/**
 * Assign the refs
 *
 * React.forwardRef(props, ref) => {
 * const mainRef = useRef(null);
 *
 * return <textarea
 *       ref={node => {
 *           mainRef.current = node;
 *           if (typeof ref === 'function') {
 *               ref(node);
 *           } else if (ref) {
 *               ref.current = node;
 *           }
 *       }}
 *   />
 * }
 *
 * changeTo
 *
 * React.forwardRef(props, ref) => {
 * const mainRef = useRef(null);
 *
 * return <textarea ref={setForwardedRef(ref, mainRef) />
 *
 * @param forwardedRef
 * @param localRef
 */
export const setForwardedRef = <T>(
    forwardedRef: Ref<T>|undefined,
    localRef: React.MutableRefObject<T|null>
) => {
    return (node: T | null) => {
        localRef.current = node;
        if (forwardedRef) {
            if (typeof forwardedRef === 'function') {
                forwardedRef(node);
            } else if (forwardedRef) {
                (forwardedRef as {current: T|null}).current = node as T|null;
            }
        }
    };
};
