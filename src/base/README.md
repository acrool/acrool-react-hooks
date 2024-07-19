# Acrool React Hooks / Base

<p>
    All relatively basic Hook methods.
</p>


## Features

### useShow

Show/hide switch Hook

```tsx
import {useShow} from '@acrook/react-hooks';
import {useEffect} from "react";

const Example = () => {
    const { isShow, show, hide, toggle} = useShow();
    
    return <>
        <p>isShow: {String(isShow)}</p>
        <button onClick={show}>Show</button>
        <button onClick={hide}>Hide</button>
        <button onClick={toggle}>toggle</button>
    </>;
}
```



### useOnlyUpdateEffect

Only executed when componentDidUpdate

```tsx
import {useUpdateEffect} from '@acrook/react-hooks';
import {useEffect} from "react";

const Example = () => {
    useUpdateEffect(() => {
        console.log('update!');
    }, []);
}
```


