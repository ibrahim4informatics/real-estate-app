import axios from "axios";

export default axios.create({ withCredentials: true, baseURL: import.meta.env.API_BASE_URL || 'http://localhost:8800' });