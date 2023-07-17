import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export function useAuthContext(){
    const context = useContext(AuthContext);
    if(!AuthContext){
        throw Error('UseAuthContextMust be used inside an AuthContextProvider')
    }
    return context;
}