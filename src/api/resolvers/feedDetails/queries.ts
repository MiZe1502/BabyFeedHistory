import {FeedDetailsData} from "../../../db/schemas/feedDetails";
import {checkAuthorization} from "../../../utils/token";
import {getAvailableFeedDetailsForUser} from "../../../db/repos/feedDetails";
import {Context} from "../../../utils/types";

const getAvailableFeedDetails =
    async (_: unknown, __: unknown, context: Context):
        Promise<FeedDetailsData[] | null> => {
        const curUser = checkAuthorization(context)

        return getAvailableFeedDetailsForUser(curUser.login);
    }

export const queries = {
    getAvailableFeedDetails,
}