let socket = io(); //creates a socket connection to same server from which server is hosted
socket.on('connected', () => {
    console.log("Connected: " + socket.id)
})
$(() => {
    let sendbtn = $('#send');
    let msglist = document.getElementById("msglist");
    let msgbox = $('#msgbox');
    let loginbox = $('#loginbox');
    let loginbtn = $('#login');
    let username;
    loginbtn.click(() => {
        username = loginbox.val();
        socket.emit('login', username);
        $('#login-div').css("display", "none");
        document.title = username
        $('#chat-div').css("display", "block");
    })
    sendbtn.click(() => {
        socket.emit('send_msg', {
            username: username,
            message: msgbox.val() //key-value pair
        })
        msgbox.val("");
    })
    socket.on('received_msg', (msgs) => {
        console.log(msgs);
        msglist.innerHTML = msglist.innerHTML + ("<li>" + msgs.username + ": " + msgs.message + "</li>");
    })
})