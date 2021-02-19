import config from 'config';

export interface Config {
    port: number;
    hostname: string;
}

const initialConfig: Config = {
    port: 3000,
    hostname: ''
}

export const getCurrentConfig = (): Config => {
    return {...initialConfig, ...config.util.toObject()}
}