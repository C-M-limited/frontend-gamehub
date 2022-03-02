interface userProfileProps{
    role  : string;
    id    : number;
    email : string;
    name  : string;
    imageKey: string;
    
}

export const  setUserProfileAction =(payload : userProfileProps) =>{
    return{
        type: 'setUserProfile',
        payload
    }
}