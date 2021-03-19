import {useState} from "react";
import {gql, useMutation} from "@apollo/client";

export const useAuthorizedApp = () => {
    const [token, setToken] = useState("");

}