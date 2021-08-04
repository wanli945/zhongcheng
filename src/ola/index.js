import axios from "axios"

const instance = axios.create({
    baseURL: "ola/api/"
});
export default instance
