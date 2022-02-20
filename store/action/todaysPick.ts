import axios from "axios";
import { server } from "../../config";
interface rangeProps{
    start_post_number: number,
    last_post_number : number
}
export const fetchTodayRequestAction = () =>{
    return {
        type: "fetchTodayRequest"
    }
}

export const fetchTodaySuccessAction = (payload:any[]) => {
    return {
        type: "fetchTodaySuccess",
        payload: payload
    }
}

export const fetchTodayFailedAction = () => {
    return {
        type: "fetchTodayFailed"
    }
}

export const fetchTodayThunk = (range: rangeProps) =>{
    return (dispatch: any) => {
        dispatch(fetchTodayRequestAction());
        axios.get(`${server}/api/v1/game_sale_post/fewPosts?start_post_number=${range.start_post_number}&last_post_number=${range.last_post_number}`)
            .then((res)=>{
                dispatch(fetchTodaySuccessAction(res.data))
            })
            .catch((err)=>{
                dispatch(fetchTodayFailedAction())
            })
    }
}