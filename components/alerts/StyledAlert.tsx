import React, { useState } from 'react'
import Alert from '@mui/material/Alert';
interface alertProps{
  children: React.PropsWithChildren<{}>;
  type : any;
}
export default function StyledAlert({children,type}: alertProps) {
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
