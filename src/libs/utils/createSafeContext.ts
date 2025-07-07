import { createContext, useContext } from 'react';

export const createSafeContext = <T>(name: string) => {
  const context = createContext<T | undefined>(undefined);

  const useSafeContext = () => {
    const value = useContext(context);

    if (value === undefined) {
      const hook = `use${name}`;
      throw new Error(`${hook} must be used within a ${name}Provider`);
    }

    return value;
  };

  return [context, useSafeContext] as const;
};
