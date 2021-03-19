import {useAuth} from "../../common/hooks/useAuth";
import React from "react";
import {Redirect, Route, RouteProps } from "react-router-dom";
import {routes} from "../../utils/routes";

export const PrivateRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
    let auth = useAuth();
    return (
        <Route
            {...rest}
            render={({ location }) =>
                auth.token ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: routes.login,
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
}