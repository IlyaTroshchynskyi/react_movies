import {
    MAX_LENGTH_GENRE_NAME,
    MIN_LENGTH_GENRE_DESCRIPTION,
    MIN_LENGTH_GENRE_NAME,
    MIN_LENGTH_GENRE_URL
} from "../const/config";

export const validateName = (name) => {
    return name.length > MIN_LENGTH_GENRE_NAME && name.length < MAX_LENGTH_GENRE_NAME;
}

export const validateDescription = (description) => {
    return description.length > MIN_LENGTH_GENRE_DESCRIPTION
}

export const validateUrl = (url) => {
    return (url.length > MIN_LENGTH_GENRE_URL && url.indexOf(' ') === -1)
}
