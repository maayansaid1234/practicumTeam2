import { Link } from 'react-router-dom';

const ListItem = ({ notification }) => {
  const navigateToSellStock = `/sellStock/${notification.stockName}`;
  const navigateToBuyStock = `/buyStock/${notification.stockName}`;
  const tradingviewLink = `https://www.tradingview.com/symbols/NASDAQ-${notification.stockName}`;

  return (
    <div className="notification-container">
      <h1 className="notification-title">Notification:</h1>
      <h2 className="notification-stock-name">Stock name: {notification.stockName}</h2>
      <h2 className="notification-type">Notification type: {notification.notificationType}</h2>
      <h2 className="notification-closing-price">Closing price: {notification.closingPrice}</h2>
      <h2 className="notification-volume">Volume: {notification.volume}</h2>
      <a className="notification-link" href={tradingviewLink} target="_blank" rel="noopener noreferrer">
        View {notification.stockName} on TradingView
      </a>
      <br />
      <div id="linksDiv">
      <Link  to={navigateToBuyStock}>Buy Stock</Link>
      <br/>
      <Link to={navigateToSellStock}>Sell Stock</Link>
      </div>
    </div>
  );
};

export default ListItem;
