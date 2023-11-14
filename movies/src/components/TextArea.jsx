import React from 'react';


const TextArea = (props) => {

    const paragraphErrorClass = 'block w-6/12 bg-red-100 border border-red-400 text-red-700 px-6 py-2 rounded relative'
    return (
        <>
            <div className="sm:col-span-3">
                <label
                    htmlFor={props.id}
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    {props.label}
                </label>
                <textarea
                    id={props.id}
                    rows="4"
                    onBlur={props.onBlurHandler}
                    onChange={props.onChangeHandler}
                    name={props.id}
                    defaultValue={props.data}
                    className='block  p-2.5 w-6/12 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                >
                  </textarea>
                {
                    props.enteredValueHasError &&
                    <p className={paragraphErrorClass}>
                        {props.validationMsg}
                    </p>
                }
            </div>
        </>
    )
}

export default TextArea
