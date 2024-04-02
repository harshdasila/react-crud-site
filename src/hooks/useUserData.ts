import { useEffect } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { userState } from "../state/UserDataState";
import { UserStateDataTwo } from "../interfaces";

export const useUserData = () => {
  const [userStateData, setUserStateData] = useRecoilState<any>(userState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/me", {
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
          },
        });
        // const stateData = {
        //     id: response?.data?.user_id,
        //     role_id: response?.data?.user_role
        // }
        setUserStateData(response?.data?.stateData);
      } catch (error) {
        throw new Error("Error in fetching user state data.");
      }
    };

    // Call the fetchData function only when the component mounts
    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array ensures this effect runs only once on mount
};
