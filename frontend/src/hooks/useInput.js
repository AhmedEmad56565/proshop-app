import { useState } from 'react';

export default function useInput(defaultVal, validationFunc) {
  const [inputVal, setInputVal] = useState(defaultVal);
  const [inputTouched, setInputTouched] = useState(false);

  function handleInputChange(e) {
    setInputVal(e.target.value);
  }

  function handleInputBlur() {
    setInputTouched(true);
  }

  const inputIsInvalid = inputTouched && !validationFunc(inputVal);

  return {
    val: inputVal,
    changeFunc: handleInputChange,
    blurFunc: handleInputBlur,
    err: inputIsInvalid,
  };
}
