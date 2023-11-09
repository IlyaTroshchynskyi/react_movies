import {
    END_YEAR_FILTER,
    MAX_INT_VALUE,
    MAX_LENGTH_MOVIE_TITLE, MIN_INT_VALUE, MIN_LENGTH_MOVIE_COUNTRY,
    MIN_LENGTH_MOVIE_DESCRIPTION,
    MIN_LENGTH_MOVIE_TITLE,
    MIN_LENGTH_MOVIE_URL, START_YEAR_FILTER
} from "../const";

export const validateTitle = (title) => {
    console.log(title, 'title', (title.length > MIN_LENGTH_MOVIE_TITLE && title.length < MAX_LENGTH_MOVIE_TITLE))
    return (title.length > MIN_LENGTH_MOVIE_TITLE && title.length < MAX_LENGTH_MOVIE_TITLE)
}

export const validateMovieDescription = (description) => {
    return description.length > MIN_LENGTH_MOVIE_DESCRIPTION
}

export const validateMovieYear = (year) => {
    return year >= START_YEAR_FILTER && year <= END_YEAR_FILTER
}

export const validateMovieUrl = (url) => {
    return (url.length > MIN_LENGTH_MOVIE_URL && url.indexOf(' ') === -1)
}

export const validateMovieCountry = (country) => {
    return (country.length >= MIN_LENGTH_MOVIE_COUNTRY && /^[A-Z]/.test(country))
}

export const validateMovieBudget = (budget) => {
    return budget > MIN_INT_VALUE && budget < MAX_INT_VALUE
}

export const validateMovieFeeInUsa = (fee) => {
    return fee > MIN_INT_VALUE && fee < MAX_INT_VALUE
}

export const validateMovieDate = (dateString) => {
    const date = new Date(dateString)
    const year = date.getFullYear()

    return (year >= START_YEAR_FILTER && year <= END_YEAR_FILTER)
}
