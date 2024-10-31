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
    const {imageRef,_imageUrl, isPending, isFetching} = useLazyLoadBackground({enabled: isLazy, imageUrl: src});

    const getImgBgImageCSSVar = () => {
        if(src){
            if(!isLazy){
                return `url("${src}")`;
            }
            if(_imageUrl){
                return `url("${_imageUrl}")`;
            }
        }
        return undefined;
    };
    
    return <ImgRoot
        ref={imageRef}
        style={{
            ...style,
            '--img-bg-url': getImgBgImageCSSVar(),
        } as CSS.Properties}
        data-pending={isPending}
        data-lazy={isLazy ? '':undefined}
    >
        {children}
    </ImgRoot>;
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






