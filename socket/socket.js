'use strict';

const path = require('path');
const userController = require('../controllers/userController');

class Socket{

	constructor(socket){
		this.io = socket;
	}
	
	socketEvents(){
		this.io.on('connection', (socket) => {
			socket.on(`add-message`, async (data) => {
					try{
					    if(data && data.toUserId){
                            const socketResult = await userController.getUserSocketId(data.toUserId);
                            this.io.to(socketResult.status.socketId).emit(`add-message-response`,data);
                        }
					} catch (error) {
						this.io.to(socket.id).emit(`add-message-response`,{
						}); 
					}
			});

            socket.on('logout', async (data)=>{
                try {
                    const userId = data.userId;
                    await userController.disConnectUser({userId: userId});
                }catch (e) {
                }
            });

		});
	}
	
	socketConfig(){
		this.io.use( async (socket, next) => {
			console.log(socket.request);
			try {
			    await userController.addUserSocket({userId: socket.request._query['userId'], socketId: socket.id});
				next();
			} catch (error) {
          	}
          });

		this.socketEvents();
	}
}
module.exports = Socket;