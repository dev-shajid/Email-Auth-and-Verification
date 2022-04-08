import { useContextHook } from '../../context/ContextProvider'

const useAuth = () => {    
    const {dispatch} = useContextHook()

    const getUser = async () => {
        dispatch({type:"ADD_LOADING"})
        const res = await fetch('/api/auth', {
            method: "get",
            headers: {
                'token':localStorage.getItem('jsonwebtoken')
            }
        })
        const data= await res.json()
        if (res.status === 200) {
            dispatch({type:"ADD_USER", payload:data.name})
        } else if (res.status === 401) {
            dispatch({type:"REMOVE_USER"})
        }
        setTimeout(()=>dispatch({type:"REMOVE_LOADING"}),500)
    }

  return {getUser}
}

export default useAuth