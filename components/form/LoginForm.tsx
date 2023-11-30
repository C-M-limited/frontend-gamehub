import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/action/auth";
import { Box, Button, Dialog, DialogContent, styled } from "@mui/material";
import StyledInput from "../StyledInput";
import { StyledCloseFormButton } from "../StyledButton";
import { OpenFormInterface } from "../Navbar";

import EastIcon from '@mui/icons-material/East';

import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { RootState } from "../../store/reducer";

const Title = styled(Box)(({theme})=>({
    display: 'flex', 
    width: '100%',
    justifyContent: 'center', 
    alignItems: 'center',
    fontWeight: 'bolder',
    fontSize: '22px'
}))

const CustomDialogActions = styled("div")(({theme})=>({
    display: 'flex', 
    flexDirection: 'column',
    justifyContent: 'center', 
    alignItems: 'center',
    padding: '0px 0px 20px 0px'
}))

const LoginButton = styled(LoadingButton)(({theme})=>({
    height: 36,
    width: '60%',
    background: 'var(--gradientBlue)',
    color: 'var(--white)',
    borderRadius: 24,
    padding: '8px 20px',
    position: 'relative'
}))

const IconWrapper = styled(Box)(({theme})=>({
    // backgroundColor: 'red',
    display: 'flex', 
    flexDirection: 'column',
    justifyContent: 'center', 
    alignItems: 'center',
}))

const RegisterButton = styled(Button)(({theme})=>({
    height: 36,
    width: '60%',
    background: 'var(--white)',
    color: 'var(--black)',
    borderRadius: 24,
    border: '1px solid var(--color-gray-1)',
    padding: '8px 20px',
    margin: '5px',
    "&:hover": {
        background: 'var(--color-gray-1)',
        color: 'var(--white)',
    }
}))



interface LoginFormProps{
    openForm: OpenFormInterface,
    handleOpenForm: any,
}

export default function LoginForm ({openForm, handleOpenForm}: LoginFormProps) {
    const dispatch = useDispatch();
    const authStatus:any = useSelector((state: RootState) => state.auth);
    
    const [isHoverLoginButton, setIsHoverLoginButton] = useState<boolean>(false);
    const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
    } = useForm();

    const onSubmit = (data: any) => {
      dispatch(login(data));
      handleOpenForm({...openForm, loginForm: false});
    };

    return (
      <Dialog open={openForm.loginForm} onClose={() => handleOpenForm({...openForm, loginForm: false})}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ width: 400, maxWidth: "100%" }}
        >
            <StyledCloseFormButton onClick={()=> handleOpenForm({...openForm, loginForm: false})}/>
            <DialogContent>
                <Title>
                    Login
                </Title>
                <StyledInput
                    label="Email"
                    name="email"
                    placeholder="Enter your email"
                    register={register}
                    required
                    error={!!errors.email}
                    helperText="Email is required"
                    type="email"
                />
                <StyledInput
                    label="Password"
                    name="password"
                    placeholder="Enter your password"
                    register={register}
                    required
                    error={!!errors.password}
                    helperText="Password is required"
                    type="password"
                />
            </DialogContent>
            <CustomDialogActions>
                <LoginButton type="submit" loading={authStatus.loading} onMouseEnter={()=> setIsHoverLoginButton(true)} onMouseLeave={()=> setIsHoverLoginButton(false)}>
                    Login <IconWrapper style={{transform: isHoverLoginButton ? 'translateX(7px)' : 'translateX(0px)', transition: 'transform 0.2s ease', marginLeft: '5px'}}><EastIcon/></IconWrapper>
                </LoginButton>
                <RegisterButton                 
                    onClick={() => {handleOpenForm({...openForm, loginForm: false, registerForm: true})}}
                >
                    Register now!
                </RegisterButton>
            </CustomDialogActions>
        </form>
      </Dialog>
    );
};

