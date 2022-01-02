var audio_volume=0.6;

const animate = (key) => {
    const currentKey = document.querySelector(`.${key}`);
    if(!currentKey) return;
    currentKey.classList.add('pressed');
    setTimeout(() => {
        currentKey.classList.remove('pressed');
    }, 300);
}

const playMusic=(path) =>{
    const audio=new Audio(path);
    audio.volume=audio_volume;
    audio.play();
}

document.addEventListener("keypress",(event)=>{
    const triggeredKey=event.key;
    makeSound(triggeredKey);
    animate(triggeredKey);
})


//theme 1
const theme1_background="#091921";
const theme1_text="#00fff1";


//theme2
const theme2_background="#f7c340";
const theme2_text="#2d2d2d";

const changeTheme=(theme)=>{
    let root=document.documentElement;
    if(theme==="theme1"){
        root.style.setProperty('--background',theme1_background);
        root.style.setProperty('--text',theme1_text);
        
    }
    else{
        root.style.setProperty('--background',theme2_background);
        root.style.setProperty('--text',theme2_text);
    }
}

var curr_theme="theme1";
const theme_changer=document.getElementById("util_button-theme");
theme_changer.addEventListener("click",(e)=>{
    theme_changer.classList.add('change_theme');
    setTimeout(() => {
        theme_changer.classList.remove('change_theme');
    }, 300);


    if(curr_theme=="theme1"){
        changeTheme("theme2");
        curr_theme="theme2";
    }
    else{
        changeTheme("theme1");
        curr_theme="theme1";
    }
})



var auto_music_id;
var auto_music_on=false;
const startAutoMusic=()=>{
    const letters=['w','a','s','d','j','k','l'];
    auto_music_id=setInterval(() => {
        const selectedKey=letters[Math.floor(Math.random()*letters.length)];
        makeSound(selectedKey);
        animate(selectedKey); 
    },300 );
};

const auto_music_button=document.getElementById("util_button-auto");
auto_music_button.addEventListener('click',()=>{
    if(auto_music_on){
        clearInterval(auto_music_id);
        auto_music_on=false;
        auto_music_button.classList.remove('pressed');
        auto_music_button.textContent='Start Auto Music';
    }
    else{
        auto_music_on=true;
        startAutoMusic();
        auto_music_button.classList.add('pressed');
        auto_music_button.textContent='Stop Auto Music';
    }
})

const slider=document.getElementById("volume_slider");
slider.oninput=(event)=>{
    audio_volume= event.target.value/100;
}

const makeSound = (key) => {
    switch (key) {
        case 'w':
            playMusic("src/sounds/sound-1.mp3");
            break;
        case 'a':
            playMusic("src/sounds/sound-2.mp3");
            break;
        case 's':
            playMusic("src/sounds/sound-3.mp3");
            break;
        case 'd':
            playMusic("src/sounds/sound-4.mp3");
            break;
        case 'j':
            playMusic("src/sounds/sound-5.mp3");
            break;
        case 'k':
            playMusic("src/sounds/sound-6.mp3");
            break;
        case 'l':
            playMusic("src/sounds/sound-7.mp3");
            break;
        default:
            console.log("Hey wrong button");
    }
}

const handleDrumClick = (event) => {
    var innerHTML = event.target.innerHTML;
    console.log(innerHTML);
    animate(innerHTML);
    makeSound(innerHTML);
}

var drums = document.querySelectorAll('.drum');
drums.forEach((element) => {
    element.addEventListener('click', handleDrumClick);
})