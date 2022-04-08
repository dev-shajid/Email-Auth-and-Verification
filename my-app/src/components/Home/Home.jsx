import React from 'react'
import './Home.scss'
import Nav from '../Nav'
import { useContextHook } from '../../context/ContextProvider'

const Home = () => {
  const {name, loading} = useContextHook()
  return (
    <>
      {
        !loading ?
        <>      
          <Nav/>
          <div className="home_container">
            <h1>Welcome {name}</h1>
          </div>
        </> :
        <h1 style={{textAlign:'center'}}>Loading...</h1>
      }
    </>
  )
}

export default Home