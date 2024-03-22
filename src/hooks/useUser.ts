import { useEffect, useState } from "react";
import axios from "axios";
const jwtToken = localStorage.getItem('jwtToken');

export const useUser = () => {
    const [userData,setUserData] = useState(null);
    const [loading,setLoading] = useState(true);

    async function getUserData(){
        try{
           
            const res = await axios.get("http://localhost:3001/user/list",{
                method: "GET",
                headers: {
                    "Authorization": jwtToken
                }
            })
            setUserData(res.data);
            setLoading(false);
        }
        catch(error){
            throw new Error("cant get auth token")
        }
    }

    useEffect(()=>{
        getUserData();
    },[])

    return {userData,loading};
}