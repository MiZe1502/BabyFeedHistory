import React from "react";
import {IntlProvider} from "react-intl";
import {en} from "../../../loc/en";
import {ru} from "../../../loc/ru";
import {RecoilRoot} from "recoil";
import {StatedApp} from "../StatedApp/StatedApp";
import {useAuth} from "../../../common/hooks/useAuth";
import {Localization} from "../../../api/user/queries";

const loc: Record<Localization, Record<string, string>> = {
    'ru': ru,
    'en': en,
}

export const IntlApp = (): React.ReactElement => {
    const auth = useAuth();

    return <IntlProvider
        messages={loc[auth?.loc as Localization] || en}
        locale={auth?.loc || "en"} defaultLocale="en">
        <RecoilRoot>
            <StatedApp />
        </RecoilRoot>
    </IntlProvider>
}