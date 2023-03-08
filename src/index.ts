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
    const [state, setState] = useState<T>(globalState);

    const handleSetState = useCallback((nextState: SetStateAction<T>) => {
      if (nextState instanceof Function) {
        globalState = nextState(globalState);
      } else {
        globalState = nextState;
      }
      listeners.forEach((listener) => listener(globalState));
    }, []);

    useEffect(() => {
      listeners.add(setState);
      return () => {
        listeners.delete(setState);
      };
    }, []);

    return [state, handleSetState];
  };
}
