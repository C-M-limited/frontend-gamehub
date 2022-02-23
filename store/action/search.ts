import axios from "axios";
import { server } from '../../config'

interface SearchProps{
    page: number,
    keyword: string
}

export const fetchSearchListRequestAction = () =>{
    return {
      type: "fetchSearchListRequest",
    }
  }
  
export const fetchSearchListSuccessAction = (payload:any[]) =>{
    return {
        type: "fetchSearchListSuccess",
        payload: payload
    }
}

export const fetchSearchListFailAction = () =>{
    return {
        type: "fetchSearchListFail",
    }
}

export const fetchSearchListThunk = ({page,keyword}:SearchProps) =>{
    return (dispatch: any) => {
        dispatch(fetchSearchListRequestAction())
        axios.get(`${server}/api/v1/games/byKeyword?keyword=${keyword}&page=${page}`)
            .then((res)=>{dispatch(fetchSearchListSuccessAction(res.data))})
            .catch((err)=>{dispatch(fetchSearchListFailAction())})
        
    }
}