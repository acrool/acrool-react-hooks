# Acrool React Hooks / Input

<p>
    Related to input controls.
</p>


## Features

### useTextarea

Control textarea state

```tsx
import {useTextArea} from '@acrook/react-hooks';
import {useEffect} from "react";

const Example = () => {
    const {inputRef, focus, isFocus} = useTextArea();

    useEffect(() => {
        focus(1);
    }, []);
    
    return <>
        <TextArea
            ref={inputRef}
        />
        isFocus: {String(isFocus)}
    </>;
}
```




