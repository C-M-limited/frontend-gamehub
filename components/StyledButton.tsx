import { Button } from '@mui/material'
import { styled } from '@mui/system'
import React from 'react'

const _Button = styled(Button)({
    height: 36,
    backgroundColor: 'var(--mainPurple) !important',
    color: 'var(--white)',
    borderRadius: 24,
    padding: '8px 20px'
})

interface styledButtonProps {
    children: string;
    onClick?: () => void;
    type?: "button" | "submit" | "reset" | undefined;
}

const StyledButton = ({ children, onClick, type }: styledButtonProps) => {
    return (
        <_Button type={type} onClick={onClick}>{children}</_Button>
    )
}

export default StyledButton