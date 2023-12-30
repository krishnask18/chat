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
    if(req.query.nme == 'undefined'){
        res.send("Service by Krishna")
        return
    }
    msgs+=(req.query.nme+":"+req.query.msg+"<br>")
    res.send("Service by Krishna")
}

function senddata(req, res){
    // if(msgs != req.query.msg && req.query.msg != ""){
    //     res.send(msgs)
    // }
    // else{
    //     res.send("KrishnaCodedThis")
    // }
    res.send(msgs)
}

app.post('/', senddata)
app.get('/', home)
app.listen(port, listener)
