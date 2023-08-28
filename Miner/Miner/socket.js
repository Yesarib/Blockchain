const io = require('socket.io-client')

class Socket {
    constructor() {
        this.socket = io('http://localhost:8000');
        
        this.socket.on('connect', () => {
            console.log('Socket connected:', this.socket.id);
        });
        
        this.socket.on('disconnect', () => {
            console.log('Socket disconnected:', this.socket.id);
        });
    }

    emitNewBlockMined(minerId, block) {
        this.socket.emit('newBlockMined', minerId, block);
        // console.log(block);
    }

    close() {
        this.socket.close();
    }
}

module.exports = Socket; 
