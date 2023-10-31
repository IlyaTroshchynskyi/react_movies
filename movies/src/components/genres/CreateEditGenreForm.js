import {useNavigate} from "react-router";

function CreateEditGenreForm(props) {
  const navigate = useNavigate()
  function onSubmitHandler(event) {
    event.preventDefault();

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

                <div className="sm:col-span-3">
                  <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                    Genre Name
                  </label>
                  <div className="mt-2">
                    <input
                        type="text"
                        name="name"
                        id="name"
                        defaultValue={props.genreData?.name ?? ''}
                        className="block w-6/12 p-2.5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Description
                  </label>
                  <textarea
                      id="description"
                      rows="4"
                      name='description'
                      defaultValue={props.genreData?.description ?? ''}
                      className='block  p-2.5 w-6/12 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                      placeholder="Write your thoughts here...">
                  </textarea>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="url" className="block text-sm font-medium leading-6 text-gray-900">
                    Url
                  </label>
                  <div className="mt-2">
                    <input
                        id="url"
                        name="url"
                        type="text"
                        defaultValue={props.genreData?.url ?? ''}
                        className="block w-6/12  p-2.5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

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
