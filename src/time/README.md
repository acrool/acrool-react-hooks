# Acrool React Hooks / Time

<p>
    Time-related (e.g. timer).
</p>


## Features

### useCountDownTimer

Count down time and trigger notification after time

```tsx
import {useCountDownTimer} from '@acrook/react-hooks';
import {useEffect} from "react";

const Example = () => {
    const {start, totalSeconds} = useCountDownTimer();
    const timeoutMs = 3 * 1000;
    
    // onice time
    useEffect(() => {
        start(timeoutMs).then(() => console.log('timeout'));
    }, [start]);

    // loop repeat
    useEffect(() => {
        const runTimer = async () => {
            while (true) {
                await start(timeoutMs);
                console.log('timeout');
            }
        };

        runTimer();
    }, [start]);
    
    return <p>{totalSeconds}</p>
}
```



### useCountUpTimer

Record how long the time is counting upwards, and conveniently display the clock format

```tsx
import {useCountUpTimer} from '@acrook/react-hooks';
import {formatSecondToString} from '@acrool/jsutils/date';
import {useEffect} from "react";


const Example = () => {
    const {start, time} = useCountUpTimer();

    const timeoutMs = 3 * 1000;
    const short = formatSecondToString(time);
    
    useEffect(()=>{
        start(timeoutMs);
    }, [timeoutMs]);
    
    return <p>{short}</p>;
}
```

