let interval = 1000;
self.onmessage = (e) => {
    interval =  e.data || 1000;
}
function start(){
    postMessage(1);
    setTimeout("start()",interval);
}
setTimeout("start()",interval);