import {
    UserData,
    UserRegistrationData,
    UserUpdateData
} from "../db/schemas/users";
import {UserInputError} from "apollo-server-express";

interface Errors {
    login?: string;
    password?: string;
    confirmPassword?: string;
    general?: string;
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

export const throwGeneralError = (msg: string, errors: Errors): void => {
    errors.general = msg;
    throw new UserInputError(errors.general, {errors});
}

export const isValid = (errors?: Errors): boolean => {
    return !errors || Object.keys(errors).length === 0
}