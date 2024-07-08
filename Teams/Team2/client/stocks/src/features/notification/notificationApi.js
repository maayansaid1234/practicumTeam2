import axios from "axios"

export  const getNotificationsByUser =(body)=>{
    return axios.get("http://localhost:3500/api/notifications/"+body);
}