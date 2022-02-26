import { Button } from '@mui/material'
import { styled } from '@mui/system'
import React from 'react'

const _Button = styled(Button)({
    height: 36,
    background: 'linear-gradient(90deg, rgba(102,0,255,1) 0%, rgba(180,28,255,1) 100%)',
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

const StyledButton = ({ children, onClick, type, form }: styledButtonProps) => {
    return (
        <_Button form={form} type={type} onClick={onClick}>{children}</_Button>
    )
}

export default StyledButton