const cover = document.getElementById("cover");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const audio = document.getElementById("audio");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const progress = document.querySelector(".progress");
const progressContainer = document.querySelector(".progress-container");
const playlistElement = document.getElementById("playlist");

// Music data
const songs = [
    {
        title: "Poker Face",
        artist: "Ledy Gaga",
        cover: "jpg/cover1.jpg",
        src: "music/song1.mp3"
    },
    {
        title: "Hayloft",
        artist: "Noise of Rumors",
        cover: "jpg/cover2.jpg",
        src: "music/song2.mp3"
    },
    {
        title: "Red Window",
        artist: "Слава КПСС",
        cover: "jpg/cover3.jpg",
        src: "music/song3.mp3"
    },
    {
        title: "Учили жить",
        artist: "POLTABLETKI",
        cover: "jpg/cover4.jpg",
        src: "music/song4.mp3"
    },
    {
        title: "Swamp",
        artist: "WESTLIBERTY'S",
        cover: "jpg/cover5.jpg",
        src: "music/song5.mp3"
    },
    {
        title: "Stay Fly",
        artist: "Three 6 Mafia feat. Young Buck",
        cover: "jpg/cover6.jpg",
        src: "music/song6.mp3"
    },
    {
        title: "Trygedy in Memphis",
        artist: "doxplaya",
        cover: "jpg/cover7.jpg",
        src: "music/song7.mp3"
    },
    {
        title: "Регион-лето",
        artist: "FEDUK, Бэнг",
        cover: "jpg/cover8.jpg",
        src: "music/song8.mp3"
    },
    {
        title: "S&M",
        artist: "Rihanna",
        cover: "jpg/cover9.jpg",
        src: "music/song9.mp3"
    },
    {
        title: "Feel It Still",
        artist: "Portugal. The Man",
        cover: "jpg/cover10.jpg",
        src: "music/song10.mp3"
    },
    {
        title: "Sigma-Boy",
        artist: "Betsy feat Мария Янковская",
        cover: "jpg/cover11.jpg",
        src: "music/song11.mp3"
    },
    {
        title: "Just Dance",
        artist: "Lady Gaga, Colby O'Donis",
        cover: "jpg/cover12.jpg",
        src: "music/song12.mp3"
    }
];

let songIndex = 0;
let isPlaying = false;

// Load song details
function loadSong(song) {
    try {
        cover.src = song.cover;
        title.textContent = song.title;
        artist.textContent = song.artist;
        audio.src = song.src;
        // Фон будет обновлен в обработчике cover.onload
    } catch (error) {
        console.error("Ошибка при загрузке песни:", error);
        alert("Не удалось загрузить песню.");
    }
}

// Play song
function playSong() {
    isPlaying = true;
    audio.play();
    playBtn.textContent = "⏸"; // Пауза
}

// Pause song
function pauseSong() {
    isPlaying = false;
    audio.pause();
    playBtn.textContent = "▶️"; // Воспроизведение
}

// Next song
function nextSong() {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songs[songIndex]);
    playSong();
}

// Previous song
function prevSong() {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songs[songIndex]);
    playSong();
}

// Update progress bar
function updateProgress(e) {
    const { duration, currentTime } = audio;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
}

// Set progress
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}

// Add playlist items
function addPlaylistItem(song, index) {
    const listItem = document.createElement('li');
    listItem.textContent = `${index + 1}. ${song.title} - ${song.artist}`;
    listItem.setAttribute('tabindex', '0'); //Делаем элемент доступным для фокусировки
    listItem.setAttribute('role', 'button'); //Определяем роль элемента как кнопки

    listItem.addEventListener('click', () => {
        songIndex = index;
        loadSong(song);
        playSong();
    });
    //Событие для обработки нажатия Enter (для пользователей клавиатуры)
    listItem.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') { //Проверяем нажатие Enter или Space
            songIndex = index;
            loadSong(song);
            playSong();
        }
    });

    playlistElement.appendChild(listItem);
}

//Обработчик событий клавиатуры
document.addEventListener('keydown', function(event) {
        if (event.code === 'ArrowRight') {
            nextSong();
        } else if (event.code === 'ArrowLeft') {
            prevSong();
        } else if (event.code === 'Space') {
             if (isPlaying) {
                pauseSong();
             } else {
                playSong();
              }
        event.preventDefault();
        }
    });

// Initial song load
loadSong(songs[songIndex]);

// Add songs to playlist
songs.forEach((song, index) => addPlaylistItem(song, index));

// Event listeners
playBtn.addEventListener("click", () => {
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
audio.addEventListener("timeupdate", updateProgress);
progressContainer.addEventListener("click", setProgress);
audio.addEventListener("ended", nextSong);
