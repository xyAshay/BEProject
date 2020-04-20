const WebSocket = require('ws');

const p2pNode = function(_port) {
    let p2pNodes = [];

    function init(){
        const socketServer = new WebSocket.Server({ port : _port});

        socketServer.on('connection',(connection) => {
            console.log('Connection In...');
            initConnection(connection);
        });
    }

    const initConnection = (connection) => {
        console.log('Initiating Connection...');
        p2pNodes.push(connection);

        connection.on('error', () => closeConnection(connection));
        connection.on('close', () => closeConnection(connection));
    }

    const addPeer = (_host,_port) => {
        const connection = new WebSocket(`ws://${_host}:${_port}`);
        console.log(`Adding New Peer : ws://${_host}:${_port}`);
        connection.on('error', (err) => console.error(err));
        connection.on('open', () => initConnection(connection));
    }

    const closeConnection = (connection) => {
        console.log('closing connection');
        p2pNodes.splice(p2pNodes.indexOf(connection),1);
    }

    return{
        init,
        addPeer
    }
}

module.exports = p2pNode;