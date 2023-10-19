import axios from "axios"

const isProd = process.env.NODE_ENV === 'production'

export const server = isProd ? process.env.API_URL : 'http://localhost:8080'
// export const server = dev ? 'http://localhost:8080' : 'http://ec2-18-141-208-106.ap-southeast-1.compute.amazonaws.com:8080'

export const axiosInstance = axios.create({
    baseURL: `${server}/api/v1/`,
    timeout: 1000,
    headers: {
        'X-Custom-Header': 'foobar',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
    },
})