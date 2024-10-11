# Acrool React Hooks / Lazy

<p>
    About lazy load
</p>


## Features

### useLazyLoadBackground

Control textarea state

```tsx
import {useLazyLoadBackground, EImageLoadStatus} from '@acrool/react-hooks/lazy';

const Img = () => {
    const {imageRef} = useLazyLoadBackground({enabled: isLazy, imageUrl: src});

    return <ImgRoot
        ref={imageRef}
        style={{
            ...style,
            '--bg-image': src && !isLazy ? `url("${src}")`: undefined,
        }}
        width={isFluid ? '100%':width}
        isLazy={isLazy}
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
        &[data-status="${EImageLoadStatus.done}"],
        &[data-status="${EImageLoadStatus.fail}"] {
            &:before{
                opacity: 1;
                filter: blur(0);
            }
        }
    `}

`;



```






