import { useEffect, useState } from "react"
import axios from "../services/config/axios.conf"
import { useNavigate } from "react-router-dom";
export default (directRedirect) => {
    const [user, setUser] = useState(null);
    const [isLogin, setIsLogin] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigation = useNavigate()
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
        if (directRedirect) return navigation(directRedirect)
    }, [])
    return { isLoading, isLogin, user }
}