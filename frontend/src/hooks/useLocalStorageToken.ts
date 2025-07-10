import React, { useEffect, useState } from 'react';

export function useLocalStorageToken(key: string, intervalMs = 1000) {
  const [value, setValue] = useState(() => localStorage.getItem(key));

  useEffect(() => {
    const interval = setInterval(() => {
      const newValue = localStorage.getItem(key);
      if (newValue !== value) {
        setValue(newValue);
      }
    }, intervalMs);

    return () => clearInterval(interval);
  }, [key, value, intervalMs]);

  return value;
}
