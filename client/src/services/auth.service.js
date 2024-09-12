import axios from "./config/axios.conf";


const registerUser = async (data) => new Promise((resolve, reject) => {
    axios.post('/api/auth/register', data).
        then(res => resolve(res)).
        catch(err => reject(err.response))
})
const loginUser = async (email, password) =>

    new Promise((resolve, reject) => {
        axios.post('/api/auth/login', { email, password }).
            then(res => resolve(res)).
            catch(err => reject(err.response))
    })


const logoutUser = ()=> new Promise((resolve, reject)=>{
    axios.get('/api/auth/logout').then(res => resolve(res)).catch(err => reject(err.response))
})

const forgotPassword = async (email) => new Promise((resolve, reject) => {
    axios.post('/api/auth/reset', { email }).
        then(res => resolve(res)).
        catch(err => reject(err.response))
});


const validateForgotPassword = async (token) => {

    try {

        const res = await axios.get('/api/auth/reset', { params: { token } });
        if (res.status === 200) {
            return "valid reset password url";
        }

    }
    catch (err) {
        return "invalid reset password url";
    }

}

export { registerUser, loginUser, forgotPassword, validateForgotPassword, logoutUser }