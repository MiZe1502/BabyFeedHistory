import {atom, useRecoilState} from "recoil";
import {UserAccount} from "../api/user/queries";

export const currentAccountState = atom<UserAccount | null>({
    key: 'currentAccount',
    default: null,
})

interface UseAccountStateRet {
    currentAccount: UserAccount | null;
    updateAccountData: (newData: UserAccount) => void;
    clearAccountData: () => void;
}

export const useAccountState = (): UseAccountStateRet => {
    const [currentAccount, setCurrentAccount] = useRecoilState(currentAccountState)

    const updateAccountData = (newData: UserAccount) => {
        setCurrentAccount({
            ...newData,
        })
    }

    const clearAccountData = () => {
        setCurrentAccount(null);
    }

    return {
        currentAccount,
        updateAccountData,
        clearAccountData,
    }
}