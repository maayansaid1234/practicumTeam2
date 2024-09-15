import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { getCurrentPrice } from "./tradingApi";
import './transactionForm.css'; 
import { useDispatch,useSelector } from "react-redux";
import { buyStockViaBankTransfer,buyStockViaCreditCard,sellStock } from './tradingApi';
import {  saveCurrentTransactionDetails } from "./tradingSlice";

const TransactionForm = ({symbol,transactionType}) => {
  const userMail=useSelector(st=>st.user.currentUser?.userMail)
  const navigate=useNavigate()
  const dispatch=useDispatch();
  const [price, setPrice] = useState(null);

  const { register, handleSubmit, watch, setValue } = useForm();
  const quantity = watch("quantity", 0); 

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const res = await getCurrentPrice(symbol);
        setPrice(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPrice();
  }, [symbol]);

  const onSubmit = async(data) => {
    dispatch(saveCurrentTransactionDetails({
      quantity:data.quantity,
    userMail,
  symbol}))
  try{

 
    if(transactionType=="buy"){
    const res=await buyStockViaBankTransfer(userMail,symbol,data.quantity);
    alert("bought successfully")
    }
   else{
    const res=await sellStock(userMail,symbol,data.quantity);
         alert("sold successfully")
     }
    }
     catch(err){
        console.log(err)
        alert(err.response?.data?.error||'Sorry,an error occoured.')
        }
  };

  return (
    <div className="transaction-container">
      
      <form onSubmit={handleSubmit(onSubmit)} className="transaction-form">
        <div className="form-group">
          <label htmlFor="quantity">Quantity:</label>
          <input
            id="quantity"
            type="number"
            {...register("quantity", { required: true, min: 1 })}
            placeholder="Enter quantity"
          />
        </div>
        {price && (
          <h3>
            sum: ${(price * quantity).toFixed(2)}
          </h3>
        )}
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
};

export default TransactionForm;
