const socketActions = require('./constants');
const DiVoChain = require('./DiVoChain');

const socketListeners = (socket, blockChain) => {
    socket.on(socketActions.ADD_TRANSACTION, (from, toID) => {
        const vote = new Transaction(from, toID);
        blockChain.newTransaction(vote);
        console.log(`Added transaction ${JSON.stringify(vote,null,'\t')}`);
    });

    socket.on(socketActions.END_MINING, (newChain) => {
        console.log(`End Mining Encountered!!`);
        process.env.BREAK = true;
        const updatedChain = new DiVoChain();
        updatedChain.parseChain(newChain);
        if(updatedChain.verifyIntegrity() == true && updatedChain.chain.length >= blockChain.chain.length)
            blockChain.chain = updatedChain.chain;
    });

    return socket;
};

module.exports = socketListeners;