import {RoutedApp} from "../RoutedApp/RoutedApp";
import React from "react";
import {useFeedItemSubscriptions} from "./useFeedItemSubscriptions";

export const StatedApp = () => {
    useFeedItemSubscriptions();

    return <RoutedApp/>
}