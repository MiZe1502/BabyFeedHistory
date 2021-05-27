import {RoutedApp} from "../RoutedApp/RoutedApp";
import React from "react";
import {useFeedItemSubscriptions} from "./useFeedItemSubscriptions";
import {useFeedDetailsSubscriptions} from "./useFeedDetailsSubscriptions";

export const StatedApp = (): React.ReactElement => {
    useFeedItemSubscriptions();
    useFeedDetailsSubscriptions();

    return <RoutedApp/>
}