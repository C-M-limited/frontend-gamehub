import { Button } from '@mui/material'
import { styled } from '@mui/system'
import React from 'react'

const _Button = styled(Button)({
    backgroundColor: 'var(--mainPurple) !important',
    color: 'var(--white)',
    borderRadius: 12,
    padding: '8px 20px'
})

const StyledButton = ({ children, onClick, type }) => {
    return (
        <_Button type={type} onClick={onClick}>{children}</_Button>
    )
}

export default StyledButton