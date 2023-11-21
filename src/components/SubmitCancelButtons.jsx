import React from "react";

const SubmitCancelButtons = (props) => {
    return (
        <>
            <div className="mt-6 flex items-center justify-start gap-x-6">
                <button
                    type="button"
                    onClick={props.onCancelHandler}
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
        </>
    )
}
export default SubmitCancelButtons
