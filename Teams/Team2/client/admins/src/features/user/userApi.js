import axios from "axios"

export  const login =(userMail)=>{
    console.log(userMail);
    return axios.post("http://localhost:3500/api/users/login",userMail);
  
}