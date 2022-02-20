import axios from "axios";
import { server } from '../../config'
interface GameListProps{
    id : number,
    name: string,
    image_url: string,
    console_Id : number
}
interface SearchProps{
  category: number,
  page: number,
  size: number,
  sortBy: string
}

export const setGameListAction = (gameList: GameListProps) => {
    return {
      type: "setGameList",
      payload: gameList,
    };
  };

export const fetchGameListRequestAction = (category: number) =>{
  return {
    type: "fetchGameListRequest",
    payload: category
  }
}

export const fetchGameListSuccessAction = (payload:any[]) =>{
  return {
    type: "fetchGameListSuccess",
    payload: payload
  }
}

export const fetchGameListFailAction = () =>{
  return {
    type: "fetchGameListFail",
  }
}

export const fetchGameListThunk = ({category,page,size,sortBy}: SearchProps)=>{
    return (dispatch: any) => {
        dispatch(fetchGameListRequestAction(category))
        axios.get(`${server}/api/v1/games/byPage?page=${page}&size=${size}&sortBy=${sortBy}&category=${category}`)
          .then((res)=>{
            dispatch(fetchGameListSuccessAction(res.data))
          })
          .catch((err)=>{
            dispatch(fetchGameListFailAction());
          })
    }
};