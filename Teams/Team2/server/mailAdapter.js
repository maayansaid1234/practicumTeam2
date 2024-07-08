// const nodemailer = require('nodemailer');

// // let emailAddress=process.env.MAILADDRESS ;

// let emailAddress="miriToledano@proton.me";

// // let password=process.env.PASSWORD ;
// let password="mt121212*" ;

// // יצירת טרנספורטר עם פרטי ההתחברות לשרת המייל
// let transporter = nodemailer.createTransport({
//     service: 'smtp',
//     // host: 'smtp.gmail.com', // הכתובת של שרת המייל שלך
//     // port: 587, // הפורט של שרת המייל (587 לשימוש ב-TLS)
//     // secure: false, // true לשימוש ב-SSL, false לשימוש ב-TLS
//     auth: {
//         user: emailAddress, // האימייל שלך
//         pass: password // הסיסמה שלך
//     }
// });

// // הגדרת המייל לשליחה
// let mailOptions = {
//     from: emailAddress, // כתובת השולח
//     to: 'miriToledano@proton.me', // כתובת המקבל
//     subject: 'Hello', // נושא המייל
//     text: 'Hello world?', // תוכן המייל בטקסט רגיל
//     html: '<b>Hello world?</b>' // תוכן המייל ב-HTML (אופציונלי)
// };

// // שליחת המייל
// transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//         return console.log(error);
//     }
//     console.log('Message sent: %s', info.messageId);
//     // Preview URL: %s
//     console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
// });





// const nodemailer = require('nodemailer');

// let emailAddress = 'miriToledano@proton.me'; // כתובת האימייל שלך ב-ProtonMail
// let password = 'mt121212*'; // הסיסמה שלך ל-ProtonMail

// // יצירת טרנספורטר עם פרטי ההתחברות לשרת המייל של ProtonMail
// let transporter = nodemailer.createTransport({
//     service: 'smtp',
//     // host: 'smtp.protonmail.com',
//     // port: 465,
//     // secure: true, // לשימוש ב-SSL
//     auth: {
//         user: emailAddress, // האימייל שלך ב-ProtonMail
//         pass: password // הסיסמה שלך
//     }
// });

// // הגדרת המייל לשליחה
// let mailOptions = {
//     from: emailAddress, // כתובת השולח ב-ProtonMail
//     to: 'miriToledano@proton.me', // כתובת המקבל
//     subject: 'Hello', // נושא המייל
//     text: 'Hello world?', // תוכן המייל בטקסט רגיל
//     html: '<b>Hello world?</b>' // תוכן המייל ב-HTML (אופציונלי)
// };

// // שליחת המייל
// transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//         return console.log(error);
//     }
//     console.log('Message sent: %s', info.messageId);
//     console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
// });



const nodemailer = require('nodemailer');
const NotificationAdapter = require('./notificationAdapter');

class MailAdapter extends NotificationAdapter {

    constructor(config) {
        super();
        this.transporter = nodemailer.createTransport(config);
        this.myEmailAddress= process.env.MAILADDRESS;
        this.password = process.env.PASSWARD
    }






// {           config
//     host: 'smtp.protonmail.com', // כתובת ה-IP של שרת ה-SMTP של ProtonMail
//     port: 465, // פורט עבור SSL
//     secure: false, // לשימוש ב-SSL
//     auth: {
//         user: emailAddress, // האימייל שלך ב-ProtonMail
//         pass: password // הסיסמה שלך
//     },
//     tls: {
//         rejectUnauthorized: false
//       }
// }





 send(mailsAddress,notification){
    let message=`StockName : ${notification.StockName},
    NotificationType : ${notification.NotificationType},
     ClosingPrice : ${notification.ClosingPrice},
     Volume : ${notification.Volume},
    `

    console.log(message)
    // let mailOptions = {
    //     from: myEmailAddress, // כתובת השולח ב-ProtonMail
    //     to: mailsAddress, // כתובת המקבל
    //     subject: 'new notification for you !', // נושא המייל
    //     text: message, // תוכן המייל בטקסט רגיל
    //     // html: '<b>Hello world?</b>' // תוכן המייל ב-HTML (אופציונלי)
    // };
    // transporter.sendMail(mailOptions, (error, info) => {
    //     if (error) {
    //         return console.log(error);
    //     }
    //     console.log('Message sent: %s', info.messageId);
    //     console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    // });
}

}


module.exports=MailAdapter