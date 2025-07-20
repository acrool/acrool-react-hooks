# Acrool React Hooks / Lazy

<p>
    About lazy load
</p>


## Features

### useLazyLoadBackground

div css background-url lazy hook

```tsx
import CSS from 'csstype';
import {useLazyLoadBackground} from '@acrool/react-hooks/lazy';

const Img = () => {
    const {imageRef, isPending, isError} = useLazyLoadImage({enabled: isLazy, imageUrl: src});

    /**
     * 取得圖片 URL
     */
    const getImageUrl = () => {
        if(src){
            if(!isLazy){
                return src;
            }
        }
        return undefined;
    };
    
    return <img
        ref={imageRef as React.Ref<HTMLImageElement>}
        src={getImageUrl()}
        alt={alt}
        className={clsx(styles.img, className)}
        data-pending={isLazy ? isPending && !isError: undefined}
        data-error={isError ? '': undefined}
        data-lazy-src={isLazy && isPending ? src: undefined}
        data-lazy={isLazy ? '':undefined}
        data-loader={isLazy && isLazyLoaderVisible && isPending ? '':undefined}
        {...rest}
    />;
}
````






### useLazyLoadImage

img lazy hook

```tsx
import {useLazyLoadImage, EImageLoadStatus} from '@acrool/react-hooks/lazy';

const Img = () => {
    const {imageRef, isPending, isFetching} = useLazyLoadImage({
        enabled: slide.isLazy ?? false,
        imageUrl
    });

    const getImgBgImageCSSVar = () => {
        if(src && !isLazy){
            return `url("${src}")`;
        }
        return undefined;
    };
    
    return <img
        ref={imageRef}
        src={(!slide.isLazy && imageUrl) ? imageUrl :undefined}
        data-lazy-src={slide.isLazy && isPending ? imageUrl: undefined}
    >
        {children}
    </img>;
}
```






