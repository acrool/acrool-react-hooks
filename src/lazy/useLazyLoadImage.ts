import {useCallback, useEffect, useRef, useState, useTransition} from 'react';

interface IUseLazyLoadProps {
    enabled?: boolean
    imageUrl?: string
}


/**
 * 攬加載圖片標籤
 * @param isLazy
 * @param imageUrl
 */
const useLazyLoadImage = ({
    enabled,
    imageUrl,
}: IUseLazyLoadProps) => {
    const imageRef = useRef<HTMLImageElement>(null);
    const watcher = useRef<IntersectionObserver>(null);
    const [_, startTransition] = useTransition();
    const [isFetching, setFetching] = useState<boolean>(false);
    const [isPending, setPending] = useState<boolean>(true);
    const [isError, setError] = useState<boolean>(false);

    useEffect(() => {
        if(enabled && imageRef.current && imageUrl){
            watcher.current = new window.IntersectionObserver(onEnterView);
            watcher.current.observe(imageRef.current); // Start watching
        }
        return () => {
            if (watcher.current) {
                watcher.current.disconnect(); // Cleanup observer on unmount or dependencies change
            }
        };
    }, [imageUrl, enabled]);



    const handleOnFetching = () => {
        startTransition(() => {
            setFetching(true);
        });
    };

    const handleOnError = () => {
        startTransition(() => {
            setFetching(false);
            setPending(false);
            setError(true);
        });
    };

    const handleOnLoad = () => {
        startTransition(() => {
            setFetching(false);
            setPending(false);
        });
    };

    const onEnterView: IntersectionObserverCallback = useCallback((entries, observer) => {
        for (let entry of entries) {
            if (entry.isIntersecting) {
                const el = entry.target as HTMLImageElement;
                observer.unobserve(el);
                handleOnFetching();

                el.src = imageUrl!;
                el.onload = handleOnLoad;
                el.onerror = handleOnError;
            }
        }
    }, [imageUrl]);

    return {
        imageRef,
        isPending,
        isFetching,
        isError,
    };
};

export default useLazyLoadImage;
