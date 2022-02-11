// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios'
import { axiosInstance } from '../../utils/config'
import type { NextApiRequest, NextApiResponse } from 'next'
import FormData from 'form-data'

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // let form = new FormData()
  // form.append("username", "martin.tsang@gmail.com")
  // form.append("password", "password")
  // axios({
  //   headers: {
  //     'Content-Type': 'application/x-www-form-urlencoded'
  //   },
  //   method: 'POST',
  //   data: {
  //     username: "martin.tsang@gmail.com",
  //     password: "password"
  //   },
  //   url: 'http://localhost:8080/login',

  // })
  // .then(data => res.status(200).json(data.data))
  // .catch(err => res.status(200).json(err))
  
  axiosInstance.get('/api/v1/user_profile')
  .then(data => res.status(200).json(data.data))
  .catch(err => res.status(200).json(err))
}
