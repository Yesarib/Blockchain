const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const blockRoutes = require('./Routes/BlockRoutes.js');
const transactionRoutes = require('./Routes/TransactionRoutes.js');
const BlockchainModel = require('./Modules/BlockchainMode.js');
const GenesisBlock = require('./Blockchain/GenesisBlock.js');
const serverBlockchain = require('./server.js');
const walletRoutes = require('./Routes/Wallet.js')

dotenv.config();

const app = express();
// const server = createServer(app); 
// const socketio = new SocketIOServer(server);

app.use(express.json());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

serverBlockchain();


app.use('/', blockRoutes);
app.use('/transaction', transactionRoutes);
app.use('/wallet', walletRoutes);





// socketio.on('connection', (socket) => {
//     console.log('A miner has connected:', socket.id);

//     socket.on('clientMessage', (data) => {
//         console.log('Data from miner:', data);

        
//     });

//     socket.emit('message', 'Yoo');

//     socket.on('disconnect', () => {
//         console.log('A miner has disconnected:', socket.id);
//     });
// });





mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'Blockchain',
})
.then(async () => {

    const Port = process.env.PORT || 5000;
    app.listen(Port, () => console.log(`Server on : ${Port}`));

    const blocks = await BlockchainModel.find();
    if (blocks.length === 0) {
        const genesisBlock = new GenesisBlock();
        const savedGenesisBlock = BlockchainModel({
            block: genesisBlock
        });
        await savedGenesisBlock.save();
        console.log('Genesis block inserted.');
    }
})
.catch((err) => console.log(`${err} did not connect`));