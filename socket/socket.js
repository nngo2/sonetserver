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
						this.io.emit(`add-message-response`,data);
					} catch (error) {
						this.io.to(socket.id).emit(`add-message-response`,{
							error : true
						}); 
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