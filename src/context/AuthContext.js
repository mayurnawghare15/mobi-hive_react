import React, { useEffect, createContext, useReducer } from 'react';

export const AuthContext = createContext();

export function authReducer(state, action) {
    switch (action.type) {
        case 'LOGIN':
            return { user: action.payload };
        case 'LOGOUT':
            return { user: null };
        default:
            return state;
    }
}

export function AuthContextProvider({ children }) {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    });
    console.log('Authcontext state :', state);
    useEffect(() => {
        let user = localStorage.getItem('user') ? localStorage.getItem('user') : "";
        if (user.trim() !== '') {
            user = JSON.parse(user)
            dispatch({ type: 'LOGIN', payload: user });
        }
        else {
            dispatch({ type: 'LOGOUT' });
        }
    }, []);

    return <AuthContext.Provider value={{ ...state, dispatch }}>{children}</AuthContext.Provider>;
}
