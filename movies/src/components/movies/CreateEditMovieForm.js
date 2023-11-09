import {useNavigate} from "react-router";
import useValidation from "../../hooks/useValidation";
import Input from "../Input";
import {
    validateMovieBudget,
    validateMovieCountry, validateMovieDate,
    validateMovieDescription,
    validateMovieFeeInUsa,
    validateMovieUrl,
    validateMovieYear,
    validateTitle
} from "../../validators/movies";
import TextArea from "../TextArea";
import {END_YEAR_FILTER, MAX_INT_VALUE, MIN_INT_VALUE, START_YEAR_FILTER} from "../../const";
import MovieRelatedObj from "../MovieRelatedObj";


function convertIdToInt(formData, fieldName) {
    return formData.getAll(fieldName).map((value) => (value !== '-' ? +value : null))
}

const CreateEditMovieForm = (props) => {
    const navigate = useNavigate()

    const {
        isValid: enteredTitleIsValid,
        hasError: enteredTitleHasError,
        valueChangeHandler: titleChangeHandler,
        inputBlurHandler: titleBlurHandler,
    } = useValidation(validateTitle, props.movieData?.title ?? '')

    const {
        isValid: enteredDescriptionIsValid,
        hasError: enteredDescriptionHasError,
        valueChangeHandler: descriptionChangeHandler,
        inputBlurHandler: descriptionBlurHandler,
    } = useValidation(validateMovieDescription, props.movieData?.description ?? '')

    const {
        isValid: enteredYearIsValid,
        hasError: enteredYearHasError,
        valueChangeHandler: yearChangeHandler,
        inputBlurHandler: yearBlurHandler,
    } = useValidation(validateMovieYear, props.movieData?.year ?? 0)

    const {
        isValid: enteredCountryIsValid,
        hasError: enteredCountryHasError,
        valueChangeHandler: countryChangeHandler,
        inputBlurHandler: countryBlurHandler,
    } = useValidation(validateMovieCountry, props.movieData?.country ?? '')

    const {
        isValid: enteredBudgetIsValid,
        hasError: enteredBudgetHasError,
        valueChangeHandler: budgetChangeHandler,
        inputBlurHandler: budgetBlurHandler,
    } = useValidation(validateMovieBudget, props.movieData?.budget ?? 0)

    const {
        isValid: enteredFeeUsaIsValid,
        hasError: enteredFeeUsaHasError,
        valueChangeHandler: feeUsaChangeHandler,
        inputBlurHandler: feeUsaBlurHandler,
    } = useValidation(validateMovieFeeInUsa, props.movieData?.fees_is_usa ?? 0)

    const {
        isValid: enteredUrlIsValid,
        hasError: enteredUrlHasError,
        valueChangeHandler: urlChangeHandler,
        inputBlurHandler: urlBlurHandler,
    } = useValidation(validateMovieUrl, props.movieData?.url ?? '')

    const {
        isValid: enteredDateIsValid,
        hasError: enteredDateHasError,
        valueChangeHandler: dateChangeHandler,
        inputBlurHandler: dateBlurHandler,
    } = useValidation(validateMovieDate, props.movieData?.world_premier ?? '')


    function onSubmitHandler(event) {
        event.preventDefault();

        if (!enteredTitleIsValid ||
            !enteredDescriptionIsValid ||
            !enteredUrlIsValid ||
            !enteredYearIsValid ||
            !enteredCountryIsValid ||
            !enteredBudgetIsValid ||
            !enteredFeeUsaIsValid ||
            !enteredDateIsValid) {
            return
        }

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);

        data['genres'] = convertIdToInt(formData, 'genres') || []
        data['actors'] = convertIdToInt(formData, 'actors') || []
        data['directors'] = convertIdToInt(formData, 'directors') || []
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
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Movie Info</h2>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-3">

                            <Input
                                id='title'
                                type='text'
                                label='Movie Title'
                                onBlurHandler={titleBlurHandler}
                                onChangeHandler={titleChangeHandler}
                                data={props.movieData?.title ?? ''}
                                enteredValueHasError={enteredTitleHasError}
                                validationMsg='Title must has length more than 3 characters.'
                            />

                            <Input
                                id='world_premier'
                                type='date'
                                label='World Premier Date'
                                onBlurHandler={dateBlurHandler}
                                onChangeHandler={dateChangeHandler}
                                data={props.movieData?.world_premier ?? ''}
                                enteredValueHasError={enteredDateHasError}
                                validationMsg='Title must has length more than 3 characters.'
                            />

                            <Input
                                id='year'
                                type='number'
                                label='Year'
                                onBlurHandler={yearBlurHandler}
                                onChangeHandler={yearChangeHandler}
                                data={props.movieData?.year ?? 0}
                                enteredValueHasError={enteredYearHasError}
                                validationMsg={`Year must be between ${START_YEAR_FILTER} and ${END_YEAR_FILTER}`}
                            />

                            <Input
                                id='country'
                                type='text'
                                label='Country'
                                onBlurHandler={countryBlurHandler}
                                onChangeHandler={countryChangeHandler}
                                data={props.movieData?.country ?? ''}
                                enteredValueHasError={enteredCountryHasError}
                                validationMsg='The length of the country must be more than 3 characters and begin with a capital letter.'
                            />

                            <Input
                                id='budget'
                                type='number'
                                label='Budget'
                                onBlurHandler={budgetBlurHandler}
                                onChangeHandler={budgetChangeHandler}
                                data={props.movieData?.budget ?? 0}
                                enteredValueHasError={enteredBudgetHasError}
                                validationMsg={`Budget must be between ${MIN_INT_VALUE} and ${MAX_INT_VALUE}`}
                            />

                            <Input
                                id='fees_is_usa'
                                type='number'
                                label='Fee in USA'
                                onBlurHandler={feeUsaBlurHandler}
                                onChangeHandler={feeUsaChangeHandler}
                                data={props.movieData?.fees_is_usa ?? 0}
                                enteredValueHasError={enteredFeeUsaHasError}
                                validationMsg={`Fee is USA must be between ${MIN_INT_VALUE} and ${MAX_INT_VALUE}`}
                            />

                            <Input
                                id='url'
                                type='text'
                                label='Url'
                                onBlurHandler={urlBlurHandler}
                                onChangeHandler={urlChangeHandler}
                                data={props.movieData?.url ?? ''}
                                enteredValueHasError={enteredUrlHasError}
                                validationMsg="Url must has length more than 3 characters and doesn't contain whitespaces"
                            />

                            <TextArea
                                id='description'
                                label='Description'
                                onBlurHandler={descriptionBlurHandler}
                                onChangeHandler={descriptionChangeHandler}
                                data={props.movieData?.description ?? ''}
                                enteredValueHasError={enteredDescriptionHasError}
                                validationMsg='Description must has length more than 5 characters.'
                            />

                            <MovieRelatedObj
                                id='genres'
                                label='Choose Genres'
                                data={props.genres}
                            />
                            <MovieRelatedObj
                                id='directors'
                                label='Choose Directors'
                                data={props.directors}
                            />
                            <MovieRelatedObj
                                id='actors'
                                label='Choose Actors'
                                data={props.actors}
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

export default CreateEditMovieForm
