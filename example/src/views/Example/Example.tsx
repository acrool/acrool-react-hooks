import {useOnlyUpdateEffect} from '@acrool/react-hooks';
import {useState} from 'react';


const Example = () => {
    const [count, setCount] = useState(0);


    useOnlyUpdateEffect(() => {
        console.log('useUpdateEffect count', count);
    }, [count]);
   
    return <div style={{display: 'flex', gap: '10px', alignItems: 'flex-start', width: '100%'}}>
        <button type="button" onClick={() => setCount(curr => curr + 1)}>Update {count}</button>
    </div>;
};

export default Example;




