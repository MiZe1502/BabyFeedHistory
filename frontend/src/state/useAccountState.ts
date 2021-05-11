import {atom, useRecoilState} from "recoil";
import {UserAccount} from "../api/user/queries";

export const currentAccountState = atom<UserAccount | null>({
    key: 'currentAccount',
    default: null,
})

export const useAccountState = () => {
    const [currentAccount, setCurrentAccount] = useRecoilState(currentAccountState)

    const updateAccountData = (newData: UserAccount) => {
        const oldData = currentAccount ? currentAccount : {};
        setCurrentAccount({
            ...oldData,
            ...newData,
        })
    }

    return {
        currentAccount,
        updateAccountData,
    }
}