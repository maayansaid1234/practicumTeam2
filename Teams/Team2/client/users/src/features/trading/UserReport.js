import { useEffect, useState } from "react";
import { getUserReport } from './tradingApi';
import StockDetails from "./StockDetails";
import { useSelector } from "react-redux";

const UserReport = () => {
    let [arr,setArr]=useState([]);
    const userMail = useSelector(st => st.user.currentUser?.userMail);

    const getReport= async()=>{
        try{
               const res=await getUserReport(userMail);
               setArr(res.data);
           }
        
           catch (err) {
            console.log(err);
        }
        }
    useEffect(()=>{  getReport();   },[]);
 
       
    return ( <>
    <div className="notifications-page">
            <h1 className="notification-page-title">Status Report</h1>
           
            <ul className="notifications-list">
                {arr.map((item, index) => (
                    <li key={index}>
                        <StockDetails item={item} />
                    </li>
                ))}
            </ul>
        </div>
    </> );
}
 
export default UserReport;