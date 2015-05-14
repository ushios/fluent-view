function send() {
    ws.send(document.getElementById('msg').value);
}

var host = window.document.location.host.replace(/:.*/, '');
var ws = new WebSocket('ws://' + host + ':3001');
ws.onmessage = function (event) {
    console.log(event.data);
    document.getElementById("list").innerHTML += event.data;
};