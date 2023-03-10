# Qwark is the simplest global state hook for React with `useState` API

`qwark` creates a global `useState` hook. No Context. No Providers. With `useState` API

## Installation

```bash
npm install qwark
```

or yarn:

```bash
yarn add qwark
```

## Usage
### Create qwark hook
```javascript
import qwark from "qwark";

const initialState = 0;

const useCountQwark = qwark(initialState);
```
### Use the created qwark hook in any React component
``` javascript
const Button = () => {
  const [count, setCount] = useCountQwark();

  return <button onClick={() => setCount(count + 1)}>Increment</button>
  );
};
```

``` javascript
const Count = () => {
  const [count] = useCountQwark();

  return <p>{count}</p>
  );
};



