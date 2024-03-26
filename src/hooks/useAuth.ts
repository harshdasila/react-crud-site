import axios from "axios";

export const useAuth = (setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>) => {

  const jwtToken = localStorage.getItem("jwtToken");
  if (!jwtToken || jwtToken == "" || !jwtToken.startsWith("Bearer")) {
    return false;
  }
  async function validateToken(jwtToken: string) {
    try {
      const response = await axios.post("http://localhost:3001/auth/validate", {
        token: jwtToken,
      });
      if(response.status===200){
        console.log("yaha")
        setAuthenticated(true)
      }
      else{
        setAuthenticated(false)
      }
    } catch (error) {
        setAuthenticated(false)
    }
  }
  validateToken(jwtToken);
};
