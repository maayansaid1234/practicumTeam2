import axios from "axios"

export  const getNotifications =()=>{
    return axios.get("http://localhost:3500/api/notifications");
}