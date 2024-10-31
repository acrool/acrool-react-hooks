import {useCallback, useEffect, useRef, useState, useTransition} from 'react';

interface IUseLazyLoadProps {
    enabled?: boolean
    imageUrl?: string
    onError?: () => void
}


/**
 * 攬加載背景圖片
 *
 * 背景圖片會造成二次加載，因為透過 new Image 加載一次,
 * 成功後再給予 style background image 再次加載
 * 這部分只能透過瀏覽器的緩存來避免第二次
 * @param isLazy
 * @param imageUrl
 */
const useLazyLoadBackground = ({
    enabled,
    imageUrl,
    onError,
}: IUseLazyLoadProps) => {
    const imageRef = useRef<HTMLDivElement>(null);
    const watcher = useRef<IntersectionObserver>();
    const [, startTransition] = useTransition();
    const [isFetching, setFetching] = useState<boolean>(false);
    const [isPending, setPending] = useState<boolean>(true);
    const [_imageUrl, setImageUrl] = useState<string>();

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
            if(onError) onError();
        });
    };

    const handleOnLoad = () => {
        startTransition(() => {
            setFetching(false);
            setPending(false);
            setImageUrl(imageUrl);
        });
    };


    const onEnterView: IntersectionObserverCallback = useCallback((entries, observer) => {
        for (let entry of entries) {
            if (entry.isIntersecting) {
                const el = entry.target as HTMLDivElement;
                observer.unobserve(el);
                handleOnFetching();

                if(imageUrl){
                    const img = new Image();
                    img.src = imageUrl;
                    img.onload = handleOnLoad;
                    img.onerror = handleOnError;
                }

            }
        }
    }, [imageUrl, onError]);

    return {
        imageRef,
        _imageUrl,
        isPending,
        isFetching,
    };
};

export default useLazyLoadBackground;
