// const config = require('../config.json');
// const nodemailer = require('nodemailer');
// const NotifierAdapter = require('./notifierAdapter');
// const say = require('say');
// const fs = require('fs');

// class MailAdapter extends NotifierAdapter {
//     constructor() {
//         super();
//         this.transporter = nodemailer.createTransport({
//             service: 'gmail',
//             auth: {
//                 user: config.mailDetails.mailAddress,
//                 pass: config.mailDetails.appPassword,
//             }
//         });
//         this.myEmailAddress = config.mailDetails.mailAddress;
//     }

//     sendNotification(mailAddress, notification) {
//         let message = `Stock: ${notification.stockName},
//            Notification Type: ${notification.notificationType},
//             Closing Price: ${notification.closingPrice},
//                          Volume: ${notification.volume}`;

//         const htmlContent = `
//         <div style="font-family: Arial, sans-serif; color: #333;">
//             <div style="padding: 20px; border: 2px solid #ff9800; background-color: #fff3cd; border-radius: 5px;">
//                 <h2 style="color: #ff9800; text-align: center;">
//                     ⚠️ New Notification Detected! ⚠️
//                 </h2>
//                 <p style="font-size: 16px;text-align:center;">
//                     <strong>${message}</strong>
//                 </p>
//                 <p style="text-align: center; margin-top: 20px;">
//                     <a href="https://www.tradingview.com/symbols/NASDAQ-${notification.stockName}" style="padding: 10px 20px; background-color: #ff9800; color: #fff; text-decoration: none; border-radius: 5px;">
//                         View Stock
//                     </a>
//                 </p>
//             </div>
//         </div>
//         `;

//         this.convertTextToAudio(message, (err, audioPath) => {
//             if (err) {
//                 console.error('Error converting text to audio:', err);
//                 return;
//             }

//             const mailOptions = {
//                 from: this.myEmailAddress,
//                 to: mailAddress,
//                 subject: 'A new notification for you!',
//                 text: message,
//                 html: htmlContent,
//                 attachments: [{
//                     filename: 'notification-audio.wav',
//                     path: audioPath
//                 }]
//             };

//             this.transporter.sendMail(mailOptions, (error, info) => {
//                 if (error) {
//                     console.error('Error sending email:', error);
//                 } else {
//                     console.log('Email sent successfully:', info.response);
//                     fs.unlinkSync(audioPath); // Delete the audio file after sending
//                 }
//             });
//         });

//         console.log("Email sent successfully - mailAdapter");
//     }

//     convertTextToAudio(text, callback) {
//         const audioPath = `notification-audio-${Date.now()}.wav`;
//         say.export(text, 'Microsoft David Desktop', 1, audioPath, (err) => {
//             if (err) {
//                 return callback(err);
//             }
//             callback(null, audioPath);
//         });
//     }
// }

// module.exports = MailAdapter;









const config = require('../config.json');
const nodemailer = require('nodemailer');
const NotifierAdapter = require('./notifierAdapter');
const say = require('say');
const fs = require('fs');

class MailAdapter extends NotifierAdapter {
    constructor() {
        super();
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: config.mailDetails.mailAddress,
                pass: config.mailDetails.appPassword,
            }
        });
        this.myEmailAddress = config.mailDetails.address;
    }

    sendNotification(mailAddress, notification) {
        let notificationDetails = `Stock: ${notification.stockName},
Notification Type: ${notification.notificationType},
Closing Price: ${notification.closingPrice},
Volume: ${notification.volume}`;

        let audioMessage = `Hello, dear user. 
This is a notification detected by our system that matches your settings. 
Here are the details:
${notificationDetails}`;

        const htmlContent = `
        <div style="font-family: Arial, sans-serif; color: #333;">
            <div style="padding: 20px; border: 2px solid #ff9800; background-color: #fff3cd; border-radius: 5px;">
                <h2 style="color: #ff9800; text-align: center;">
                    ⚠️ New Notification Detected! ⚠️
                </h2>
                <p style="font-size: 16px;text-align:center;">
                    <strong>${notificationDetails}</strong>
                </p>
                <p style="text-align: center; margin-top: 20px;">
                    <a href="https://www.tradingview.com/symbols/NASDAQ-${notification.stockName}" style="padding: 10px 20px; background-color: #ff9800; color: #fff; text-decoration: none; border-radius: 5px;">
                        View Stock
                    </a>
                </p>
            </div>
        </div>
        `;

        this.convertTextToAudio(audioMessage, (err, audioPath) => {
            if (err) {
                console.error('Error converting text to audio:', err);
                return;
            }

            const mailOptions = {
                from: this.myEmailAddress,
                to: mailAddress,
                subject: 'A new notification for you!',
                text: audioMessage,
                html: htmlContent,
                attachments: [{
                    filename: 'notification-audio.wav',
                    path: audioPath
                }]
            };

            this.transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error('Error sending email:', error);
                } else {
                    console.log('Email sent successfully:', info.response);
                    fs.unlinkSync(audioPath); // Delete the audio file after sending
                }
            });
        });

        console.log("Email sent successfully - mailAdapter");
    }

    convertTextToAudio(text, callback) {
        const audioPath = `notification-audio-${Date.now()}.wav`;
        say.export(text, 'Microsoft David Desktop', 1, audioPath, (err) => {
            if (err) {
                return callback(err);
            }
            callback(null, audioPath);
        });
    }
}

module.exports = MailAdapter;