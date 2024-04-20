// Music Class
class MusicPlayer {
    constructor(musicList) {
        this.musicList = musicList;
        this.index = 0;
    }

    getMusic() {
        return this.musicList[this.index];
    }

    next() {
        if (this.index + 1 < this.musicList.length) {
            this.index++;
        }
        else {
            this.index = 0;
        }
    }

    prev() {
        if (this.index != 0) {
            this.index--;
        } else {
            this.index = this.musicList.length - 1;
        }
    }

    getMusicById(id) {
        return this.musicList.find(music => music.id === id);
    }
}

class Music {
    constructor(title, singer, img, file, id) {
        this.title = title;
        this.singer = singer;
        this.img = img;
        this.file = file;
        this.id = id;
    }

    getName() {
        return this.title + " - " + this.singer;
    }
}



const musicList = [
    new Music("ophelia", "The lumener", "ophelia.jpg", "ophelia.mp3", "ophelia"),
    new Music("Cold/Mess", "Prateek Kuhad", "coldmess.png", "coldmess.mp3", "coldmess"),
    new Music("Equinox", "Treehouse Studios", "equinox.jpg", "equinox.mp3", "equinox"),
    new Music("bellyache", "Billie Eilish", "bellyache.png", "bellyache.mp3", "bellyache")
];
