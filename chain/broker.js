const app = require('express')();
const bp = require('body-parser');

var list = [];
app.use(bp.json());
app.post('/announce/:id',(req,res) => {
    const id = req.params.id;
    list.push(Number(id));
    console.log(`Node Added [${id}]`);
    res.sendStatus(200).end();
});

app.get('/ports',(req,res) => {
    res.json(list);
});

app.listen(5000,() => {
    console.log(`Broker Running On http://localhost:5000`);
});
