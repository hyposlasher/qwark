import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";

type GlobalStateHook<T> = () => [T, Dispatch<SetStateAction<T>>];

export function createQwark<T>(initialValue: T): GlobalStateHook<T> {
  let globalState: T = initialValue;

  const listeners = new Set<Dispatch<SetStateAction<T>>>();

  return () => {
    const [value, setValue] = useState<T>(globalState);

    const handleSetValue = useCallback((nextState: SetStateAction<T>) => {
      if (nextState instanceof Function) {
        globalState = nextState(globalState);
      } else {
        globalState = nextState;
      }
      listeners.forEach((listener) => listener(globalState));
    }, []);

    useEffect(() => {
      listeners.add(setValue);
      return () => {
        listeners.delete(setValue);
      };
    }, []);

    return [value, handleSetValue];
  };
}
