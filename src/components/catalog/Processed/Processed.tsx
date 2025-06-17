import { useState } from 'react';

export default function Processed({stateString}: {stateString: string}): JSX.Element {
    const [count, setCount] = useState(0);

    setTimeout(() => setCount(count > 2 ? 0 : count + 1), 300);

    return <p>{stateString}{new Array(count).fill('.').join('')}</p>
}