const audioEl = document.querySelector("#my-audio")
const btnEl = document.querySelector(".btn")
const inputEl = document.querySelector(".input-text")
const qrImg = document.querySelector(".qr-img")
const qrImgDiv = document.querySelector(".qr-img-div")
const notice = document.querySelector(".notice")

btnEl.addEventListener("click", () => {
    if(inputEl.value.length > 0) {
        const qrText = inputEl.value
        qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${qrText}`
        inputEl.value = ""
        qrImgDiv.classList.add("show")
        setTimeout(() => {
            qrImgDiv.classList.remove("show")
            location.reload()
        },10000)
    } else {
        notice.classList.add("show")
        audioEl.play()
        setTimeout(() => {
            notice.classList.remove("show")
        },7000)
    }
})