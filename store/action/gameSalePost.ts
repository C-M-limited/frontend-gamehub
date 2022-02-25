import axios from "axios";
import { server } from '../../config'
// interface GameListProps{
//     id : number,
//     name: string,
//     image_url: string,
//     console_Id : number
// }
interface SearchProps{
  category: string,
  page: number,
  size: number,
  sortBy: string,
  asc: boolean,
}

// export const setGameListAction = (gameList: GameListProps) => {
//     return {
//       type: "setGameList",
//       payload: gameList,
//     };
//   };

export const fetchGameSalePostListRequestAction = (category: string) =>{
  return {
    type: "fetchGameSalePostListRequest",
    payload: category
  }
}

export const fetchGameSalePostListSuccessAction = (payload:any[]) =>{
  return {
    type: "fetchGameSalePostListSuccess",
    payload: payload
  }
}

export const fetchGameSalePostListFailAction = () =>{
  return {
    type: "fetchGameSalePostListFail",
  }
}

export const fetchGameSalePostListThunk = ({category,page,size,sortBy,asc}: SearchProps)=>{
    return (dispatch: any) => {
        dispatch(fetchGameSalePostListRequestAction(category))
        axios.get(`${server}/api/v1/game_sale_post/byPage?page=${page}&size=${size}&sortBy=${sortBy}&category=${category}&asc=${asc}`)
          .then((res)=>{
            dispatch(fetchGameSalePostListSuccessAction(res.data))
          })
          .catch((err)=>{
            dispatch(fetchGameSalePostListFailAction());
          })
    }
};