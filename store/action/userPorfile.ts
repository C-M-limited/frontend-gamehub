interface userProfileProps{
    role  : string;
    id    : number;
    email : string;
}

export const  setUserProfileAction =(payload : userProfileProps) =>{
    return{
        type: 'setUserProfile',
        payload
    }
}