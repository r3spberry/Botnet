function Timeval(newVal){
    document.querySelector(".timereturn ").innerHTML = `Time:${newVal}`;
}
function Threadval(newVal){
    document.querySelector(".Threadreturn ").innerHTML = `Thread:${newVal}`;
}


let severstat = false;
const webSocket = new WebSocket("adress");

window.onload = function(){
    webSocket.onopen = function () {
        severstat = true;
    };
    setTimeout(()=>{if(severstat == false){alert("지금은 이용하실수없습니다")}},1000)
}
