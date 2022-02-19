import { styled } from '@mui/system'
import React, { ChangeEvent } from 'react'
import { Path, useForm, UseFormRegister, SubmitHandler } from "react-hook-form";

const Label = styled('label')({
    color: 'var(--mainDarkerGrey)',
    fontSize: 14,
    marginBottom: '8px',
})

const Input = styled('input')<{error ?: boolean}>(({error})=>({
    width: '100%',
    height: 36,
    backgroundColor: 'transparent',
    color: 'var(--white)',
    border: `solid 2px ${error ? 'var(--ns)' : 'var(--mainPurple)'}`,
    borderRadius: 24,
    paddingLeft: '20px',
    margin: '8px 0px 0px 0px',
}))

const HelperText = styled('label')({
    color: 'var(--ns)',
    fontSize: 14,
})
interface StyledInputProps {
    label: Path<any>;
    name: string;
    placeholder: string;
    register: UseFormRegister<any>;
    required: boolean;
    error: boolean;
    helperText: string;
}

const StyledInput = ({ label, name, register, required, error, helperText, placeholder }: StyledInputProps ) => {
  return (
    <div style={{ position: 'relative' }}>
        <Label>{label}</Label>
        <Input placeholder={placeholder} error={error} {...register(name, { required })}/>
        {error && <HelperText>{helperText}</HelperText>}
    </div>
  )
}

export default StyledInput