let music = document.querySelector("audio");
let play = document.getElementById("play");
let img = document.querySelector("img");
let artist = document.getElementById("artist");
let title = document.getElementById("title");
let prev = document.getElementById("prev");
let next = document.getElementById("next");
let progress = document.getElementById("progress");
let current_time = document.getElementById("current_time");
let duration_time = document.getElementById("duration");
let progress_div=document.getElementById("progress_div");

let songList=[
    {
        songName:"In My Feelings",
        songArtist:"Drake",
    },
    {
        songName:"Faded",
        songArtist:"Alan Walker",
    },
    {
        songName:"Let you love me",
        songArtist:"Rita Ora",
    },
    {
        songName:"Without Me",
        songArtist:"Halsey",
    },
    {
        songName:"Be Alright",
        songArtist:"Dean Lewis",
    },
    {
        songName:"Go Bang",
        songArtist:"Pnau",
    },
]

let isPlaying = false;
play.addEventListener('click', () => {
    if (!isPlaying) {
        music.play();
        play.classList.replace("fa-play", "fa-pause");
        img.classList.add("anime");
        isPlaying = true;
        play.title = "Pause";
    } else {
        music.pause();
        play.classList.replace("fa-pause", "fa-play");
        img.classList.remove("anime");
        isPlaying = false;
        play.title = "Play";
    }
});

let i = 1;

function loadSong(i) {
    music.src = `src/songs/${i}.mp3`;
    img.src = `src/covers/${i}.jpg`;
    title.innerText=songList[i-1].songName;
    artist.innerText=songList[i-1].songArtist;
    progress.style.width = `0%`;
    if(!isPlaying){
        isPlaying=true;
        play.classList.replace("fa-play", "fa-pause");
        img.classList.add("anime");
    }
    music.play();
}
prev.addEventListener('click', () => {
    i--;
    if (i == 0) i = 6;
    loadSong(i);
})
next.addEventListener('click', () => {
    i++;
    if (i == 7) i = 1;
    loadSong(i);
})
music.addEventListener('ended', () => {
    i++;
    if (i == 7) i = 1;
    loadSong(i);
})

// Progress JS Work
music.addEventListener('timeupdate',  (event)=> {
    const {
        currentTime,
        duration
    } = event.srcElement;

    let progress_time = (currentTime / duration) * 100;
    progress.style.width = `${progress_time}%`;

    let duration_min = parseInt(duration / 60);
    let duration_sec = parseInt(duration % 60);
    if (duration_sec < 10) duration_sec = '0' + duration_sec;
    if(duration){
        duration_time.textContent = `${duration_min}:${duration_sec}`;
    }

    let currentMin = parseInt(currentTime / 60);
    let currentSec = parseInt(currentTime % 60);
    if (currentSec < 10) currentSec = '0' + currentSec;
    current_time.textContent = `${currentMin}:${currentSec}`;
})

progress_div.addEventListener('click',(event)=>{
    let new_time=(event.offsetX/event.srcElement.clientWidth)*(music.duration);
    music.currentTime=new_time;
})