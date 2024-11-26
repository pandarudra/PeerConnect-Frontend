import axios from "axios";
import { url } from "../config";

export const refToken = async () => {
  try {
    const res = await axios.post(
      `${url}/api/ref`,
      {},
      {
        withCredentials: true,
      }
    );
    const { token } = res.data;
    localStorage.setItem("token", token);
    return token;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
