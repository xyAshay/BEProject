const crypto = require('crypto');

class Block{
    constructor(timestamp, data, previousHash = ''){        
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.nonce = 0;
        this.hash = this.hashBlock();
    }

    hashBlock(){
        return crypto.createHash('SHA256').update(this.timestamp + this.data + this.previousHash + this.nonce).digest('hex');
    }

    mineBlock(){
        while(this.hash.substring(0,2)!= Array(3).join('0')){
            this.nonce++;
            this.hash = this.hashBlock();
        }
        console.log('Mined Block With HASH : '+ this.hash);
    }
}

class BlockChain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
        this.nodes = [];
    }

    addNode(node){
        this.nodes.push(node);
    }

    createGenesisBlock(){
        return new Block(Date.now(), 'Genesis Block', '-1');
    }

    getChain(){
        return this.chain;
    }

    addBlock(Block){
        //need to mine before pushing
        Block.previousHash = this.chain[this.chain.length -1].hash;
        Block.mineBlock();
        this.chain.push(Block);
    }

    verifyIntegrity(){
        let prevBlock = this.chain[0];
        for(let i = 1; i< this.chain.length ; i++){
            let currBlock = this.chain[i];
            if(currBlock.previousHash != prevBlock.hash)
                return false;
            prevBlock = currBlock;
        }
        return true;
    }
}

/* @TODOS
[DONE] -Need Method to mine the block
[DONE] -Need Method to verify integrity of the chain
[DONE] -Ensure Block is hashed BEFORE changes and not AFTER
ATTEMPTED -Implement Proof of work / stake
Implement P2P unopiniated distribution
*/

const Nexa = new BlockChain;
Nexa.addBlock(new Block(Date.now(), 'Block 1'));
Nexa.addBlock(new Block(Date.now(), 'Block 2'));
Nexa.addBlock(new Block(Date.now(), 'Block 3'));

console.log(Nexa.getChain());
console.log(Nexa.verifyIntegrity());
// console.log(Nexa.getLatestHash());