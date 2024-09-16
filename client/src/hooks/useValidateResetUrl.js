import { useEffect, useState } from "react"
import { validateForgotPassword } from "../services/auth.service";

export default (token) => {
    const [data, setData] = useState({ isLoading: null, isValid: null });


    useEffect(() => {
        setData({ isLoading: true, isValid: null });
        validateForgotPassword(token).then(
            () => {
                setData({ isLoading: false, isValid: true });
            }
        ).catch(
            () => {
                setData({ isLoading: false, isValid: false });
            }
        )
    }
        , [data.isLoading]);
    return { ...data };
}