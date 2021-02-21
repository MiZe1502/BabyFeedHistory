import {UserData} from "../db/schemas/users";

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

export const validateLogin = (login: string): Errors => {
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