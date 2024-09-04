import { useEffect, useState } from "react"
import axios from "../utils/axios"
export default () => {

    const [user, setUser] = useState(null);
    const [isLogin, setIsLogin] = useState(null);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        axios.get('/api/users').then(res => {
            setUser(res.data.user);
            setIsLogin(true);
            setIsLoading(false);
        })
            .catch(err => {
                setIsLogin(false)
                setIsLoading(false);
            });
    }, [])
    return { isLoading, isLogin, user }

}