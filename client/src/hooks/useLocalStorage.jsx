import { useEffect, useState } from "react";

// local storage might have other keys that are the same
const PREFIX = "whatsapp-clone-";

export default function useLocalStorage(key, initialValue) {
  const prefixedKey = PREFIX + key;
  //use function version of useState since you only want to run it once since getting things from local strorage can take a while
  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(prefixedKey);
    //   using null here, 0 can still be fine
    if (jsonValue != null) return JSON.parse(jsonValue);
    // if we actually using our hook, then return the function invoked
    if (typeof initialValue === "function") {
      return initialValue();
    } else {
      return initialValue;
    }
  });

  // any time, the prefixedkey or value changes, we need to resave it in local storage
  useEffect(() => {
    localStorage.setItem(prefixedKey, JSON.stringify(value));
  }, [prefixedKey, value]);

  return [value, setValue];
}
