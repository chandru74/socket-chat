$(function(){
    var socket = io.connect('http://localhost:3000');

    var username = $('#username');
    var send_username =$('#send_username');
    var message = $('#message');
    var send_message = $('#send_message');
    var chatroom = $('#chatroom');
    var feedback = $('#feedback');

    send_username.click(()=>{
        socket.emit('change_username',{username: username.val()});
    })

    send_message.click(()=>{
        socket.emit('new_message',{message: message.val()});
    })

    socket.on('new_message', (data)=>{
        feedback.html('');
        message.val(' ');
        chatroom.append("<p class='message'>" + data.username + ": " + data.message + "</p>")
    })

    message.bind('keypress',()=>{
        socket.emit('typing')
    })

    socket.on('typing', (data)=>{
        feedback.html("<p>" + data.username + " is typing </p>")
    })
})