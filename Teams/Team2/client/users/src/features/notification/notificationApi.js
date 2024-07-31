import axios from "axios"

export  const getNotifications =(userMail)=>{
    return axios.get("http://localhost:3500/api/notifications/"+userMail);
}