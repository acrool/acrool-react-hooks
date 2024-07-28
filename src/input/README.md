# Acrool React Hooks / Input

<p>
    Related to input controls.
</p>


## Features

### useTextArea

Control textarea state

```tsx
import {useTextAreaFocus} from '@acrook/react-hooks';
import {useEffect} from "react";

const Example = () => {
    const {textFieldRef, focus, isFocus} = useTextArea();

    useEffect(() => {
        focus(1);
    }, []);
    
    return <>
        <TextArea
            ref={textFieldRef}
        />
        isFocus: {String(isFocus)}
    </>;
}
```




