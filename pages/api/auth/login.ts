// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
import FormData from 'form-data'

const baseUrl = process.env.HOST

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { username, password} = req.body
  axios.post(`${baseUrl}/login`,{
      username,
      password
  })
  .then(data => res.status(200).json(data))
  .catch(err => res.status(200).json(err))
}
