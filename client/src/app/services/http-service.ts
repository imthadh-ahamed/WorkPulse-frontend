import axios from "axios";
import Cookies from "js-cookie"; 


const token = Cookies.get("token");
const cleanToken = token?.replace(/^"|"$/g, "");

const axoisInstance = axios.create({
  baseURL: "http://localhost:8081/api",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    ...(cleanToken && { Authorization: `Bearer ${cleanToken}` }), 
  },
});

export default axoisInstance;
