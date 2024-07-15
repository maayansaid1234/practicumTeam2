const ListItem = ({notification}) => {
    const tradingviewLink= `https://www.tradingview.com/symbols/NASDAQ-${notification.stockName}`;
    return ( <div>
        <h1>notification: </h1>
       <h2> Stock name: {notification.StockName}</h2>
       <h2>Notification type : {notification.NotificationType}</h2>
       <h2>Closing price : {notification.ClosingPrice}</h2>
       <h2>Volume : {notification.Volume}</h2>
      
        <a href={tradingviewLink} target="_blank">
        View {notification.StockName} on TradingView
        </a>
    </div> );
}
 
export default ListItem;