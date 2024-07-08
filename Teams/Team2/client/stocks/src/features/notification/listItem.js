const ListItem = ({notification}) => {
    const tradingviewLink= `https://www.tradingview.com/symbols/NASDAQ-${notification.stockName}`;
    return ( <div>
       <h1>{notification.stockName}</h1>
       <h1>{notification.notificationName}</h1>
        <a href={tradingviewLink} target="_blank">
        View {notification.stockName} on TradingView
        </a>
    </div> );
}
 
export default ListItem;