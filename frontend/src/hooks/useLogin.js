import {useAuthContext} from './useAuthContext'

import { useState } from 'react'

export const useLogin = () => {
    const [error, SetError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const {dispatch} = useAuthContext()

    const login = async(email, password) => {
        setIsLoading(true)
        SetError(null)

        const response = await fetch('api/user/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        })

        const json = await response.json()

        if(!response.ok){
            setIsLoading(false)
            SetError(json.error)
        }
        if(response.ok){
              //save the user to local storage
              localStorage.setItem('user', JSON.stringify(json))

              //update the auth context
              dispatch({type: 'LOGIN', payload: json})

              setIsLoading(false)
        }
    }
    return{login, isLoading, error}
}

