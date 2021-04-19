import {
    UserData,
    UserRegistrationData,
    UserUpdateData
} from "../db/schemas/users";
import {UserInputError} from "apollo-server-express";
import {FeedData} from "../db/schemas/feeds";
import {FeedDetailsData} from "../db/schemas/feedDetails";

interface Errors {
    login?: string;
    password?: string;
    confirmPassword?: string;
    general?: string;
    timestamp?: string;
    details?: DetailsErrors[];
}

interface DetailsErrors {
    general?: string;
    type?: string;
    name?: string;
    amount?: string;
    amountOfWhat?: string;
}

interface ValidationResult {
    errors: Errors;
    isValid: boolean;
}

//TODO: try to merge validateUpdatingData and validateRegistrationData
export const validateUpdatingData =
    (user: UserUpdateData): ValidationResult => {
        const {login, password, confirmPassword} = user
        let errors: Errors = {};

        errors = {
            ...errors,
            ...validateLogin(login),
        }

        //if password is being updated
        if (password) {
            errors = {
                ...errors,
                ...validatePassword(password),
                ...comparePasswords(password, confirmPassword)
            }
        }

        return {
            errors,
            isValid: isValid(errors)
        }
    }

export const validateRegistrationData =
    ({login, password, confirmPassword}: UserRegistrationData): ValidationResult => {
    let errors: Errors = {};

    errors = {
        ...errors,
        ...validateLogin(login),
        ...validatePassword(password),
        ...comparePasswords(password, confirmPassword)
    }

    return {
        errors,
        isValid: isValid(errors)
    }
}

export const validateLoginData = ({login, password}: UserData): ValidationResult => {
    let errors: Errors = {};

    errors = {
        ...errors,
        ...validateLogin(login),
        ...validatePassword(password),
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
}

export const validateLogin = (login?: string): Errors => {
    const errors: Errors = {};

    if (!login || login.trim().length === 0) {
        errors.login = 'User login must not be empty';
    }

    return errors;
}

export const validateQueryFeedsData = (year: number, month: number): Errors => {
    const errors: Errors = {};

    if (!year || month < 0 || month > 11) {
        errors.general = 'Incorrect query data';
    }

    return errors;
}

export const validateQueryDayFeedsData = (from: number, to: number): Errors => {
    const errors: Errors = {};

    if (from <= 0 || to <= 0 || to < from) {
        errors.general = 'Incorrect query data';
    }

    return errors;
}

export const validateFeedDetails =
    (feedDetails: FeedDetailsData, errors: DetailsErrors = {}): DetailsErrors => {
    if (!feedDetails.type) {
        errors.type = "Incorrect feed details type"
    }

    if (!feedDetails.name) {
        errors.name = "Name for feed details must be provided"
    }

    if (feedDetails.type === "valueWithAmount") {
        if (!feedDetails.amount || feedDetails.amount < 0) {
            errors.amount = "Incorrect amount value"
        }

        if (!feedDetails.amountOfWhat) {
            errors.amountOfWhat = "Incorrect value for amount target"
        }
    }

    return errors;
}

export const validateFeedsData = (feedData: FeedData): Errors => {
    const {details, timestamp } = feedData;
    const errors: Errors = {};

    if (!timestamp || timestamp < 0) {
        errors.timestamp = "Incorrect datetime for feed"
    }

    if (!details || details.length === 0) {
        return errors;
    }

    details.forEach((item) => {
        let error: DetailsErrors = {};

        error = validateFeedDetails(item, error)

        if (Object.keys(error).length > 0) {
            if (!errors.details) {
                errors.details = []
            }
            errors.details?.push(error)
        }
    })

    return errors;
}

export const validatePassword = (password: string): Errors => {
    const errors: Errors = {};

    if (!password || password.length === 0) {
        errors.password = 'User password must not be empty';
    }

    return errors;
}

export const comparePasswords =
    (password: string, confirmPassword: string): Errors => {
    const errors: Errors = {};

    if (password !== confirmPassword) {
        errors.confirmPassword = 'Passwords are not equal';
    }

    return errors;
}

export const throwGeneralError =
    (msg: string, errors: Errors | DetailsErrors): void => {
    errors.general = msg;
    throw new UserInputError(errors.general, {errors});
}

export const isValid = (errors?: Errors | DetailsErrors): boolean => {
    return !errors || Object.keys(errors).length === 0
}