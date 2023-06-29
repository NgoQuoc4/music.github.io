const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const heading = $('header h2');
const cdThumb = $('.cd-thumb');
const audio = $('#audio');
const cd = $('.cd');
const playBtn = $('.btn-toggle-play');
const player = $('.player');
const progress = $('#progress');
const prevBtn = $(".btn-prev");
const nextBtn = $(".btn-next");
const app = {
    currentIndex: 0,
    isPlaying: false,
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
            name: 'Save Your Tears',
            singer: 'The Weeknd',
            path: './assets/music/Save Your Tears.mp3',
            imgae: './assets/img/theweeknd.jpg'
        }, {
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
            name: 'Save Your Tears',
            singer: 'The Weeknd',
            path: './assets/music/Save Your Tears.mp3',
            imgae: './assets/img/theweeknd.jpg'
        }, {
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
            name: 'Save Your Tears',
            singer: 'The Weeknd',
            path: './assets/music/Save Your Tears.mp3',
            imgae: './assets/img/theweeknd.jpg'
        }
    ],
    render: function () {
        //hàm lấy danh sách bài hát
        const htmls = this.songs.map(song => {
            return `
                <div class="song">
                    <div class="thumb" style="background-image: url('${song.imgae}');"></div>
                    <div class="body">
                        <h3 class="title">${song.name}</h3>
                        <p class="author">${song.singer}</p>
                    </div>
                    <div class="option">
                        <i class="fas fa-ellipsis-h"></i>
                    </div>
                </div>
            `
        })
        //in ra ds bài hát html
        $('.playlist').innerHTML = htmls.join('');
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
            const progressPercent = Math.floor((audio.currentTime / audio.duration) * 100)
            progress.value = progressPercent;
        }
        //xử lí khi tua song
        progress.oninput = function (e) {
            const seekTime = (audio.duration / 100) * e.target.value;
            audio.currentTime = seekTime;
        }
        //khi next song
        nextBtn.onclick = function () {
            _this.nextSong();
            audio.play();
        }
        //khi prev song
        prevBtn.onclick = function () {
            _this.prevSong();
            audio.play();
        }

    },
    //load du lieu bai hat
    loadCurrentSong: function () {
        heading.textContent = this.currentSong.name
        cdThumb.style.backgroundImage = `url('${this.currentSong.imgae}')`
        audio.src = this.currentSong.path

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
    start: function () {
        //định nghĩa các thuộc tính cho object
        this.defineProperties();
        //lắng nghe sự kiện
        this.handleEvent();
        //tải thông tin bài hát đầu tiên vào UI
        this.loadCurrentSong();
        //lấy ds bài hát
        this.render();
    }

}
app.start();