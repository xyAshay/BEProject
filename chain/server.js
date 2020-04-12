const app = require('express')();
const bodyParser = require('body-parser');
const Blockchain = require('./chain');
const Vote = require('./transaction');
const Nexa = new Blockchain();

app.use(bodyParser.json());
app.get('/chain',(req,res) => {
    res.json(Nexa.chain);
});

app.post('/vote',(req,res) => {
    const {sender, toID} = req.body;
    const _vote = new Vote(Date.now(), sender, toID);
    Nexa.addPending(_vote);
    res.json({message:"Added to Pending"});
});

app.listen(5000,() => {
    console.log(`Server Running On Port : 5000`);
    setInterval(() => {
        Nexa.createNewBlock();
        console.log(`Mining Iteration Complete...`);
    }, 30000);
});