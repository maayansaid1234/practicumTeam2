import TransactionForm from "./TransactionForm";
import { useParams } from "react-router-dom";

const SellStock = () => {
    const { symbol } = useParams();

    return (<>
    <h1>sell Stock : {symbol}</h1>
    <TransactionForm symbol={symbol} transactionType={"sell"}/>
    </>
     );
}
 
export default SellStock;