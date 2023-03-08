import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";

type QwarkHook<QwarkType> = () => [
  QwarkType,
  Dispatch<SetStateAction<QwarkType>>
];

export function qwark<QwarkType>(
  initialValue: QwarkType
): QwarkHook<QwarkType> {
  let globalState: QwarkType = initialValue;

  const listeners = new Set<Dispatch<SetStateAction<QwarkType>>>();

  return () => {
    const [state, setState] = useState<QwarkType>(globalState);

    const handleSetState = useCallback(
      (nextState: SetStateAction<QwarkType>) => {
        if (nextState instanceof Function) {
          globalState = nextState(globalState);
        } else {
          globalState = nextState;
        }
        listeners.forEach((listener) => listener(globalState));
      },
      []
    );

    useEffect(() => {
      listeners.add(setState);
      return () => {
        listeners.delete(setState);
      };
    }, []);

    return [state, handleSetState];
  };
}
