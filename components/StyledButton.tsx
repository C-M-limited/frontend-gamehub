import Button from '@mui/material/Button'
import { styled } from '@mui/system'
import LoadingButton from '@mui/lab/LoadingButton';
import React, { CSSProperties } from 'react'
import { IconButton } from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';

const _Button = styled(Button)({
    height: 36,
    background: 'var(--gradientBlue)',
    color: 'var(--white)',
    borderRadius: 24,
    padding: '8px 20px'
})

const _CircleButton = styled('button')({
    height: '40px',
    width: '40px',
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

const _CloseButton = styled(IconButton)(({theme})=>({
    position: 'absolute',
    right: 8,
    top: 8,
    color: 'var(--black)',
    borderRadius: '100%',
}))

interface styledButtonProps {
    children: any;
    onClick?: () => void;
    type?: "button" | "submit" | "reset" | undefined;
    form?: string;
    style?: CSSProperties;
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

interface styledCloseButtonProps {
    onClick?: () => void;
}
const StyledButton = ({children, onClick, type, form, style }: styledButtonProps) => {
    return (
        <_Button form={form} type={type} onClick={onClick} style={style}>{children}</_Button>

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

const StyledCloseFormButton = ({onClick}: styledCloseButtonProps) => {
    return (
        <_CloseButton
            aria-label="close"
            onClick={onClick}
            >
            <CloseIcon />
        </_CloseButton>
    )
}

export  {StyledButton, StyledCircleButton, StyledLoadingButton, StyledCloseFormButton}