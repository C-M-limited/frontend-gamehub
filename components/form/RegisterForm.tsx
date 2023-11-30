import { useForm } from "react-hook-form";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/action/auth";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography, styled } from "@mui/material";
import StyledInput from "../StyledInput";
import { StyledButton, StyledCloseFormButton, StyledLoadingButton } from "../StyledButton";
import { OpenFormInterface } from "../Navbar";
import { useState } from "react";
import { RootState } from "../../store/reducer";
import { OpenAlertAction } from "../../store/action/alert";
import { registerThunk } from "../../store/action/registration";
import { CharacterImageList } from "../../public/user_icon/user_icon";
import { LoadingButton } from "@mui/lab";

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

const RegisterButton = styled(LoadingButton)(({theme})=>({
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

const LoginButton = styled(Button)(({theme})=>({
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

interface RegisterFormProps{
    openForm: OpenFormInterface,
    handleOpenForm: any,
}

export default function RegisterForm ({openForm, handleOpenForm}: RegisterFormProps) {
    const registerStatus:any = useSelector((state: RootState) => state.register);
    const dispatch = useDispatch();
    const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
    } = useForm();
    const [imageKey, setImageKey] = useState("");
    const onSubmit = (data: any) => {
      if (imageKey === "") {
        dispatch(OpenAlertAction({type:"error", content: "Please Select an User image"}))
        return;
      }else if (data.password !==data.confirmPassword){
        dispatch(OpenAlertAction({type:"error", content: "Password & Confirm Password should be the same"}))
        return;
      }
      dispatch(registerThunk(data, imageKey));
    };
    return (
      <Dialog open={openForm.registerForm} onClose={() => handleOpenForm({...openForm, registerForm: false})}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ width: 400, maxWidth: "100%" }}
        >
            <StyledCloseFormButton onClick={()=> handleOpenForm({...openForm, registerForm: false})}/>
            <DialogContent>
                <Title>Register</Title>
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                >
                    {CharacterImageList.map((charactor) => {
                    return (
                        <Grid
                        item
                        key={charactor.id}
                        onClick={() => {
                            setImageKey(charactor.image_key);
                        }}
                        >
                        <Box
                            style={{
                            border: ` ${
                                imageKey === charactor.image_key
                                ? "5px solid var(--mainBlue)"
                                : "3px solid white"
                            }`,
                            width: "60px",
                            height: "60px",
                            }}
                        >
                            <Image
                            layout="intrinsic"
                            src={charactor.image_url}
                            alt={charactor.image_key}
                            width="100%"
                            height="100%"
                            objectFit="contain"
                            placeholder="blur" 
                            blurDataURL="/blur.png"
                            />
                        </Box>
                        </Grid>
                    );
                    })}
                </Grid>
                <StyledInput
                    label="first name"
                    name="firstName"
                    placeholder="Enter your first name"
                    register={register}
                    required
                    error={!!errors.first_name}
                    helperText="First name is required"
                    type="text"
                />
                <StyledInput
                    label="last name"
                    name="lastName"
                    placeholder="Enter your last name"
                    register={register}
                    required
                    error={!!errors.last_name}
                    helperText="Last name is required"
                    type="text"
                />
                <StyledInput
                    label="email"
                    name="email"
                    placeholder="Enter your email"
                    register={register}
                    required
                    error={!!errors.email}
                    helperText="Email is required"
                    type="email"
                />
                <StyledInput
                    label="password"
                    name="password"
                    placeholder="Enter your password"
                    register={register}
                    required
                    error={!!errors.password}
                    helperText="Password is required"
                    type="password"
                />
                <StyledInput
                    label="confirm password"
                    name="confirmPassword"
                    placeholder="Enter your confirm password"
                    register={register}
                    required
                    error={!!errors.confirm_password}
                    helperText="Confirm password is required"
                    type="password"
                />
          </DialogContent>
          <CustomDialogActions>
            <RegisterButton type="submit" loading={registerStatus.loading} >Register now!</RegisterButton>
            <LoginButton                 
                onClick={() => {handleOpenForm({...openForm, loginForm: true, registerForm: false})}}
            >
                Login
            </LoginButton>
          </CustomDialogActions>
        </form>
      </Dialog>
    );
}