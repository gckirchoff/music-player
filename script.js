const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeElement = document.getElementById('current-time');
const durationElement = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

// Music
const songs = [
    {
        name: 'sir-duke',
        displayName: 'Sir Duke',
        artist: 'Stevie Wonder'
    },
    {
        name: 'shining-star',
        displayName: 'Shining Star',
        artist: 'Earth Wind & Fire'
    },
    {
        name: 'eye-in-the-sky',
        displayName: 'Eye in the Sky',
        artist: 'The Alan Parsons Project'
    },
    {
        name: 'love-and-rain',
        displayName: 'Love and Rain',
        artist: 'Electric Light Orchestra'
    }
]


// Check if playing song
let isPlaying = false;



// Play song
const playSong = () => {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', "Pause");
    music.play();
}

// Pause song
const pauseSong = () => {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', "Play");
    music.pause();
}

// Event listener for main play button
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

// Update DOM with song
const loadSong = (song) => {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.png`;
}




// Current Song
let songIndex = 0;


// Previous song function
const prevSong = () => {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length -1;
    }
    loadSong(songs[songIndex]);
    playSong();
}


// Next song function
const nextSong = () => {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}




// On load - Select first song
loadSong(songs[songIndex]);


// // Default volume
let musicVolume = 100;


// // Volume functions

const volumeDown = () => {
    if (musicVolume <= 0) {
        musicVolume = 0;
        music.volume = musicVolume / 100;
    } else {
        musicVolume -= 10
        music.volume = musicVolume / 100;
    }
}



const volumeUp = () => {
    if (musicVolume >= 100) {
        musicVolume = 100;
        music.volume = musicVolume / 100;
    } else {
        musicVolume += 10
        music.volume = musicVolume / 100;
    }
}




// Progress bar and time function
const updateProgressBar = (e) => {
    if (isPlaying) {
        const { duration, currentTime } = e.srcElement;
        // Update progress bar width
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        // Calculate display for duration
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`
        }
        // Delay switching duration element to avoid NaN
        if (durationSeconds) {
            durationElement.textContent = `${durationMinutes}:${durationSeconds}`;
        }
        // Calculate display for current time
        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if (currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`
        }
        currentTimeElement.textContent = `${currentMinutes}:${currentSeconds}`;
    }
}

function setProgressBar(event) {
    const width = this.clientWidth;
    const clickX = event.offsetX;
    const { duration } = music;
    music.currentTime = (clickX / width) * duration;
}






// Event listerns
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
document.addEventListener('keydown', event => {
    if (event.code === 'Space') {
        if (isPlaying) {
            pauseSong();
        } else {
            playSong();
        }
    }
});
document.addEventListener('keydown', event => {
    if (event.code === 'ArrowRight') {
        nextSong();
    }
});

document.addEventListener('keydown', event => {
    if (event.code === 'ArrowLeft') {
        prevSong();
    }
});



// Progress event listeners
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar)




// Volume event listeners
document.addEventListener('keydown', event => {
    if (event.code === 'ArrowDown') {
        volumeDown();
    }
});

document.addEventListener('keydown', event => {
    if (event.code === 'ArrowUp') {
        volumeUp();
    }
});




// Go to next song when current one ends
music.addEventListener('ended', nextSong);