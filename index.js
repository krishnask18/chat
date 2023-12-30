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
    console.log("Request Recieved \n"+"msg => "+req.query.nme+":"+req.query.msg)
    msgs+=(req.query.nme+":"+req.query.msg+"<br>")
    console.log(msgs)
    res.send(msgs)
}

function senddata(req, res){
    res.send(msgs)
}

app.post('/', senddata)
app.get('/', home)
app.listen(port, listener)