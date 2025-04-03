const inputEl = document.querySelector(".input-date")
const curTime = Date.now()
const btn = document.querySelector(".btn")
const birthDetail = document.querySelector(".birth-detail")
const audioEl = document.querySelector("#my-audio")
const notice = document.querySelector(".notice")


btn.addEventListener("click", () => {
    if (inputEl.value.includes("-") && !inputEl.value.includes(" ")) {
        const birthdateInMs = Date.parse(inputEl.value.split("-").reverse().join("-"))
        const yearInMs = curTime - birthdateInMs
        const year = document.querySelector("#year")

        year.innerText = checkYear()
        birthDetail.classList.add("show")

        function checkYear() {
            let days = Math.floor(yearInMs / 1000 / 60 / 60 / 24)
            let year = Math.floor(days / 365)
            let leapYear = Math.floor(year / 4)
            let yearToDay = year * 365
            let backMonth = days - yearToDay
            let month = Math.floor(backMonth / 365 * 12)
            let monthToDay = Math.floor(month * 30.4)
            let backDays = Math.floor(days - yearToDay - monthToDay - leapYear)
            if (backDays < 0) {
                month = month - 1
                backDays = 31 + backDays
                return `${year} Year ${month} Month ${backDays} Days`
            }
            return `${year} Year ${month} Month ${backDays} Days`
        }
    } else {
        notice.classList.add("show")
        audioEl.play()
        setTimeout(() => {
            notice.classList.remove("show")
        },5000)
    }
})
