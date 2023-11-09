import {DEFAULT_VALUE_OPTION} from "../const";

const MovieRelatedObj = (props) => {
    let chosenIds = Array.isArray(props.data.chosen) === true ?
        props.data.chosen.map((obj) => obj.id) :
        Array.from(props.data.chosen)

    return (
        <>
            <div className='flex-0 w-64 mx-2'>
                <label htmlFor={props.id} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    {props.label}
                </label>
                <select multiple
                        id={props.id}
                        name={props.id}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value={DEFAULT_VALUE_OPTION}>{DEFAULT_VALUE_OPTION}</option>
                    {
                        props.data.available.map((option) =>
                            <option selected={chosenIds.includes(option.id)} key={option.id} value={option.id}>{option.name}</option>)
                    }
                </select>
            </div>
        </>
    )
}

export default MovieRelatedObj
