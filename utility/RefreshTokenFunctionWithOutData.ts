import { useRouter } from "next/router";
import { axiosInstance } from "../config";

export default function RefreshTokenFunction(originalFunction : any){
    // const router = useRouter();
    const refreshToken = `Bearer ${localStorage.getItem('refresh-token')}`;
    const headers:any = { 
      'refreshToken': refreshToken,
    };
    axiosInstance.post('token/refresh',{},{headers})
        .then((res)=>{
            localStorage.setItem('access-token',res.data.AUTHORIZATION );
            originalFunction();
        })
        .catch((err)=>{
            console.log("Problem:")
            console.log(err.response.data);
            if(err.response.status === 403){
                if (err.response.data==='Expired JWT token'){
                    //send it to login


                    // router.push({
                    //     query: {
                    //     showLoginForm: true
                    //     }
                    // })
                    
                }
            }
        })
    
}

