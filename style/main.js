window.addEventListener("load", () => {
  const $ = document.querySelector.bind(document);
  const $$ = document.querySelectorAll.bind(document);
  /*light-dark*/
  let btn_light_dark = $(".light_dark");
  let conten_dark = $(".conten");
  let menu_dark = $(".app");
  let infor_dark = $(".infor");
  const musicList = $(".wrap_music");
  btn_light_dark.addEventListener("change", () => {
    conten_dark.classList.toggle("dark");
    menu_dark.classList.toggle("dark");
    infor_dark.classList.toggle("dark");
  });
  /*end light-dark*/
  /*control song*/
  const timeConLai = $(".conlai");
  const timeDaChay = $(".dachay");
  const rangeTimer = $(".range_time");
  const arraySong = [
    {
      id: 0,
      name: "Lãng Du",
      file: "Lãng Du.mp3",
      img: "style/img/tl1.jpg",
      singer: "TayNguyenSound",
      active: true,
      time: "3:33",
    },
    {
      id: 1,
      name: "Ghé qua",
      file: "Ghé Qua.mp3",
      img: "style/img/anh2.jpg",
      singer: "TayNguyenSound",
      active: false,
      time: "4:28",
    },
    {
      id: 2,
      name: "Mắt biếc",
      file: "Mắt biếc.mp3",
      img: "style/img/anh3.jpg",
      singer: "TayNguyenSound",
      active: false,
      time: "3:46",
    },
    {
      id: 3,
      name: "Cỏ gió và mây",
      file: "Cỏ gió Và Mây.mp3",
      img: "style/img/img1.jpg",
      singer: "TayNguyenSound",
      active: false,
      time: "4:33",
    },
    {
      id: 4,
      name: "Until You",
      file: "Until You.mp3",
      img: "style/img/Until You.jpg",
      singer: "Shayne Ward",
      active: false,
      time: "4:09",
    },
  ];
  /* time*/
  let indexSong = 0;
  function displayTime() {
    const { duration, currentTime } = song;

    timeDaChay.textContent = chinhTime(currentTime);
    rangeTimer.max = duration;
    rangeTimer.value = currentTime;
    if (!duration) {
      timeConLai.textContent = "00:00";
    } else {
      timeConLai.textContent = chinhTime(duration);
    }
  }
  arraySong.forEach((item) => {
    let template = `<ul class ="list ${
      item.active ? "active" : ""
    } "data-index= ${item.id}>
    <li class='stt fas'>${item.id + 1}</li>
    <li class="name_music">${item.name}</li>
    <li class='name_band'>${item.singer}</li>
    <li class='time'>${item.time}</li>
    <li class="album_music">ALBUM</li>
    </ul>`;
    musicList.insertAdjacentHTML("beforeend", template);
  });
  const listMusic = $(".header_playlist");
  listMusic.addEventListener("click", handChoseMusic);
  function handChoseMusic(e) {
    const parentNode = e.target.parentNode;
    let indexDataSong = parentNode.getAttribute("data-index");
    let nodeHaveActive = musicList.querySelectorAll(".active");
    [...nodeHaveActive].forEach((item) => item.classList.remove("active"));
    parentNode.classList.add("active");
    addIcon();
    song.setAttribute("src", `music/${arraySong[indexDataSong].file}`);
    isPlaying = true;
    innit(indexDataSong);
    indexSong = parseInt(indexDataSong);
    playPause();
  }
  function addIcon() {
    let stt = $$(".stt");
    [...stt].forEach((item) => {
      if (item.parentNode.matches(".active")) {
        item.textContent = "";
        item.insertAdjacentHTML(
          "beforeend",
          '<i class="vlIcon fas fa-volume-up"></i>'
        );
      } else {
        item.textContent = "";
        item.textContent = `${
          parseInt(item.parentNode.getAttribute("data-index")) + 1
        }`;
      }
    });
  }
  const song = $("#song");
  let leghtArray = arraySong.length;
  const play_pause = $(".wrap_btn_play");
  const play_back = $(".ti-control-skip-backward");
  const play_next = $(".ti-control-forward");
  const musicName = $(".nameSong");
  const imgMusic = $(".img_music");
  const nameSinger = $(".nameSinger");
  displayTime();
  let setTimer;
  play_pause.addEventListener("click", playPause);
  play_back.addEventListener("click", () => {
    chageSong(-1);
  });
  play_next.addEventListener("click", () => {
    chageSong(1);
  });
  //next bai khi het time
  song.addEventListener("ended", endMusicNext);
  function endMusicNext() {
    if (isRepeat === true) {
      isPlaying = true;
      playPause();
    } else chageSong(1);
  }
  //
  function chageSong(check) {
    let listMusicActive = $$(".list");
    console.log(listMusicActive);
    listMusicActive.forEach((item) => item.classList.remove("active"));
    switch (check) {
      case 1:
        indexSong++;
        addIcon();
        if (indexSong > leghtArray - 1) indexSong = 0;
        listMusicActive[indexSong].classList.add("active");
        isPlaying = true;
        break;
      case -1:
        indexSong--;
        addIcon();
        if (indexSong < 0) indexSong = leghtArray - 1;
        listMusicActive[indexSong].classList.add("active");
        isPlaying = true;
        break;
      case 3:
        indexSong = Math.floor(Math.random() * arraySong.length);
        isPlaying = true;
        break;
      default:
        break;
    }
    innit(indexSong);
    playPause();
  }
  let isPlaying = true;
  function playPause() {
    if (isPlaying) {
      song.play();
      addIcon();
      play_pause.innerHTML = `<i class="far fa-pause-circle pause_play"></i>`;
      isPlaying = false;
      setTimer = setInterval(displayTime, 500);
    } else {
      song.pause();
      play_pause.innerHTML = `<i class="far fa-play-circle pause_play"></i>`;
      isPlaying = true;
      clearInterval(setTimer);
    }
  }
  //xao bai
  let shuffle = $(".shuffle");
  shuffle.addEventListener("click", shuffleSong);
  var isShuffle = false;
  function shuffleSong() {
    if (isShuffle == false) {
      isShuffle = true;
      shuffle.style.color = "yellow";
      chageSong(3);
    } else {
      isShuffle = false;
      shuffle.style.color = "#676669";
    }
  }
  //lap bai ;
  var isRepeat = false;
  let playRepeat = $(".loop");
  playRepeat.addEventListener("click", () => {
    if (playRepeat.style.color != "yellow") {
      playRepeat.style.color = "yellow";
      isRepeat = true;
    } else {
      playRepeat.style.color = "#676669";
      isRepeat = false;
    }
  });
  function chinhTime(number) {
    const phut = Math.floor(number / 60);
    const giay = Math.floor(number - phut * 60);
    return `${phut < 10 ? "0" + phut : phut}:${giay < 10 ? "0" + giay : giay}`;
  }

  // chinh time//

  rangeTimer.addEventListener("change", setTimerMusic);
  function setTimerMusic() {
    song.currentTime = rangeTimer.value;
  }
  function innit(indexSong) {
    song.setAttribute("src", `music/${arraySong[indexSong].file}`);
    imgMusic.setAttribute("src", arraySong[indexSong].img);
    musicName.textContent = arraySong[indexSong].name;
    nameSinger.textContent = arraySong[indexSong].singer;
  }
  displayTime();
  innit(indexSong);
  //mobile
  const btnActiveMenu = $(".rs-menu");
  const activeMenu = $(".menu");
  const btnActiveInfor = $(".rs-infor");
  const activeInfor = $(".infor");
  let flag;
  btnActiveMenu.addEventListener("click", () => {
    activeMenu.classList.add("active");
    flag = 1;
  });
  btnActiveInfor.addEventListener("click", () => {
    activeInfor.classList.add("active");
    flag = -1;
  });
  document.addEventListener("click", function (e) {
    if (!flag) return;
    switch (flag) {
      case 1:
        if (!activeMenu.contains(e.target) && !e.target.matches(".rs-menu")) {
          activeMenu.classList.remove("active");
          flag = -1;
        }
        break;
      case -1:
        if (!activeInfor.contains(e.target) && !e.target.matches(".rs-infor")) {
          activeInfor.classList.remove("active");
          flag = 1;
        }
        break;

      default:
        break;
    }
  });
});
