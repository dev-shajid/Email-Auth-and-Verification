import React  from 'react';
import { createContext, useContext, useReducer } from "react";
import Reducer from './Reducer'
  
let initialState = {
    user: false,
    name: null,
    loading:false,
}

const Context = createContext()

export const useContextHook = () => {
    return useContext(Context)
}

export const ContextProvider = ({ children }) => {
    const [state,dispatch] = useReducer(Reducer, initialState)
    
    return (
        <Context.Provider
            value={{
                user: state.user,
                name: state.name,
                loading: state.loading,
                dispatch
            }}
        >
            {children}
        </Context.Provider>
    )
}