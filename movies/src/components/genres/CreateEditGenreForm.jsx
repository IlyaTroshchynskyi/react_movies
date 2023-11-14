import React from 'react';
import {useNavigate} from "react-router";
import useValidation from "../../hooks/useValidation";
import {validateDescription, validateName, validateUrl} from "../../validators/genres";
import Input from "../Input";
import TextArea from "../TextArea";

function CreateEditGenreForm(props) {
    const navigate = useNavigate()

    const {
        isValid: enteredNameIsValid,
        hasError: enteredNameHasError,
        valueChangeHandler: nameChangeHandler,
        inputBlurHandler: nameBlurHandler,
    } = useValidation(validateName, props.genreData?.name ?? '')

    const {
        isValid: enteredDescriptionIsValid,
        hasError: enteredDescriptionHasError,
        valueChangeHandler: descriptionChangeHandler,
        inputBlurHandler: descriptionBlurHandler,
    } = useValidation(validateDescription, props.genreData?.description ?? '')

    const {
        isValid: enteredUrlIsValid,
        hasError: enteredUrlHasError,
        valueChangeHandler: urlChangeHandler,
        inputBlurHandler: urlBlurHandler,
    } = useValidation(validateUrl, props.genreData?.url ?? '')


    function onSubmitHandler(event) {
        event.preventDefault();

        if (!enteredNameIsValid || !enteredDescriptionIsValid || !enteredUrlIsValid) {
            return
        }

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);

        props.onSubmit({data})
    }

    function onCancelHandler() {
        navigate(props.backPath)
    }

    return (
        <>
            <form onSubmit={onSubmitHandler}>
                <div className="space-y-12">

                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Genre Info</h2>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-3">

                            <Input
                                id='name'
                                type='text'
                                label='Genre Name'
                                onBlurHandler={nameBlurHandler}
                                onChangeHandler={nameChangeHandler}
                                data={props.genreData?.name ?? ''}
                                enteredValueHasError={enteredNameHasError}
                                validationMsg='Genre Name must has length more than 3 characters.'
                            />

                            <TextArea
                                id='description'
                                label='Description'
                                onBlurHandler={descriptionBlurHandler}
                                onChangeHandler={descriptionChangeHandler}
                                data={props.genreData?.description ?? ''}
                                enteredValueHasError={enteredDescriptionHasError}
                                validationMsg='Description must has length more than 5 characters.'
                            />

                            <Input
                                id='url'
                                type='text'
                                label='Url'
                                onBlurHandler={urlBlurHandler}
                                onChangeHandler={urlChangeHandler}
                                data={props.genreData?.url ?? ''}
                                enteredValueHasError={enteredUrlHasError}
                                validationMsg="Url must has length more than 3 characters and doesn't contain whitespaces.."
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-start gap-x-6">
                    <button
                        type="button"
                        onClick={onCancelHandler}
                        className="rounded-md bg-gray-300 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="rounded-md bg-indigo-300 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Save
                    </button>
                </div>
            </form>
        </>
    )

}

export default CreateEditGenreForm
