import axios from "axios"

const dev = process.env.NODE_ENV !== 'production'

export const server = dev ? 'https://app.gamehub.link' : 'https://app.gamehub.link'

export const axiosInstance = axios.create({
    baseURL: `${server}/api/v1/`,
    timeout: 1000,
    headers: {
        'X-Custom-Header': 'foobar',
        'Access-Control-Allow-Origin': '*',
    },
})