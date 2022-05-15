
import axios from "axios";
import { createContext,useContext, useEffect, useState} from "react";
import { useLocation } from "react-router-dom";

export const Context = createContext();

const ContextProvider =({children}) =>{
const [user, setUser] = useState();

const [deleted, setDeleted] = useState(false)
const [write, setWrite] = useState(false)
const [edit, setEdit] = useState(false)
const [cat, setCat] = useState("");


useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);
}, [])



    return < Context.Provider value={{user,setUser,setEdit,setWrite,setDeleted,cat, setCat}}>{children}</Context.Provider>
    

}

export const ContextState = () =>{
    return useContext(ContextProvider);
}


export default ContextProvider;