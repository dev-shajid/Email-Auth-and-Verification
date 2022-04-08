import React from 'react'
import { useContextHook } from '../context/ContextProvider'

const Nav = () => {
  const {dispatch} = useContextHook()
  return (
    <nav>
      <div className="menu">
        <div className="logo">Logo</div>
        <div onClick={()=>dispatch({type:"REMOVE_USER"})} className="logout">Logout</div>
      </div>
    </nav>
  )
}

export default Nav