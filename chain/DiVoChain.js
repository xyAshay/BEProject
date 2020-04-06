const crypto = require('crypto');

class Block{
    constructor(timestamp, data, previousHash = ''){        
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.nonce = 0;
        this.hash = this.hashBlock();
    }

    /*hashBlock(){
        while(true){
            if(crypto.createHash('SHA256').update(this.timestamp + this.data + this.previousHash + this.nonce).digest('hex').substring(0,3) != Array(4).join('0')){
                this.nonce++;
            }
            else
                return crypto.createHash('SHA256').update(this.timestamp + this.data + this.previousHash + this.nonce).digest('hex');
        }
    }*/

    hashBlock(){
        return crypto.createHash('SHA256').update(this.timestamp + this.data + this.previousHash + this.nonce).digest('hex');
    }
}

class BlockChain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock(){
        return new Block(Date.now(), 'Genesis Block', '-1');
    }

    getChain(){
        return this.chain;
    }
    
    getLatestHash(){
        return this.chain[this.chain.length -1].hash;
    }

    addBlock(Block){
        this.chain.push(Block);
    }
}

const Nexa = new BlockChain;
Nexa.addBlock(new Block(Date.now(), 'Block 1', Nexa.getLatestHash()));
Nexa.addBlock(new Block(Date.now(), 'Block 2', Nexa.getLatestHash()));
Nexa.addBlock(new Block(Date.now(), 'Block 3', Nexa.getLatestHash()));

console.log(Nexa.getChain());
// console.log(Nexa.getLatestHash());