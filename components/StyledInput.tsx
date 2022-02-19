import { styled } from '@mui/system'
import React, { ChangeEvent } from 'react'

const Label = styled('label')({
    color: 'var(--mainDarkerGrey)',
    fontSize: 14,
    marginBottom: '8px',
})

const Input = styled('input')({
    width: '100%',
    height: 36,
    backgroundColor: 'transparent',
    color: 'var(--white)',
    border: 'solid 2px var(--mainPurple)',
    borderRadius: 24,
    paddingLeft: '20px',
    margin: '8px 0px 4px 0px',
})

interface StyledInputProps {
    label: string;
    type: string;
    placeholder: string;
    value: string;
    onChange: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> | undefined;
    error?: boolean;
    helperText?: string;
}

const StyledInput = ({ label, type, placeholder, error, helperText }: StyledInputProps ) => {
  return (
    <>
        <Label>{label}</Label>
        <Input
            type={type}
            placeholder={placeholder}
        />
        {error && <p>{helperText}</p>}
    </>
  )
}

export default StyledInput