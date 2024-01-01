var express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors')
app = express()
port = 5000

function listener(){
    console.log("Listening at port "+port)
}
app.use(cors())
var msgs = ""
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.json());
function home(req, res){
    msgs = ""
    console.log("Request Recieved \n"+"msg => "+req.query.nme+":"+req.query.msg)
    msgs+=(req.query.nme+":"+req.query.msg+"<br>");
    [...datamap.keys()].forEach((key) => {
    datamap.set(key, datamap.get(key)+msgs);
    });
    console.log(datamap)
    res.send("Krishna")
}

function senddata(req, res){
    res.send(datamap.get(req.query.nme))
    datamap.set(req.query.nme, "")
}

function delName(req, res){
    try{
        datamap.delete(req.query.nme);
    }
    catch(e){}
    console.log(datamap)
}
app.delete('/', delName)
app.post('/', senddata)
app.get('/', home)
app.listen(port, listener)
