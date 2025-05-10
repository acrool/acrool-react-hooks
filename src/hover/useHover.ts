import {useContext} from 'react';

import {HoverContext} from './HoverProvider';

export const useHover = () => {
    const context = useContext(HoverContext);
    if (!context) {
        throw new Error('useHoverContext 必須在 HoverProvider 內使用');
    }
    return context.isHovering;
};


