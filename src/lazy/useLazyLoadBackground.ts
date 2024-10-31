import {useCallback, useEffect, useRef, useState, useTransition} from 'react';

interface IUseLazyLoadProps {
    enabled?: boolean
    imageUrl?: string
    imageCSSVar?: string
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
    imageCSSVar = '--img-bg-url',
}: IUseLazyLoadProps) => {
    const imageRef = useRef<HTMLDivElement>(null);
    const watcher = useRef<IntersectionObserver>();
    const [isPending, startTransition] = useTransition();
    const [isFetching, setFetching] = useState<boolean>(false);

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


    const generatorSetFetchingFn = (el: HTMLDivElement) => {
        return (_isFetching: boolean) => {
            startTransition(() => {
                if(_isFetching){
                    el.setAttribute('fetching', '');
                }else{
                    el.removeAttribute('fetching');
                }
                setFetching(_isFetching);
            });
        };
    };


    const onEnterView: IntersectionObserverCallback = useCallback((entries, observer) => {
        for (let entry of entries) {
            if (entry.isIntersecting) {
                const el = entry.target as HTMLDivElement;
                observer.unobserve(el);

                const setFetchingFn = generatorSetFetchingFn(el);

                if(imageUrl){
                    setFetchingFn(true);

                    const img = new Image();
                    img.src = imageUrl;
                    img.onload = () => {
                        el.style.setProperty(imageCSSVar, `url("${img.src}")`);
                        setFetchingFn(false);
                    };
                    img.onerror = () => {
                        setFetchingFn(false);
                    };
                }

            }
        }
    }, [imageUrl]);

    return {
        imageRef,
        isPending,
        isFetching,
    };
};

export default useLazyLoadBackground;
