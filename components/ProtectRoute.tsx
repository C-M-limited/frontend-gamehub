import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store/reducer'

interface protectRouteProps {
  children: React.ReactChild;
  pathname: string;
}

const ProtectRoute = ({ children, pathname }: protectRouteProps) => {
    const auth = useSelector((state:RootState)=>state.auth)
    const router = useRouter()

    useEffect(()=>{
      if (pathname === '/add_game' || pathname === '/profile/me') {
        if (Object.keys(auth).length===0) router.push('/')
      }
    },[pathname])

  return (
    <>
        {children}
    </>
  )
}

export default ProtectRoute