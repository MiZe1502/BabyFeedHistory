import {useContext} from "react";
import {
    AuthContext,
    authContext
} from "../../global/App/AuthorizedApp/AuthorizedApp";

export const useAuth = (): AuthContext | undefined => {
    return useContext(authContext);
}