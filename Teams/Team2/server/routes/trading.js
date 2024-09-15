const express = require("express");
const {buyStockViaCreditCard,sellStock,getUserReport,buyStockViaBankTransfer,getCurrentPrice} =require("../controllers/trading.js"); 


const router = express.Router();



router.post("/buyStockViaCreditCard",buyStockViaCreditCard);
router.post("/buyStockViaBankTransfer",buyStockViaBankTransfer);
router.post("/sellStock",sellStock);
router.get("/currentPrice/:symbol",getCurrentPrice);
router.get("/getReport/:userMail",getUserReport);


module.exports=  router;