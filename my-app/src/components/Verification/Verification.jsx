import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Error from '../Error/Error'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContextHook } from '../../context/ContextProvider';

const Verification = () => {
  const { loading, dispatch } = useContextHook()
  const navigate = useNavigate()  
  const { id, token } = useParams()
  const [verified, setVerified] = useState(true)

  const getVerified = async () => {
    dispatch({ type: "ADD_LOADING" })
    const res = await fetch(`/api/user/${id}/verify/${token}`, {
      method:"get"
    })
    const data = await res.json()
    
    if (res.status === 200) {
      setVerified(true)
      toast.success(data.message);
      localStorage.setItem('jsonwebtoken', data.token)
      dispatch({ type: "ADD_USER", payload: data.name })
      setTimeout(()=>navigate('/'),2000)
      dispatch({ type: "REMOVE_LOADING" })
    } else {
      setVerified(false)
      dispatch({ type: "REMOVE_LOADING" })
    }
  }

  useEffect(() => {
    getVerified()
    return () => {
      getVerified()
    }
  },[])

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={2000}      
      />
      {
        !loading?
          <>
          {
            verified ?
            <div style={{ display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
              <h1>Successfully Verified Your Account</h1>
            </div>
            :
            <Error /> 
          }
          </>
          :
        <h1 style={{textAlign:'center'}}>Loading...</h1>
      }
    </>
  )
}

export default Verification