# Acrool React Hooks / Position

<p>
    Related to position control.
</p>


## Features


### usePosition


```tsx
import {IPosition, usePosition} from '@acrool/react-hooks/position';
import React, {forwardRef} from 'react';
import styled, {css} from 'styled-components';

import {setForwardedRef} from '@/utils/copyRef';
import useEscClose from '@/utils/hook/useEscClose';



interface IProps extends FCChildrenProps {
    isVisible?: boolean
    onClose?: (e?: KeyboardEvent) => void
    tabIndex?: number
}

const ModalWrapper = forwardRef<HTMLDivElement, IProps>(({
    isVisible = true,
    children,
    onClose,
    tabIndex = -1
}, ref) => {
    useEscClose('ModalWrapper', onClose);
    const {positionRef, position} = usePosition();


    return <ModalWrapperRoot
        isVisible={isVisible}
        tabIndex={tabIndex}
    >
        <Container
            id="test"
            ref={setForwardedRef(ref, positionRef)}
            vertical={position?.vertical ?? 'bottom'}
            horizontal={position?.horizontal ?? 'right'}
        >
            {children}
        </Container>

    </ModalWrapperRoot>;
});

export default ModalWrapper;




const Container = styled.div<IPosition>`
    position: absolute;
    transition: opacity .3s ease;
    width: auto;
    z-index: 6;

    border: 1px solid #424242;
    border-radius: 10px;
    overflow: hidden;

    ${props => props.horizontal === 'left' && css`
        right: 0;
    `}
    ${props => props.horizontal === 'right' && css`
        left: 0;
    `}
    ${props => props.vertical === 'top' && css`
        bottom: calc(100% - 1px);
    `}
    ${props => props.vertical === 'bottom' && css`
        top: calc(100% - 1px);
    `}
`;

const ModalWrapperRoot = styled.div<{
    isVisible: boolean,
}>`
    visibility: ${props => (props.isVisible ? 'visible' : 'hidden')};
    opacity: ${props => (props.isVisible ? 1 : 0)};
    z-index: ${props => (props.isVisible ? 10 : -1)};
    pointer-events: ${props => (props.isVisible ? 'auto' : 'none')};
`;

```

### useScrollTop





