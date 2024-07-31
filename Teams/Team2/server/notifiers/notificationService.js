const  WebSocketAdapter=require("./webSocketAdapter.js");
const MailAdapter=require("./mailAdapter.js")

class NotificationService  {
    constructor() {
        this.adapters = {
            webSocket: new WebSocketAdapter(),
            email: new MailAdapter()
        };
        
    }

    async sendNotification( UserMail, notification) 
    {
        Object.keys(this.adapters).forEach(async(type) => {
            
       
            try {
                await this.adapters[type].sendNotification(UserMail, notification);
                console.log(`Notification sent via ${type} to ${UserMail}. (via web socket only if connected)`);
            } catch (error) {
                console.error(`Failed to send ${type} notification:`, error);
            }
  
    });
    }
}


module.exports=NotificationService