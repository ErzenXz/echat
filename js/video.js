

// A function that takes the room code, and makes a iframe

function makeCall(roomCode) {
    document.getElementById("loading1").classList.remove("hidden");
    let div = document.createElement('div');
    var iframe = document.createElement('iframe');
    iframe.setAttribute('src', 'https://video.erzen.tk/room/' + roomCode);
    iframe.setAttribute('width', '100%');
    iframe.setAttribute('height', '100%');
    iframe.setAttribute('allowfullscreen', 'true');
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('id', 'iframe');
    iframe.setAttribute('onload', 'document.getElementById("loading1").classList.add("hidden");');
    // Allow camera and microphone access
    iframe.setAttribute('allow', 'camera; microphone; autoplay; display-capture; encrypted-media');
    // Allow fullscreen
    iframe.setAttribute('allowfullscreen', 'true');
    // Make the iframe responsive and scale it to the screen size  - 15% on all sides, and give a class
    // iframe.setAttribute('style', 'position: absolute; top: 15%; left: 15%; width: 70%; height: 70%;');
    iframe.setAttribute('class', 'video');
    div.setAttribute('class', 'divVideo');

    // Add a X button to close the video and a minimize button
    var close = document.createElement('button');
    close.setAttribute('class', 'close');
    close.setAttribute('onclick', 'closeVideo()');
    close.innerHTML = 'X';
    var minimize = document.createElement('button');
    minimize.setAttribute('class', 'minimize');
    minimize.setAttribute('onclick', 'minimizeVideo()');
    minimize.innerHTML = '_';
    div.appendChild(close);
    div.appendChild(minimize);
    div.appendChild(iframe);

    // Append the iframe to the body

    document.body.appendChild(div);
}


// Implement the close button

function closeVideo() {
    var video = document.getElementsByClassName('divVideo')[0];
    video.parentNode.removeChild(video);
}

// Implement the minimize button

function minimizeVideo() {
    // Make this like a toggle button
    var video = document.getElementsByClassName('divVideo')[0];
    var minimize = document.getElementsByClassName('minimize')[0];
    var iframe = document.getElementsByClassName('video')[0];
    if (minimize.innerHTML == '_') {
        video.classList.add('mini');
        minimize.innerHTML = '^';

        // When minimied, make the video draggable
        dragElement(video);

        iframe.classList.add('scaleVideo');

    }
    else {
        video.classList.remove('mini');
        iframe.classList.remove('scaleVideo');
        minimize.innerHTML = '_';
    }


}

// Make the video draggable

function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    // If present, the header is where you move the DIV from:
    if (document.getElementsByClassName('divVideo')[0]) {
        // if present, the header is where you move the DIV from:
        document.getElementsByClassName('divVideo')[0].onmousedown = dragMouseDown;
    } else {
        // otherwise, move the DIV from anywhere inside the DIV:
        elmnt.onmousedown = dragMouseDown;
    }

    // Make the DIV element draggable:
    // elmnt.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        // pos3 = e.clientX;
        // pos4 = e.clientY;
        pos3 = e.screenX;
        pos4 = e.screenY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;

        // Add a class to the video when it's being dragged
        elmnt.classList.add('dragging');
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        // pos1 = pos3 - e.clientX;
        // pos2 = pos4 - e.clientY;
        pos1 = pos3 - e.screenX;
        pos2 = pos4 - e.screenY;
        // pos3 = e.clientX;
        // pos4 = e.clientY;
        pos3 = e.screenX;
        pos4 = e.screenY;
        // set the element's new position:
        // elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        // elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";

    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;

        // Remove the class when the video is no longer being dragged
        elmnt.classList.remove('dragging');
    }
}