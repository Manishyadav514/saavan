// album details
const albumImage = document.querySelector("#album-details #album-image");
const albumTitle = document.querySelector("#album-details #album-text #title");
const albumSinger = document.querySelector("#album-details #album-text #singer");
const albumAudio = document.querySelector("#album-details #album-audio");
const audioControlDiv = document.querySelector("#audioControlDiv");
// audio control
const playPauseButton = document.querySelector("#audioControlDiv #playPauseButton");
const prevButton = document.querySelector("#audioControlDiv #prevButton");
const nextButton = document.querySelector("#audioControlDiv #nextButton");
const volume = document.querySelector("#audio-volume");
const volumeBar = document.querySelector("#audio-volume-bar");
// audio proress
const progressBar = document.querySelector("#audio-progress-bar");
const duration = document.querySelector("#audio-duration");
const currentTime = document.querySelector("#audio-current-time");
const progressView = document.querySelector('#audio-progress-view');
// const ul = document.querySelector("ul");

const player = new MusicPlayer(musicList);

window.addEventListener("load", () => {
    let music = player.getMusic();
    displayMusic(music);
    // displayMusicList(player.musicList);
    // isPlayingNow();
});
function playMusicById(music) {
    console.log(music)
    let musicby = player.getMusicById(music);
    displayMusic(musicby);
    playMusic();
}

function displayMusic(music) {
    albumTitle.innerText = music.title;
    albumSinger.innerText = music.singer;
    albumImage.src = "img/" + music.img;
    albumImage.alt = "img/" + music.img;
    albumAudio.src = "mp3/" + music.file;
}

playPauseButton.addEventListener("click", () => {
    const isMusicPlay = audioControlDiv.classList.contains("playing");
    isMusicPlay ? pauseMusic() : playMusic();
});

prevButton.addEventListener("click", () => { prevMusic(); });

nextButton.addEventListener("click", () => { nextMusic(); });

const prevMusic = () => {
    player.prev();
    let music = player.getMusic();
    displayMusic(music);
    playMusic();
    // isPlayingNow();
}

const nextMusic = () => {
    player.next();
    let music = player.getMusic();
    displayMusic(music);
    playMusic();
    // isPlayingNow();
}

const pauseMusic = () => {
    audioControlDiv.classList.remove("playing");
    playPauseButton.querySelector("i").classList = "fa-solid fa-play";
    albumAudio.pause();
}

const playMusic = () => {
    audioControlDiv.classList.add("playing");
    playPauseButton.querySelector("i").classList = "fa-solid fa-pause";
    albumAudio.play();
}

const calculateTime = (toplamSaniye) => {
    const dakika = Math.floor(toplamSaniye / 60);
    const saniye = Math.floor(toplamSaniye % 60);
    const guncellenenSaniye = saniye < 10 ? `0${saniye}` : `${saniye}`;
    const sonuc = `${dakika}:${guncellenenSaniye}`;
    return sonuc;
}

albumAudio.addEventListener("loadedmetadata", () => {
    duration.textContent = calculateTime(albumAudio.duration);
    progressBar.max = Math.floor(albumAudio.duration);
});

albumAudio.addEventListener("timeupdate", () => {
    progressBar.value = Math.floor(albumAudio.currentTime);
    currentTime.textContent = calculateTime(progressBar.value);
    const progress = (albumAudio.currentTime / albumAudio.duration) * 100;
    progressView.style.width = progress + '%';
});

progressBar.addEventListener("input", () => {
    currentTime.textContent = calculateTime(progressBar.value);
    albumAudio.currentTime = progressBar.value;
});

let sesDurumu = "sesli";

volumeBar.addEventListener("input", (e) => {
    const value = e.target.value;
    albumAudio.volume = value / 100;
    if (value == 0) {
        albumAudio.muted = true;
        sesDurumu = "sessiz";
        volume.classList = "fa-solid fa-volume-xmark";
    } else {
        albumAudio.muted = false;
        sesDurumu = "sesli"
        volume.classList = "fa-solid fa-volume-high";
    }
});

volume.addEventListener("click", () => {
    if (sesDurumu === "sesli") {
        albumAudio.muted = true;
        sesDurumu = "sessiz";
        volume.classList = "fa-solid fa-volume-xmark";
        volumeBar.value = 0;
    } else {
        albumAudio.muted = false;
        sesDurumu = "sesli"
        volume.classList = "fa-solid fa-volume-high";
        volumeBar.value = 100;
    }
});


// const displayMusicList = (list) => {
//     for (let i = 0; i < list.length; i++) {
//         let liTag = `
//             <li li-index='${i}' onclick="selectedMusic(this)" class="list-group-item d-flex justify-content-between     align-items-center">
//                 <span>${list[i].getName()}</span>
//                 <span id="music-${i}" class="badge bg-primary rounded-pill"></span>
//                 <audio class="music-${i}" src="mp3/${list[i].file}"></audio>
//             </li> 
//        `;

//         ul.insertAdjacentHTML("beforeend", liTag);

//         let liAudioDuration = ul.querySelector(`#music-${i}`);
//         let liAudioTag = ul.querySelector(`.music-${i}`);

//         liAudioTag.addEventListener("loadeddata", () => {
//             liAudioDuration.innerText = calculateTime(liAudioTag.duration);
//         });
//     }
// }

const selectedMusic = (li) => {
    player.index = li.getAttribute("li-index");
    displayMusic(player.getMusic());
    playMusic();
    // isPlayingNow();
}

// const isPlayingNow = () => {
//     for (let li of ul.querySelectorAll("li")) {
//         if (li.classList.contains("playing")) {
//             li.classList.remove("playing");
//         }

//         if (li.getAttribute("li-index") == player.index) {
//             li.classList.add("playing");
//         }
//     }
// }

albumAudio.addEventListener("ended", () => {
    nextMusic();
})


