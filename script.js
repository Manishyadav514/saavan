
function playPause() {
    var audioTrack = document.getElementById('audioTrack');
    var controlBtn = document.getElementById('play-pause-button');

    if (audioTrack?.paused) {
        audioTrack.play();
        //controlBtn.textContent = "Pause";
        controlBtn.className = "pause";
    } else {
        audioTrack.pause();
        //controlBtn.textContent = "Play";
        controlBtn.className = "play";
    }
}

audioTrack.addEventListener("ended", function () {
    controlBtn.className = "play";
});



function togglePopup() {
    var popup = document.getElementById("popup");
    popup.classList.toggle("show");
}

