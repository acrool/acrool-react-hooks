import {useCallback,useEffect, useRef, useState} from 'react';

interface IUseLazyLoadProps {
    enabled?: boolean
    imageUrl?: string
}

export enum EImageLoadStatus {
    loading = 'loading',
    done = 'done',
    fail = 'fail',
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
    imageUrl
}: IUseLazyLoadProps) => {
    const imageRef = useRef<HTMLDivElement>(null);
    const watcher = useRef<IntersectionObserver>();

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


    const onEnterView: IntersectionObserverCallback = useCallback((entries, observer) => {
        for (let entry of entries) {
            if (entry.isIntersecting) {
                const el = entry.target as HTMLDivElement;
                observer.unobserve(el);

                el.dataset.status = String(EImageLoadStatus.loading);

                if(imageUrl){
                    const img = new Image();
                    img.src = imageUrl;
                    img.onload = () => {
                        el.style.setProperty('--bg-image', `url("${img.src}")`);

                        setTimeout(() => {
                            el.dataset.status = String(EImageLoadStatus.done);
                        }, 300);
                    };
                    img.onerror = () => {
                        el.dataset.status = String(EImageLoadStatus.fail);
                    };
                }

            }
        }
    }, [imageUrl]);

    return {
        imageRef,
    };
};

export default useLazyLoadBackground;
