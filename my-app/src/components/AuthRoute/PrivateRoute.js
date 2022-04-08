import React, { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useContextHook } from '../../context/ContextProvider'
import useAuth from './useAuth'

const PrivateRoute = () => {
  const { user } = useContextHook()
  const {getUser} = useAuth()

  useEffect(() => {
    getUser()
  }, [])
  
  return user ? <Outlet/> : <Navigate to="/login"/>
}

const RouteLinks = () => {
  const { user } = useContextHook()
  const {getUser} = useAuth()

  useEffect(() => {
    getUser()
  }, [])
  
  return user ? <Navigate to="/"/> : <Outlet/>
}

export {PrivateRoute, RouteLinks}