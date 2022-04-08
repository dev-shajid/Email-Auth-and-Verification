import {Routes, Route} from 'react-router-dom'
import Home from './components/Home/Home'
import Login from './components/Login/Login'
import Registration from './components/Registration/Registration'
import Verification from './components/Verification/Verification'
import Error from './components/Error/Error'
import {PrivateRoute, RouteLinks} from './components/AuthRoute/PrivateRoute'

function App() {
  
  return (
    <>
    <div className="App">
      <Routes>
        <Route element={<RouteLinks/>}>
          <Route path='/signup' element={<Registration/>}/>
          <Route path='/login' element={<Login/>}/>
        </Route>
        <Route element={<PrivateRoute/>}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path='/user/:id/verify/:token' element={<Verification />} />
        <Route path='*' element={<Error/>}/>
      </Routes>
    </div>
    </>
  );
}

export default App;
