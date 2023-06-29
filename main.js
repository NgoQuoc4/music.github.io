const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PlAYER_STORAGE_KEY = "F8_PLAYER";

const heading = $('header h2');
const cdThumb = $('.cd-thumb');
const audio = $('#audio');
const cd = $('.cd');
const playBtn = $('.btn-toggle-play');
const player = $('.player');
const progress = $('#progress');
const prevBtn = $(".btn-prev");
const nextBtn = $(".btn-next");
const randomBtn = $(".btn-random");
const repeatBtn = $(".btn-repeat");
const playlist = $('.playlist');

const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,

    config: {},
    // (1/2) Uncomment the line below to use localStorage
    config: JSON.parse(localStorage.getItem(PlAYER_STORAGE_KEY)) || {},


    songs: [
        {
            name: 'Set Fire To The Rain',
            singer: 'Adele',
            path: './assets/music/Adele  Set Fire To The Rain.mp3',
            imgae: './assets/img/Adele.jpg'
        },
        {
            name: 'Creepin',
            singer: 'Metro Boomin',
            path: './assets/music/Creepin.mp3',
            imgae: 'assets/img/Metro Boomin.jpg'
        },
        {
            name: 'Peaches',
            singer: 'Justin Bieber',
            path: './assets/music/Peaches.mp3',
            imgae: './assets/img/Justin Bieber.jpg'
        },
        {
            name: 'Save Your Tears',
            singer: 'The Weeknd',
            path: './assets/music/Save Your Tears.mp3',
            imgae: './assets/img/theweeknd.jpg'
        },
        {
            name: 'Comethru',
            singer: 'Jeremy Zucker',
            path: './assets/music/comethru.mp3',
            imgae: './assets/img/Jeremy Zucker.jpg'
        },
        {
            name: 'Counting Stars',
            singer: 'OneRepublic',
            path: './assets/music/Counting Stars.mp3',
            imgae: './assets/img/OneRepublic.jpg'
        },
        {
            name: 'La la la',
            singer: 'Naughty Boy',
            path: './assets/music/La la la.mp3',
            imgae: './assets/img/Naughty Boy.jpg'
        },
        {
            name: 'Payphone',
            singer: 'Maroon 5',
            path: './assets/music/Payphone.mp3',
            imgae: './assets/img/Maroon 5.jpg'
        },
        {
            name: 'Rolling in the Deep',
            singer: 'Adele',
            path: './assets/music/Rolling in the Deep.mp3',
            imgae: './assets/img/Adele.jpg'
        },
        {
            name: 'Rude',
            singer: 'MAGIC!',
            path: './assets/music/Rude.mp3',
            imgae: './assets/img/MAGIC!.jpg'
        },
        {
            name: 'Somebody That I Used To Know',
            singer: 'Gotye',
            path: './assets/music/Somebody That I Used To Know.mp3',
            imgae: './assets/img/Gotye.jpg'
        },
        {
            name: 'STAY',
            singer: 'Justin Bieber',
            path: './assets/music/STAY.mp3',
            imgae: './assets/img/Justin Bieber.jpg'
        },
        {
            name: 'I Aint Worried',
            singer: 'OneRepublic',
            path: './assets/music/I Aint Worried.mp3',
            imgae: './assets/img/OneRepublic.jpg'
        },
        {
            name: 'Sunflower',
            singer: 'Post Malone',
            path: './assets/music/Sunflower.mp3',
            imgae: './assets/img/Post Malone.jpg'
        },
        {
            name: 'Young Dumb  Broke',
            singer: 'Khalid',
            path: './assets/music/Young Dumb  Broke.mp3',
            imgae: './assets/img/Khalid.jpg'
        }
    ],

    setConfig: function (key, value) {
        this.config[key] = value;
        // (2/2) Uncomment the line below to use localStorage
        localStorage.setItem(PlAYER_STORAGE_KEY, JSON.stringify(this.config));
    },


    render: function () {
        //hàm lấy danh sách bài hát
        const htmls = this.songs.map((song, index) => {
            return `
                <div class="song ${index === this.currentIndex ? "active" : ""} " data-index="${index}">
                    <div class="thumb" style="background-image: url('${song.imgae}');"></div>
                    <div class="body">
                        <h3 class="title">${song.name}</h3>
                        <p class="author">${song.singer}</p>
                    </div>
                    <div class="option">
                        <i class="fas fa-ellipsis-h"></i>
                    </div>
                </div>
            `;
        });
        //in ra ds bài hát html
        playlist.innerHTML = htmls.join('');
    },

    defineProperties: function () {
        Object.defineProperty(this, 'currentSong', {
            get: function () {
                return this.songs[this.currentIndex];
            }
        })
    },

    handleEvent: function () {
        const cdWidth = cd.offsetWidth;
        const _this = this;

        //xử lí CD quay dừng
        const cdThumbAnimate = cdThumb.animate([
            { transform: 'rotate(360deg)' }
        ], {
            duration: 10000,
            iterations: Infinity
        })
        cdThumbAnimate.pause();


        //xử lí phóng to thu nhỏ
        document.onscroll = function () {
            const scrollTop = document.documentElement.scrollTop || window.scrollY;
            const newCdWidth = cdWidth - scrollTop;
            //cuộn cd bài hát
            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0;
            //làm mờ hi cuộn
            cd.style.opacity = newCdWidth / cdWidth;
        }
        //xử lí khi click play
        playBtn.onclick = function () {
            if (_this.isPlaying) {
                audio.pause()
            } else {
                audio.play()
            }
        }
        //khi dc play
        audio.onplay = function () {
            _this.isPlaying = true;
            player.classList.add('playing');
            cdThumbAnimate.play();
        }
        //khi dc pause
        audio.onpause = function () {
            _this.isPlaying = false;
            player.classList.remove('playing');
            cdThumbAnimate.pause();
        }
        //khi tiến độ bài hát thay đổi
        audio.ontimeupdate = function () {
            if (audio.duration) {
                const progressPercent = Math.floor((audio.currentTime / audio.duration) * 100);
                progress.value = progressPercent;
            }
        }

        //xử lí khi tua song
        progress.oninput = function (e) {
            const seekTime = (audio.duration / 100) * e.target.value;
            audio.currentTime = seekTime;
        }
        //khi next song
        nextBtn.onclick = function () {
            if (_this.isRandom) {
                _this.playRandomSong();
            } else {
                _this.nextSong();
            }
            audio.play();
            _this.render();
            _this.scrollToActiveSong();
        }

        //khi prev song
        prevBtn.onclick = function () {
            if (_this.isRandom) {
                _this.playRandomSong();
            } else {
                _this.prevSong();
            }
            audio.play();
            _this.render();
            _this.scrollToActiveSong();
        }

        //nhấn nút random
        randomBtn.onclick = function () {
            _this.isRandom = !_this.isRandom;
            _this.setConfig('isRandom', _this.isRandom);
            randomBtn.classList.toggle('active', _this.isRandom);
        }
        //nhan nut repeat
        repeatBtn.onclick = function () {
            _this.isRepeat = !_this.isRepeat;
            _this.setConfig('isRepeat', _this.isRepeat);
            repeatBtn.classList.toggle('active', _this.isRepeat);
        }
        //xu li next song khi bai hat ket thuc
        audio.onended = function () {
            if (_this.isRepeat) {
                audio.play();
            } else {
                nextBtn.click();
            }
        };
        //lang nghe click vao play list
        playlist.onclick = function (e) {
            const songNode = e.target.closest('.song:not(.active)')
            if (songNode || e.target.closest('.option')) {
                //xu li khi click vao song 
                if (songNode) {
                    _this.currentIndex = Number(songNode.dataset.index)
                    _this.loadCurrentSong();
                    _this.render();
                    audio.play();

                }
                //xu li khi click vao song option
                if (e.target.closest('.option')) {

                }
            }
        }
    },
    //keo ds den song active
    scrollToActiveSong: function () {
        setTimeout(() => {
            $('.song.active').scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
            })
        })
    },
    //load du lieu bai hat
    loadCurrentSong: function () {
        heading.textContent = this.currentSong.name
        cdThumb.style.backgroundImage = `url('${this.currentSong.imgae}')`
        audio.src = this.currentSong.path

    },

    loadConfig: function () {
        this.isRandom = this.config.isRandom
        this.isRepeat = this.config.isRepeat

    },
    //khi prev song
    prevSong: function () {
        this.currentIndex--
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1;
        }
        this.loadCurrentSong();
    },
    //khi next song
    nextSong: function () {
        this.currentIndex++;
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0;
        }
        this.loadCurrentSong();
    },
    //play random song
    playRandomSong: function () {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * this.songs.length);
        } while (newIndex === this.currentIndex)
        this.currentIndex = newIndex;
        this.loadCurrentSong();
    },

    start: function () {
        //gan cau hinh tu config vao ung dung
        this.loadConfig();
        //định nghĩa các thuộc tính cho object
        this.defineProperties();
        //lắng nghe sự kiện
        this.handleEvent();
        //tải thông tin bài hát đầu tiên vào UI
        this.loadCurrentSong();
        //lấy ds bài hát
        this.render();
        //hien thi trang thai ban dau cua button repeat & random
        randomBtn.classList.toggle('active', _this.isRandom);
        repeatBtn.classList.toggle('active', _this.isRepeat);
    }

}
app.start();