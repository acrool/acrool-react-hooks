# Acrool React Hooks / Lazy

<p>
    About lazy load
</p>


## Features

### useLazyLoadBackground

div css background-url lazy hook

```tsx
import {useLazyLoadBackground, EImageLoadStatus} from '@acrool/react-hooks/lazy';

const Img = () => {
    const {imageRef, isPending, isFetching} = useLazyLoadBackground({enabled: isLazy, imageUrl: src});

    const getImgBgImageCSSVar = () => {
        if(src && !isLazy){
            return `url("${src}")`;
        }
        return undefined;
    };
    
    return <ImgRoot
        ref={imageRef}
        style={{
            ...style,
            '--img-bg-url': getImgBgImageCSSVar(),
        }}
        data-lazy={isLazy ? '':undefined}
    >
        {children}
    </ImgRoot>;
}



const ImgRoot = styled.div<{
    width?: string,
    height?: string,
    isMaskEnable?: boolean,
    bgSize?: 'cover' | 'contain' | string | '100%',
    isLazy?: boolean,
}>`
    width: ${props => props.width};
    height: ${props => props.height};
    position: relative;

    > * {
        z-index: 0;
    }

    &:before{
        content: "";
        display: block;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;

        background: no-repeat center center;
        background-size: ${props => props.bgSize};
        background-image: var(--bg-image);

        z-index: 0;
    }


    ${props => props.isLazy && css`
        &:before{
            opacity: 0;
            filter: blur(4px);
            transition: opacity .8s, filter .8s;
        }
        &[data-fetching]{
            &:before{
                opacity: 1;
                filter: blur(0);
            }
        }
    `}

`;



```




### useLazyLoadImage

img lazy hook

```tsx
import {useLazyLoadBackground, EImageLoadStatus} from '@acrool/react-hooks/lazy';

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






