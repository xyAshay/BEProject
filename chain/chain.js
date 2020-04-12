const Block = require('./block');
const Transaction = require('./transaction');

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
        this.pendingTransactions = [];
    }

    createGenesisBlock(){
        return new Block(Date.now(), 'Genesis Block', '-1');
    }

    addBlock(_block){
        _block.mineBlock();
        console.log(`Block Mined : ${_block.hash}`);
        this.chain.push(_block);
    }

    isBlockValid(_block){
        if(_block.previousHash != this.chain[this.chain.length - 1].hash)
            return false;
        else if(_block.hash.slice(0,3)!='000')
            return false;
        else if(_block.hash != crypto.createHash('SHA256').update(_block.timestamp + _block.data + _block.previousHash + _block.nonce).digest('hex'))
            return false;
        return true;
    }

    addPending(_transaction) {
        this.pendingTransactions.push(_transaction);
        console.log(`Registered Vote For: ${_transaction.sender}`);
    }

    lastestHash(){
        return this.chain[this.chain.length - 1].hash;
    }
    
    createNewBlock(){
        if(this.pendingTransactions.length > 0){
            const newBlock = new Block(Date.now(),this.pendingTransactions,this.lastestHash());
            console.log(`Adding New Block...`);
            this.addBlock(newBlock);
            this.pendingTransactions = [];
        }
        else{
            console.log(`Not Enough Transactions !`);
        }
    }
};

// function infinite(_Blockchain){
//     setInterval(() => {
//         _Blockchain.createNewBlock();
//     }, 30000);
// }

// const Nexa = new Blockchain;
// infinite(Nexa);
// setInterval(() => {
//     let amt = Math.floor(Math.random() * 10);
//     if(amt < 3){
//         Nexa.addPending(new Transaction(Date.now(),'ZZ',amt));
//     }
//     else{
//         console.log(`Moving Ahead for Amt`);
//     }
// }, 5000);

module.exports = Blockchain;