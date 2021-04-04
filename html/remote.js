const WEBSOCKET = 'ws://localhost:8990';

const output = document.getElementById("output");
const input = document.getElementById("input");
let ws;

function log(msg) {
  output.textContent +=
    msg.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, '')
       .replace(/[^\x20-\x7E]/g, '')
    + "\n";
  output.scrollTop = output.scrollHeight;
}

function send() {
  log("> " + input.value);
  ws.send(input.value);
  input.value = "";
}

function wsInit() {
  ws = new WebSocket(WEBSOCKET);
  ws.onopen = function() {
    log('** Connected to server **');
  };
  ws.onclose = function() {
    log('** Disconnected, reconnecting... **');
    setTimeout(wsInit, 1000);
  };
  ws.onerror = function(event) {
    log(`** Error connecting to server. Is someone else using the console? **`);
  };
  ws.onmessage = function(event) {
    log(event.data);
  };

  input.addEventListener('keyup', (event) => {
    if (event.keyCode === 13) {
      send();
    }
  });
}

wsInit();
