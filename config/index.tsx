const dev = process.env.NODE_ENV !== 'production'

export const server = dev ? 'http://localhost:8080' : 'https://yourwebsite.com'