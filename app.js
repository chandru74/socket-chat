const express = require('express');
const app = express();
const path = require('path');


app.set('view engine', 'ejs');

const port = process.env.port || 3000;

app.use(express.static('public'))
app.use('/css',express.static(path.join(__dirname,'node_modules/bootstrap/dist/css')));
app.use('/js',express.static(path.join(__dirname,'node_modules/bootstrap/dist/js')));
app.use('/js',express.static(path.join(__dirname,'node_modules/jquery/dist')));

app.get('/', (req,res)=>{
    res.render('index');
})

const server = app.listen(port, ()=>{
    console.log(`server started at ${port}`);
});

const io = require('socket.io')(server);

io.on('connection',(socket)=>{
    console.log('new user');
    
    socket.username = "Anonymous";

    socket.on('change_username',(data)=>{
        socket.username = data.username;
    })

    socket.on('new_message', (data)=>{
        io.sockets.emit('new_message',{message: data.message, username: socket.username});
    })

    socket.on('typing',()=>{
        socket.broadcast.emit('typing',{username:socket.username});
    })
})