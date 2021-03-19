import {useContext} from "react";
import {authContext} from "../../global/AuthorizedApp/AuthorizedApp";

export const useAuth = () => {
    return useContext(authContext);
}