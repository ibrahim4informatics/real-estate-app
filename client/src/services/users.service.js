import axios from "./config/axios.conf"

const getUser = () => new Promise((resovle, reject) => {

    axios.get('/api/users').then(res => res.status === 200 && res)
        .catch(err => err.response)

})

const updateUserPersonelInfo = (data) => new Promise((resolve, reject) => {

    axios.patch('/api/users', data).then(res => resolve(res))
        .catch(err => reject(err.response));
});


const changeEmail = (email, password) => new Promise((resolve, reject) => {
    axios.patch('/api/users/change-email', { email, password }).then(res => resolve(res)).catch(err => reject(err.response));
})

const changePassword = (old_password, confirm,new_password) => new Promise((resolve, reject) => {
    axios.patch('/api/users/change-password', { old_password, new_password, confirm }).then(res => resolve(res)).catch(err => reject(err.response));
})

const changeAvatar = (display_url, bucket_url) => new Promise((resolve, reject) => {
    axios.patch('/api/users/avatar', { display_url, bucket_url }).then(res => {
        resolve(res);
    }).catch(err => reject(err.response));
})


const deleteAvatar = () => new Promise((resolve, reject) => {
    axios.delete('/api/users/avatar').then(res => {
        resolve(res);
    }).catch(err => reject(err.response));
});



export { getUser, changeAvatar, deleteAvatar, updateUserPersonelInfo, changeEmail, changePassword }