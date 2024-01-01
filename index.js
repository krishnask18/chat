var express = require('express')
const cors = require('cors')
app = express()
port = 5000

function listener(){
    console.log("Listening at port "+port)
}
app.use(cors())
var datamap = new Map();
var msgs = ""
function home(req, res){
    msgs = ""
    console.log("Request Recieved \n"+"msg => "+req.query.nme+":"+req.query.msg)
    msgs+=(req.query.nme+" : "+req.query.msg+"<br>");
    var tempmap = datamap.get(req.query.code);
    [...tempmap.keys()].forEach((key) => {
    tempmap.set(key, tempmap.get(key)+msgs);
    });
    datamap.set(req.query.code, tempmap)
    console.log(datamap)
    res.send("Krishna")
}

function senddata(req, res){
    if(datamap.get(req.query.code) == undefined){
        datamap.set(req.query.code, new Map())
    }
    var tempmap = datamap.get(req.query.code)
    if(tempmap.get(req.query.nme) == undefined){
        tempmap.set(req.query.nme, "")
    }
    res.send(tempmap.get(req.query.nme))
    tempmap.set(req.query.nme, "")
    datamap.set(req.query.code, tempmap)
}

function delName(req, res){
    try{
        var tempmap = datamap.get(req.query.code)
        tempmap.delete(req.query.nme)
    }
    catch(e){}
    if([...tempmap.keys()].length == 0){
        datamap.delete(req.query.code)
    }
    else datamap.set(req.query.code, tempmap)
    console.log(datamap)
}
app.delete('/', delName)
app.post('/', senddata)
app.get('/', home)
app.listen(port, listener)
