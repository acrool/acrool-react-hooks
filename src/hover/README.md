# Acrool React Hooks / Hover

<p>
    Related to hover control.
</p>


## Features
Controls the slide-in state toggle in minimal rendering

### usePosition


```tsx
import {HoverProvider, HoverConsumer} from '@acrool/react-hooks/hover';
import React, {forwardRef} from 'react';
import styled, {css} from 'styled-components';

const Service = () => {

    const items = [
        {
            key: '1',
            icon: EIconCode.shield,
            lottie: '/images/home/service/icons/shield.json',
            text: 'Brand 形象',
        },
        {
            key: '2',
            icon: EIconCode.cube,
            lottie: '/images/home/service/icons/cube.json',
            text: '3D 設計',
        },
        {
            key: '3',
            icon: EIconCode.design,
            lottie: '/images/home/service/icons/design.json',
            text: 'UI 設計',
        },
        {
            key: '4',
            icon: EIconCode.system,
            lottie: '/images/home/service/icons/system.json',
            text: 'System 整合',
        },
        {
            key: '5',
            icon: EIconCode.school,
            lottie: '/images/home/service/icons/school.json',
            text: 'Design 教學',
        },
    ];

    return <ServiceRoot
        className={className}
    >

        <PaddingWrapper>
            <Container className="mb-20 mb-md-30" fluid>
              
                <Row className="gy-5">
                    {items.map(row => {
                        return <Col col={6} md={12/5} xl={12/5} key={row.key}>
                            <ItemCard>
                                <HoverProvider>
                                    <HoverConsumer>
                                        {({ref, isHovering}) => {
                                            return <IconWrapper ref={ref as RefObject<HTMLDivElement>}>
                                                <LottieIcon
                                                    src={row.lottie}
                                                    isPlay={isHovering}
                                                />
                                                {/*<Icon code={row.icon} color="#000" size="38%"/>*/}
                                            </IconWrapper>;
                                        }}
                                    </HoverConsumer>

                                </HoverProvider>

                                <Text>{row.text}</Text>
                            </ItemCard>
                        </Col>;
                    })}
                </Row>
            </Container>
        </PaddingWrapper>


    </ServiceRoot>;
};

export default Service;

```



## Hooks

- useHover
