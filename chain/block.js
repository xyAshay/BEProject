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
        while(this.hashBlock().slice(0,3) != '000'){
            this.nonce++;
        }
        this.hash = this.hashBlock();
    }
};

module.exports = Block;