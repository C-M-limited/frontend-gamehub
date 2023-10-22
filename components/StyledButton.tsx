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

const _LoadingButton = styled(LoadingButton)({
    height: 36,
    background: 'var(--gradientBlue)',
    color: 'var(--white)',
    borderRadius: 24,
    padding: '8px 20px'
})
interface styledButtonProps {
    children: string;
    onClick?: () => void;
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
const StyledButton = ({ children, onClick, type, form }: styledButtonProps) => {
    return (
        <_Button form={form} type={type} onClick={onClick}>{children}</_Button>
    )
}

const StyledLoadingButton = ({ children, onClick, type, form,loading }: styledLoadingButtonProps) => {
    return (
        <_LoadingButton form={form} type={type} loading={loading} onClick={onClick} >{children}</_LoadingButton>
    )
}

export  {StyledButton,StyledLoadingButton}