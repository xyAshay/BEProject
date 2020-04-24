const WebSocket = require('ws');
const Blockchain = require('./chain');

const Nexa = new Blockchain();

const p2pNode = function(_port) {
    let p2pNodes = [];

    function init(){
        const socketServer = new WebSocket.Server({ port : _port});

        socketServer.on('connection',(connection) => {
            console.log('New Incoming Connection Received.');
            initConnection(connection);
        });
    }

    const addPeer = (_host,_port) => {
        const connection = new WebSocket(`ws://${_host}:${_port}`);
        console.log(`Adding New Peer : ws://${_host}:${_port}`);
        connection.on('error', (err) => console.error(err));
        connection.on('open', () => initConnection(connection));
    }

    const closeConnection = (connection) => {
        console.log('Terminated Connection');
        p2pNodes.splice(p2pNodes.indexOf(connection),1);
    }

    const broadcastMessage = (event, message) => {
        p2pNodes.forEach(node => {
            node.send(JSON.stringify({ event, message }));
        });
    }

    const startListener = (connection) => {
        connection.on('message', (data) => {
            const msg = JSON.parse(data);
            switch (msg.event) {
                case 'REQUEST_CHAIN':
                    connection.send(JSON.stringify({event : 'CHAIN', message : Nexa.chain}));
                    break;
                case 'REQUEST_BLOCK':
                    requestLatestBlock(connection);
                    break;
                case 'CHAIN':
                    processChain(msg.message);
                    break;
                case 'BLOCK':
                    processBlock(msg.message);
                    break;
                default:
                    console.log(`Unknown Message !`);
                    break;
            }
        });
    }

    const processBlock = (_block) => {
        const current = Nexa.chain.slice(-1)[0];
        if(current.previousHash == '-1' && _block.previousHash == '-1'){
            if(current.timestamp > _block.timestamp){
                console.log(`UPDATING GENESIS`);
                Nexa.chain[0] = _block;
            }
        }
        else{
            if(_block.previousHash == current.hash){
                // console.log(`Adding Block To The Chain...`);
                console.log(`Recieved New Block From [${_block.creator}]`);
                Nexa.chain.push(_block);
                // console.log(_block);
            }
            else{
                // console.log(`Requesting Chain`);
                broadcastMessage('REQUEST_CHAIN','');
            }
        }
    }

    const processChain = (_chain) => {
        const newChain = _chain;
        if(newChain.length > Nexa.chain.length){
            console.log(`REPLACING CHAIN`);
            Nexa.chain = _chain;
            console.log(_chain);
        }
    }

    const requestLatestBlock = (connection) => {
        connection.send(JSON.stringify({ event: 'BLOCK', message: Nexa.chain.slice(-1)[0]}));
    }

    const getChain = () => {
        return Nexa.chain;
    }

    const addPending = (_transaction) => {
        Nexa.addPending(_transaction);
    }

    const createBlock = (_NodeID) => {
        Nexa.createNewBlock(_NodeID);
        broadcastMessage('BLOCK',Nexa.chain.slice(-1)[0]);
    }
    

    const initConnection = (connection) => {
        console.log('Initiating Connection...');
        startListener(connection);
        requestLatestBlock(connection);
        // connection.send(JSON.stringify({event : 'CHAIN', message : Nexa.chain}));
        p2pNodes.push(connection);

        connection.on('error', () => closeConnection(connection));
        connection.on('close', () => closeConnection(connection));
    }

    return{
        init,
        addPeer,
        getChain,
        addPending,
        createBlock
    }
}

module.exports = p2pNode;