import Button from '@mui/material/Button'
import { styled } from '@mui/system'
import LoadingButton from '@mui/lab/LoadingButton';
import React from 'react'

const _Button = styled(Button)({
    height: 36,
    background: 'var(--gradientBlue)',
    color: 'var(--white)',
    borderRadius: 24,
    padding: '8px 20px'
})

const _CircleButton = styled('button')({
    height: '46px',
    width: '46px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: 'none',
    cursor: 'pointer',
    background: 'var(--gradientBlue)',
    color: 'var(--white)',
    borderRadius: 100,
    position: 'relative',
    overflow:'hidden'
    // padding: '8px 8px'
})

const _LoadingButton = styled(LoadingButton)({
    height: 36,
    background: 'var(--gradientBlue)',
    color: 'var(--white)',
    borderRadius: 24,
    padding: '8px 20px'
})
interface styledButtonProps {
    children: any;
    onClick?: () => void;
    type?: "button" | "submit" | "reset" | undefined;
    form?: string;
}

interface styledCircleButtonProps {
    children: any;
    onClick?: any;
    type?: "button" | "submit" | "reset" | undefined;
    form?: string;
}

interface styledLoadingButtonProps {
    children: string;
    onClick?: () => void;
    type?: "button" | "submit" | "reset" | undefined;
    form?: string;
    loading: boolean;
}
const StyledButton = ({children, onClick, type, form }: styledButtonProps) => {
    return (
        <_Button form={form} type={type} onClick={onClick}>{children}</_Button>

    )
}

const StyledCircleButton = ({children, onClick, type, form }: styledCircleButtonProps) => {
    return (
        <_CircleButton form={form} type={type} onClick={onClick}>{children}</_CircleButton>

    )
}

const StyledLoadingButton = ({ children, onClick, type, form,loading }: styledLoadingButtonProps) => {
    return (
        <_LoadingButton form={form} type={type} loading={loading} onClick={onClick} >{children}</_LoadingButton>
    )
}

export  {StyledButton, StyledCircleButton, StyledLoadingButton}