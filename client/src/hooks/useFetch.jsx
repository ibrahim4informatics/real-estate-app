import { useEffect, useState } from "react"
import axios from "../utils/axios";
export default (url, deps) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        axios.get(url).then(res => {
            setData(res.data);
            setIsLoading(false);
        }).catch(error => { setError(error.response.data || "an Error occured while fetching data"); setIsLoading(false) })
    }, [...deps])
    return { isLoading, data, error }
}