import config from 'config';
import depthLimit from "graphql-depth-limit";

export interface Config {
    port: number;
    hostname: string;
    db: string;
    secret: string;
    exp: string;
    saltRounds: number;
    maxRequestSize: string;
    gqlDepthLimit: number;
    corsOrigin: string;
    corsMethods: string[];
    corsHeaders: string[];
}

const initialConfig: Config = {
    port: 3000,
    hostname: '',
    db: '',
    secret: '',
    exp: '1m',
    saltRounds: 10,
    maxRequestSize: '1mb',
    gqlDepthLimit: 10,
    corsOrigin: "http://localhost:3000",
    corsMethods: [],
    corsHeaders: [],
}

export const getCurrentConfig = (): Config => {
    return {...initialConfig, ...config.util.toObject()}
}

export const getConfigValueByKey = (key: keyof Config): Config[typeof key] => {
    return config.get(key);
}