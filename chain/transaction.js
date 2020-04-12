class Transaction{
    constructor(timestamp, sender, toID){
        this.timestamp = timestamp;
        this.sender = sender;
        this.toID = toID;
    }

    getDetails(){
        return{
            timestamp : this.timestamp,
            sender : this.sender,
            toID : this.toID
        };
    }
};


module.exports = Transaction;