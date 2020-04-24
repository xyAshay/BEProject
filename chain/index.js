const app = require('express')();
const axios = require('axios');
const bodyParser = require('body-parser');

// const Blockchain = require('./chain');
const Vote = require('./transaction');
const p2pNode = require('./DiVoNode');

// const Nexa = new Blockchain();
const NodeID = 19800 + Math.floor(Math.random() * 101);

const thisNode = new p2pNode(NodeID);
thisNode.init();

app.use(bodyParser.json());
app.get('/chain',(req,res) => {
    res.json(thisNode.getChain());
});

app.post('/vote',(req,res) => {
    const {sender, toID} = req.body;
    const _vote = new Vote(Date.now(), sender, toID);
    thisNode.addPending(_vote);
    res.json({message:"Added to Pending"});
});

function getPorts() {
    return axios.get('http://localhost:5000/ports').then((res) => {
        return res.data;
    });
}

const http_port = 3000 + Math.floor(Math.random() * 101);
app.listen(http_port,() => {
    // console.log(`Server Running On Port : 5000`);
    console.log(`HTTP Port : ${http_port}\nNode ID : ${NodeID}`)

    getPorts().then(data => {
        for (const port of data) {
            // console.log(`Connection Established To Node ${port}`)
            thisNode.addPeer('localhost',port);
        }
    });
    
    axios.post(`http://localhost:5000/announce/${NodeID}`);
    
    setInterval(() => {
        // Nexa.createNewBlock();
        thisNode.createBlock(NodeID);
        console.log(`Mining Iteration Complete...`);
    }, 60000);
});