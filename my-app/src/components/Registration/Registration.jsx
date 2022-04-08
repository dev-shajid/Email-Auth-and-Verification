import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useContextHook } from '../../context/ContextProvider'
import './Registration.scss'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Registration = () => {
  const {loading, dispatch} = useContextHook()
  const [input, setInput] = React.useState({ name: '', email: '', password: '', cpassword: '' })
  const [sentEmail, setSentEmail] = useState(false)
  const [loadingText, setLoadingText] = useState("Loading...")

  const handleChange = (e) => {
    setInput({...input, [e.target.name]:e.target.value})  
  }

  const handleSubmit = async (e) => {
    dispatch({type:"ADD_LOADING"})
    e.preventDefault()

    const res = await fetch('/api/create', {
      method: "post",
      headers: {
        "Content-Type":"application/json"
      },
      body:JSON.stringify(input)
    })  
    const data = await res.json()
    
    if (res.status === 200) {
      // toast.success(data.message);
      setSentEmail(true)
      dispatch({ type: "REMOVE_LOADING" })
    } else {
      toast.error(data.error.name || data.error.email || data.error.password || data.error.cpassword || data.error)
      dispatch({ type: "REMOVE_LOADING" })
    }
    // dispatch({ type: "REMOVE_LOADING" })
  }

  useEffect(() => {
    let  changeLoadingText1, changeLoadingText2, changeLoadingText3
    if (loading === true) {
      changeLoadingText1 = setTimeout(() => {
        setLoadingText("Wait a few more seconds")
      }, 10000)
      
      changeLoadingText2 = setTimeout(() => {
        setLoadingText("Seems Your Net Connection is slow😐")
      }, 20000)
      
      changeLoadingText3 = setTimeout(() => {
        setLoadingText("Sending an email to verify your account, wait till then😃")
      }, 25000)
      console.log(loading);
    } else if (loading === false) {
      setLoadingText("Loading...")
      console.log(loading);
    }
    
    return () => {
      clearTimeout(changeLoadingText1)
      clearTimeout(changeLoadingText2)
      clearTimeout(changeLoadingText3)
    }
    
  },[loading])

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={2000}      
      />
      {
      !loading ?
        <div className='regiser_container'>
        {
          sentEmail?
          <div className='sent_email'>
            <h1 style={{textAlign:'center'}}>Check The Email and<br/>Verify Your Account</h1>
            <img src="/successful.jpg" alt="success" />
          </div> :
          <div className="wrapper">
            <h1>Sign Up</h1>
            <form className='form' onSubmit={handleSubmit}>
              <input type="text" placeholder='Enter Fullname' value={input.name} name="name" onChange={handleChange} />
              <input type="text" placeholder='Enter Email' value={input.email} name="email" onChange={handleChange} />
              <input type="password" placeholder='Password' value={input.password} name="password" onChange={handleChange} />
              <input type="password" placeholder='Confirm Password' value={input.cpassword} name="cpassword" onChange={handleChange} />
              <input type='submit' className='submit_button'/>
            </form>
            <div className="account">
              <p>Already have a account? <Link to="/login">Login</Link></p>
            </div>
          </div>
        }
        </div> :
        <h1 style={{textAlign:'center'}}>{loadingText}</h1>
      }
    </>
  )
}

export default Registration