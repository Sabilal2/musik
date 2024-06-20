const playPauseButton = document.getElementById('play-pause');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const seekBar = document.getElementById('seek-bar');
const durationDisplay = document.getElementById('duration');
const songTitleDisplay = document.getElementById('song-title');
const artistNameDisplay = document.getElementById('artist-name');
const albumCoverDisplay = document.getElementById('album-cover');

// Array of songs with their details
const songs = [
    {
        title: "About You",
        artist: "The 1975",
        albumCover: "album/about you.jpg",
        file: "Music/About You.mp3"
    },
    {
        title: "Runtuh",
        artist: "Feby Putri,Fiersa Besari",
        albumCover: "album/Runtuh.jpg",
        file: "Music/Runtuh.mp3"
    },
    {
        title: "BEAUTIFUL",
        artist: "Paul Partohap",
        albumCover: "album/BEAUTIFUL.jpg",
        file: "Music/BEAUTIFUL.mp3"
    },

    {
        title: "We can't be friends (wait for your love)",
        artist: "Ariana Grande",
        albumCover: "album/we cant be friends.jpg",
        file: "Music/we cant be friends.mp3"
    },

    {
        title: "Nanti Kita Seperti Ini",
        artist: "Batas Senja",
        albumCover: "album/nanti kita seperti ini.jpg",
        file: "Music/nanti kita seperti ini.mp3"
    },

    {
        title: "Magnetic",
        artist: "ILLIIT",
        albumCover: "album/magnetic.jpg",
        file: "Music/magnetic.mp3"
    },

    {
        title: "Line Without a Hook",
        artist: "Ricky Montgomery",
        albumCover: "album/line with a hook.jpg",
        file: "Music/Line with a hook.mp3"
    },

    {
        title: "The Box",
        artist: "Roddy Ricch",
        albumCover: "album/The box.jpg",
        file: "Music/The box.mp3"
    },
    // Add more songs as needed
];

let currentSongIndex = 0;
let audio = new Audio(songs[currentSongIndex].file);
let isPlaying = false;
let duration;
let interval;

// Update the song details when a new song is loaded
function updateSongInfo() {
    songTitleDisplay.textContent = songs[currentSongIndex].title;
    artistNameDisplay.textContent = `Artis: ${songs[currentSongIndex].artist}`;
    albumCoverDisplay.src = songs[currentSongIndex].albumCover;
}

// Update the duration display
audio.addEventListener('loadedmetadata', () => {
    duration = audio.duration;
    updateDurationDisplay();
});

// Update the seek bar as the song plays
audio.addEventListener('timeupdate', () => {
    seekBar.value = (audio.currentTime / duration) * 100;
    updateDurationDisplay();
});

// Play or pause the audio
playPauseButton.addEventListener('click', () => {
    if (isPlaying) {
        audio.pause();
        playPauseButton.innerHTML = '<i class="fas fa-play"></i>';
    } else {
        audio.play();
        playPauseButton.innerHTML = '<i class="fas fa-pause"></i>';
    }
    isPlaying = !isPlaying;
});

// Seek the audio when the seek bar is changed
seekBar.addEventListener('input', () => {
    audio.currentTime = (seekBar.value / 100) * duration;
    updateDurationDisplay();
});

// Function to play next song
function playNextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    audio.src = songs[currentSongIndex].file;
    updateSongInfo();
    audio.play(); // Auto play the new song
    playPauseButton.innerHTML = '<i class="fas fa-pause"></i>'; // Ensure pause icon when song changes
    isPlaying = true;
}

// Event listener for when current song ends
audio.addEventListener('ended', () => {
    playNextSong();
});

// Go to the next song
nextButton.addEventListener('click', () => {
    playNextSong();
});

// Go to the previous song
prevButton.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    audio.src = songs[currentSongIndex].file;
    updateSongInfo();
    audio.play(); // Auto play the new song
    playPauseButton.innerHTML = '<i class="fas fa-pause"></i>'; // Ensure pause icon when song changes
    isPlaying = true;
});

// Update the duration display
function updateDurationDisplay() {
    const minutes = Math.floor(audio.currentTime / 60);
    const seconds = Math.floor(audio.currentTime % 60).toString().padStart(2, '0');
    durationDisplay.textContent = `${minutes}:${seconds}`;
}

// Initial song info update
updateSongInfo();
