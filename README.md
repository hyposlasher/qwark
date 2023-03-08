# Simplest way to make `useState` global

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

```javascript
import React from "react";
import qwark from "qwark";

const initialState = 0;
const useGlobalCount = qwark(initialState);

const MyComponent = () => {
  const [count, setCount] = useGlobalCount();

  return <button onClick={() => setCount(count + 1)}>Increment</button>
  );
};

// Whenever the count state updates, AnotherComponent will render and receive the updated state.
const AnotherComponent = () => {
  const [count] = useGlobalCount();

  return <p>{count}</p>;
}
```




