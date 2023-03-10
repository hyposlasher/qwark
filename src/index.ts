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

export default function qwark<QwarkType>(
  initialValue: QwarkType
): QwarkHook<QwarkType> {
  let value: QwarkType = initialValue;

  const listeners = new Set<Dispatch<SetStateAction<QwarkType>>>();

  return () => {
    const [state, setState] = useState<QwarkType>(value);

    const handleSetState = useCallback(
      (nextState: SetStateAction<QwarkType>) => {
        if (nextState instanceof Function) {
          value = nextState(value);
        } else {
          value = nextState;
        }
        listeners.forEach((listener) => listener(value));
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
