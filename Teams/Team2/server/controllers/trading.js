const config=require("../config.json");
const Alpaca = require('@alpacahq/alpaca-trade-api');
const dbAdapter=require("../db/createDBAdapter");
//const stripe = require('stripe')('your-secret-key-here');
const axios = require('axios');


const alpaca = new Alpaca({
    keyId: config.alpacaKeyId,
    secretKey:config.alpacaSecretKey,
    paper: true
  });


  const wiseApiKey='jjj'

const buyStockViaCreditCard= async (req, res) =>{
 
    const { userMail,symbol, quantity ,paymentMethodId} = req.body;
  
    try {
      

      // קבלת המחיר העדכני של המניה
      const latestTrade = await alpaca.getLatestTrade(symbol);
      const amountInDollars=latestTrade.Price*quantity
      const amountInCents = Math.round(amountInDollars * 100);

     // Create a PaymentIntent with the provided payment method
    const paymentIntent = await stripe.paymentIntents.create({
      amount:amountInCents , // Amount in cents
      currency: 'usd',
      payment_method: paymentMethodId,
     
    });


      await alpaca.createOrder({
        symbol: symbol,
        qty: quantity,
        side: 'buy',
        type: 'market',
        time_in_force: 'day'
      });
  
   
      dbAdapter.insertIntoTransactions(userMail,symbol,quantity,latestTrade.Price,'purchase')
    
      return res.status(200).json({message:"bought successfully"});
  
    } catch (error) {
      console.error(' error in purchase :', error);
      res.status(400).json({ error: error.message });
    }    

}


const buyStockViaBankTransfer= async (req, res) =>{
 
  const { userMail, symbol, quantity,recipientBankDetails } = req.body;


  try {
    
    // קבלת המחיר העדכני של המניה
   const latestTrade = await alpaca.getLatestTrade(symbol);

 // גביית תשלום מהלקוח
    //await axios.post('https://api.transferwise.com/v1/transfers', {
    //  amount: latestTrade.Price*quantity,
    //  currency:'USD' ,
    //  recipient: {
    //     name: recipientBankDetails.name,
    //     accountNumber: recipientBankDetails.accountNumber,
    //     routingNumber: recipientBankDetails.routingNumber,
    //     iban: recipientBankDetails.iban,
    //     swift: recipientBankDetails.swift,
    //     bankName: recipientBankDetails.bankName,
    //   }
    // }, {
    //   headers: {
    //     'Authorization': `Bearer ${wiseApiKey}`,
    //     'Content-Type': 'application/json'
    //   }
    // });

   const result= await alpaca.createOrder({
      symbol: symbol,
      qty: quantity,
      side: 'buy',
      type: 'market',
      time_in_force: 'day'
    });
   
 
 const response=await dbAdapter.insertIntoTransactions(userMail,symbol,quantity,latestTrade.Price,'purchase')

    return res.status(200).json({message:"bought successfully"});

  } catch (error) {
    console.error(' error in purchase :', error);
    res.status(400).json({ error: error.message });
  }    

}








async function sellStock(req, res) {
  const { userMail, symbol, quantity } = req.body;
  try {
      // Get the latest stock price
      const latestTrade = await alpaca.getLatestTrade(symbol);
      const currentPrice = latestTrade.Price;

      // Call the stored procedure and capture the return value
      const response = await dbAdapter.insertIntoTransactions(userMail, symbol, quantity, currentPrice, 'sale');
      console.log(response)
      if (response === 0) { // 0 means success
          // Proceed with selling the stock
          const result = await alpaca.createOrder({
              symbol: symbol,
              qty: quantity,
              side: 'sell',
              type: 'market',
              time_in_force: 'day'
          });

          return res.status(200).json({message:"sold successfully"});
      } else {
          //Handle case when stored procedure indicates failure
          return res.status(400).json({ error: 'Not enough shares to sell' });
      }
  } catch (error) {
      console.error('Error in sale:', error);
      res.status(400).json({ error: error.message });
  }
}


async function getUserReport(req,res) {
  try {
      // קריאה לפרוצדורה
      const {userMail}=req.params;
      const stocks = await dbAdapter.getUserReport(userMail);
      

    
      for (let stock of stocks) {
          const stockName = stock.stockName;
      

          // קריאה ל-Alpaca API כדי לקבל את המחיר הנוכחי של המניה
          const latestTrade = await alpaca.getLatestTrade(stockName);
          const currentPrice = latestTrade.Price;
          const currentValue=currentPrice*stock.currentQuantity
        

         
          stock.currentStockPrice = currentPrice;
          stock.currentValue = currentValue;
          
      }

     
      res.status(200).json(stocks) ;
  } catch (err) {
res.status(500).json("an error occoured")
  } 
}


const getCurrentPrice= async (req, res) =>{
 
  const {  symbol } = req.params;

  try {
      const latestTrade = await alpaca.getLatestTrade(symbol);
      const price = latestTrade.Price;
       res.status(200).json(price);
  }
  catch(error){
  console.error('error in calculate sum:', error);
  res.status(400).json({ error: error.message });
  }
}


module.exports={buyStockViaBankTransfer,getUserReport,buyStockViaCreditCard,getCurrentPrice,sellStock}