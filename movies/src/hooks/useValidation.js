import {useState} from "react";

const useValidation = (validateValue) => {
    const [enteredValue, setEnteredValue] = useState('')
    const [isTouched, setIsTouched] = useState(false)

    const valueIsValid = validateValue(enteredValue)
    const hasError = !valueIsValid && isTouched

    const valueChangeHandler = (event) => {
        setEnteredValue(event.target.value)
    }
    const inputBlurHandler = event => {
        setIsTouched(true)

    }

    return {isValid: valueIsValid, hasError, valueChangeHandler, inputBlurHandler}
}

export default useValidation