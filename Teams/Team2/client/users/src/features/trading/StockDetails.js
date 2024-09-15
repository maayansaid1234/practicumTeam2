const StockDetails = ({ item }) => {
    return (
        <>
            <div>
                <h3>{item.stockName}</h3>
                <p>Current Quantity: {item.currentQuantity}</p>
                <p>Total Investment: ${item.totalInvestment.toFixed(2)}</p>
                <p>Total Revenue: ${item.totalRevenue.toFixed(2)}</p>
                <p>Current Stock Price: ${item.currentStockPrice.toFixed(2)}</p>
                <p>Current Value: ${item.currentValue.toFixed(2)}</p>
            </div>
        </>
    );
}

export default StockDetails;
