import { SetStateAction, useEffect, useRef, useState } from "react";

export const useStateWithPromise = <T>(initialState: T):
  [T, (stateAction: SetStateAction<T>) => Promise<T>] => {
  const [state, setState] = useState(initialState);
  const readyPromiseResolverRef = useRef<((currentState: T) => void) | null>(
    null
  );

  useEffect(() => {
    if (readyPromiseResolverRef.current) {
      readyPromiseResolverRef.current(state);
      readyPromiseResolverRef.current = null;
    }

    /** 
     *  The ref dependency here is mandatory! Why?
     *  Because the useEffect would never be called if the new state value
     *  would be the same as the current one, thus the promise would never be resolved
     */
  }, [readyPromiseResolverRef.current, state]);

  const handleSetState = (stateAction: SetStateAction<T>) => {
    setState(stateAction);
    return new Promise(resolve => {
      readyPromiseResolverRef.current = resolve;
    }) as Promise<T>;
  };

  return [state, handleSetState];
};

export default useStateWithPromise;