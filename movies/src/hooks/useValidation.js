import {useState} from "react";

const useValidation = (validateValue, value) => {
    const [enteredValue, setEnteredValue] = useState(value)
    const [isTouched, setIsTouched] = useState(false)

    const valueIsValid = validateValue(enteredValue)
    const hasError = !valueIsValid && isTouched

    const valueChangeHandler = (event) => {
        setEnteredValue(event.target.value)
    }
    const inputBlurHandler = event => {
        setEnteredValue(event.target.value)
        setIsTouched(true)

    }

    return {isValid: valueIsValid, hasError, valueChangeHandler, inputBlurHandler}
}

export default useValidation