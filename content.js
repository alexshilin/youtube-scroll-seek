

var allowScrollToSeek = false;
var ytPlayerEl;
var ytPlayerElName = '#ytd-player';
var attempts = 0;

getPlayer();

function getPlayer(){
    //gets player el ref from DOM
    //tries 10 times every 100ms
    if(attempts>=10) return;
    ytPlayerEl = document.querySelector(ytPlayerElName);
    if(!ytPlayerEl){
        attempts++;
        setTimeout(getPlayer, 100);
        return;
    }
    setListeners();
}

function setListeners(){
    //listen for mouse being over yt player
    //if mouse is over yt player, allow using scroll wheen to seek
    ytPlayerEl.addEventListener('mouseenter', (e) => {
        allowScrollToSeek = true;
    }) 
    ytPlayerEl.addEventListener('mouseleave', (e) => {
        allowScrollToSeek = false;
    })
    //listen for scroll wheel
    document.addEventListener("wheel", (e) => {
        //we dont want to prevent regular scrolling
        //so only scroll to seek when mouse is over player
        if(!allowScrollToSeek) return;
        if (e.deltaY > 0) {
            e.preventDefault();
            e.stopPropagation();
            triggerKeydown(true);
        } else if (e.deltaY < 0) {
            e.preventDefault();
            e.stopPropagation();
            triggerKeydown(false);
        }
    }, {capture: true, passive: false})
}

function triggerKeydown(forward) {
    //simulate built in yt functionality
    //to respond to arrow key presses to seek
    keyCode = forward ? 37 : 39; //left arrow key : right arrow key
    document.dispatchEvent(new KeyboardEvent('keydown', {
       'keyCode': keyCode 
    }));
}

