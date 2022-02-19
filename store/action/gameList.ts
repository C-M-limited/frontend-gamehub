import axios from "axios";
import { server } from '../../config'
interface GameListProps{
    id : number,
    name: string,
    image_url: string,
    console_Id : number
}
export const setGameListAction = (gameList: GameListProps) => {
    return {
      type: "setGameList",
      payload: gameList,
    };
  };

export const fetchGameListAction = ()=>{
    return async (dispatch: (arg0: { type: string; payload: any; }) => void) => {
        const response = await axios.get(`${server}/api/v1/games/all`)
        dispatch({type: "fetchGameList", payload: response.data})
    }
};