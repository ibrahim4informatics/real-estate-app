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


const createPost = (data) => {

    return new Promise((resolve, rject) => {
        axiosConf.post('/api/posts', data).then(res => resolve(res)).catch(err => rject(err.response))
    })

}

const deleteMedia = (post_id, media_id) => new Promise((resolve, reject) => {
    axiosConf.delete(`/api/posts/${post_id}/media/${media_id}`, { data: { id: 1 } }).then(res => resolve(res)).catch(err => reject(err.response));
});

const addMedia = (post_id, data) => new Promise((resolve, reject) => {
    axiosConf.patch(`/api/posts/${post_id}/media`, data).then(res => resolve(res)).catch(err => reject(err.response));
});

const updatepost = (post_id, data) => new Promise((resolve, reject) => {
    axiosConf.patch(`/api/posts/${post_id}`, data).then(res => resolve(res)).catch(err => reject(err.response))
})

export { getPostById, getPosts, createPost, deleteMedia, addMedia, updatepost }