const WebSocket = require('ws');
const NotificationAdapter = require('./notificationAdapter');



class WebSocketAdapter extends NotificationAdapter {
    constructor() {
        super();
        this.clients = {};
        this.startServer();
    }

    startServer() {
        this.server = new WebSocket.Server({ port: 8080 });

        this.server.on('connection', (socket) => {
            socket.on('message', (email) => {
                try {
                    
                    if ( email) {
                        this.clients[email] = socket;
                        socket.email = email;
                        console.log(`Connected to WebSocket server for ${email}`);
                    }
                } catch (error) {
                    console.error('Invalid message format:', error);
                }
            });

            socket.on('close', () => {
                if (socket.email) {
                    delete this.clients[socket.email];
                    console.log(`Disconnected from WebSocket server for ${socket.email}`);
                }
            });

            socket.on('error', (err) => {
                console.error('WebSocket error:', err);
            });
        });

        console.log('WebSocket server is running on ws://localhost:8080');
    }

    async sendNotification(email, notification) {
        console.log('Current clients:', Object.keys(this.clients).join(', '));

        if (email in this.clients) {
            console.log(`Email ${email} found in WebSocket clients.`);
            const client = this.clients[email];
            if (client.readyState === WebSocket.OPEN) {
                console.log(`WebSocket is open for ${email}, sending message.`);
                client.send(JSON.stringify(notification), (err) => {
                    if (err) {
                        console.error(`WebSocket send error for ${email}`, err);
                    } else {
                        console.log(`WebSocket message sent successfully to ${email}`);
                    }
                });
            } else {
                console.error(`WebSocket is not open for ${email}. Ready state: ${client.readyState}`);
            }
        } else {
            console.error(`Email ${email} not found in WebSocket clients.`);
        }
    }
}
module.exports=WebSocketAdapter;