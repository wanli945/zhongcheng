const boxM = document.querySelector("#musicListen");
const closeM = document.querySelector("#musicListen #closeMusic");
const musicBox = document.querySelector("#musicListen  #musicBox");
const musicM = document.querySelector("#musicListen #musicBox audio");


export default {
    open: (src) => {
        musicM && musicM.pause();
        musicM.src = src;
        boxM.style.display = "flex";
    },
    close: () => {
        musicM && musicM.pause();

        setTimeout(() => {
            musicM.src = "";
            boxM.style.display = "none";
        })
    }
}
