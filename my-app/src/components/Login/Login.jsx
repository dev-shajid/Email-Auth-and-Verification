import React from 'react'
import { Link } from 'react-router-dom'
import { useContextHook } from '../../context/ContextProvider'
import '../Registration/Registration.scss'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const {loading, dispatch} = useContextHook()
  const [input, setInput] = React.useState({ email: '', password: '' })

  const handleChange = (e) => {
    setInput({...input, [e.target.name]:e.target.value})  
  }

  const handleSubmit = async (e) => {
    // dispatch({type:"ADD_LOADING"})
    e.preventDefault()
    const res = await fetch('/api/login', {
      method: "post",
      headers: {
        "Content-Type":"application/json"
      },
      body:JSON.stringify(input)
    })  
    const data = await res.json()
    if (res.status === 200) {
      localStorage.setItem('jsonwebtoken', data.token)
      toast.success(data.message);
      setTimeout(()=>dispatch({type:"ADD_USER", payload:data.name}),2000)
    } else {
      toast.error(data.error)
    }
    // dispatch({ type: "REMOVE_LOADING" })
  }

  return <>
    <ToastContainer
      position="top-center"
      autoClose={2000}      
    />
    {
      !loading ? 
      <div className='regiser_container'>
        <div className="wrapper">
          <h1>Login</h1>
          <form className='form' onSubmit={handleSubmit}>
            <input type="text" placeholder='Enter Email' value={input.email} name="email" onChange={handleChange} />
            <input type="password" placeholder='Password' value={input.password} name="password" onChange={handleChange} />
            <input type='submit' className='submit_button'/>
          </form>
          <div className="account">
            <p>Don't have any account? <Link to="/signup">Sign Up</Link></p>
          </div>
        </div> 
      </div>
      :
      <h1 style={{textAlign:'center'}}>Loading...</h1>
        
    }
  </>
}

export default Login