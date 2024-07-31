const  config= require('../config.json');
const nodemailer = require('nodemailer');
const NotifierAdapter = require('./notifierAdapter');


class MailAdapter extends NotifierAdapter {

    constructor() {
   
        super();
         this.transporter = nodemailer.createTransport(
            {
                service: 'gmail',
                auth: {
                  user: config.mailDetails.mailAddress,
                  pass: config.mailDetails.appPassword,
                }
              }
         );
        this.myEmailAddress= config.mailDetails.address;
        
    }



 sendNotification(mailAddress,notification){
    let message=
    `Stock : ${notification.StockName},
     Notification Type : ${notification.NotificationType},
     Closing Price : ${notification.ClosingPrice},
     Volume : ${notification.Volume}`
    

    console.log("email sent succesfully-mailAdpater")
    let mailOptions = {
        from: this.myEmailAddress, // כתובת השולח ב-ProtonMail
        to: mailAddress, // כתובת המקבל
        subject: ' A new notification for you !', // נושא המייל
        text: message, // תוכן המייל בטקסט רגיל
        html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
            <div style="padding: 20px; border: 2px solid #ff9800; background-color: #fff3cd; border-radius: 5px;">
                <h2 style="color: #ff9800; text-align: center;">
                    ⚠️ New Notification Detected! ⚠️
                </h2>
                <p style="font-size: 16px;text-align:center;">
                    <strong>${message}</strong>
                </p>
                <p style="text-align: center; margin-top: 20px;">
                    <a href="https://www.tradingview.com/symbols/NASDAQ-${notification.StockName}" style="padding: 10px 20px; background-color: #ff9800; color: #fff; text-decoration: none; border-radius: 5px;">
                        View Stock
                    </a>
                </p>
            </div>
        </div>
    `,
};
    this.transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });
}

}


module.exports=MailAdapter