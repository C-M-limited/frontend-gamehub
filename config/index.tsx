import axios from "axios"

export const server = process.env.NEXT_PUBLIC_API_URL

export const axiosInstance = axios.create({
    baseURL: `${server}/api/v1/`,
    timeout: 1000,
    headers: {
        'X-Custom-Header': 'foobar',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
    },
})