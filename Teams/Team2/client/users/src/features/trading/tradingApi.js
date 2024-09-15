import axios from "axios"

const baseUrl="http://localhost:3500/api/trading"

export  const getCurrentPrice =(symbol)=>{
    return axios.get(baseUrl+"/currentPrice/"+symbol);
}

export  const buyStockViaBankTransfer =(userMail,symbol,quantity,recipientBankDetails)=>{
    return axios.post(baseUrl+"/buyStockViaBankTransfer",
        {userMail,quantity,symbol,recipientBankDetails});
}
export  const buyStockViaCreditCard =(userMail,symbol,quantity,paymentMethodId)=>{
    return axios.post(baseUrl+"/buyStockViaCreditCard",
        {userMail,quantity,symbol,paymentMethodId});
}

export  const sellStock =(userMail,symbol,quantity)=>{
    return axios.post(baseUrl+"/sellStock",
        {userMail,quantity,symbol});
}


export  const getUserReport =(userMail)=>{
    return axios.get(baseUrl+"/getReport/"+userMail,
       );
}