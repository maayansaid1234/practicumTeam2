import TransactionForm from "./TransactionForm";
import { useParams } from "react-router-dom";

const BuyStock = () => {
    const { symbol } = useParams();

    return (<>
    <h1>buy Stock : {symbol}</h1>
    <TransactionForm symbol={symbol} transactionType={"buy"}/> 
    </>
     );
}
 
export default BuyStock;