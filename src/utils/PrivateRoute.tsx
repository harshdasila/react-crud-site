
import { Navigate, Outlet } from 'react-router-dom';


const PrivateRoutes = () => {
    const jwtToken: string = localStorage.getItem('jwtToken') || "";
    
  return (
    (!jwtToken || jwtToken=="" || !jwtToken.startsWith("Bearer ")) ? <Navigate to={"/signin"}/> : <Outlet/> 
        
  )
}

export default PrivateRoutes