import React, { useState } from 'react'
import Alert from '@mui/material/Alert';

export default function StyledAlert({children}: React.PropsWithChildren<{}>,{type}:string) {
    const [isOpen,setIsOpen] = useState<boolean>(false);

    const handleClose = ()=>{
        setIsOpen(true)
        setTimeout(()=>{
            setIsOpen(false)
        },5000)
    }
  return (
    <Alert onClose={() => handleClose()} severity={type}>{children}</Alert>
  )
}
