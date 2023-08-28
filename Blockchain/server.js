const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const Blockchain = require('./Blockchain/Blockchain');
const validateBlock = require('./ValidateBlock.js')

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const serverBlockchain = () => {
    const blockchain = new Blockchain();

    app.get('/', (req, res) => {
        res.sendFile(__dirname + '/index.html');
    });

    io.on('connection', (socket) => {
        console.log('Bir kullanıcı bağlandı.');

        socket.on('newBlockMined', async (minerId, block) => {
            
            // Diğer madencilere dağıtma

            if (validateBlock(block)) {
                blockchain.newBlock(block);

                io.emit('newBlock', block);

                console.log(`Miner ${minerId} tarafından yeni bir blok eklendi:`, block);
            } else {
                console.log(`Miner ${minerId} tarafından gelen blok geçersiz:`, block);
            }
            
        });

        // socket.on('disconnect', () => {
        //     console.log('Bir kullanıcı ayrıldı.');
        // });

    });

    server.listen(8000, () => {
        console.log('Sunucu dinleniyor: http://localhost:8000');
    });
};

module.exports = serverBlockchain;
