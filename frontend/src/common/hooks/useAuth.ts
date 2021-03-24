import {useContext} from "react";
import {authContext} from "../../global/App/AuthorizedApp/AuthorizedApp";

export const useAuth = () => {
    return useContext(authContext);
}