import axiosConf from "./config/axios.conf";



const getPosts = async (params) => {
    try {
        const res = await axiosConf.get('/api/posts', { params });

        if (res.status === 200) {
            return res.data
        }
    }
    catch (err) {
        console.log("Error fetching posts", err);
        return null;
    }
}

const getPostById = async (id) => {

    try {
        const res = await axiosConf.get(`/api/posts/${id}`);
        if (res.status === 200) {
            return res.data;
        }
    }
    catch (err) {
        console.log(err);
        return null;
    }

}


export { getPostById, getPosts }