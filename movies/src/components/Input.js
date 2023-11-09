const Input = (props) => {
    const paragraphErrorClass = 'block w-6/12 bg-red-100 border border-red-400 text-red-700 px-6 py-2 rounded relative'
    return (
        <>
            <div className="sm:col-span-3">
                <label htmlFor={props.id}
                       className="block text-sm font-medium leading-6 text-gray-900">
                    {props.label}
                </label>
                <div className="mt-2">
                    <input
                        type={props.type}
                        name={props.id}
                        id={props.id}
                        onBlur={props.onBlurHandler}
                        onChange={props.onChangeHandler}
                        defaultValue={props.data}
                        className="block w-6/12 p-2.5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {
                        props.enteredValueHasError &&
                        <p className={paragraphErrorClass}>
                            {props.validationMsg}
                        </p>
                    }
                </div>
            </div>

        </>
    )
}

export default Input
