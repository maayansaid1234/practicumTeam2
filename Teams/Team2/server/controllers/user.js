const config=require("../config.json");
const usersSystem=require(`../usersSystemAdapters/usersSystemFrom${config.usersSystemAdapter.type}Adapter.js`)
const usersSystemAdapter=new usersSystem();

const login= async (req, res) =>{
    try{
        let { userMail } = req.body;
        let user= await usersSystemAdapter.login(userMail);
     
        if(user){
            return res.status(200).json(user);
        }
        else{
            return res.status(404).json("not found");
        }
       
    }
   
catch{
    return res.status(500).json("An error occurred while fetching the data from the Server");
}
    

}

module.exports={login}