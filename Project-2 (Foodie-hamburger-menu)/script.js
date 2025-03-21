const headerDiv = document.querySelector(".header-div")
const hamburgerMenu = document.querySelector(".hamburger-menu")
const crossIcon = document.querySelector(".cross-icon")
const navigation = document.querySelector(".navigation")

hamburgerMenu.addEventListener("click", (e) => {
    headerDiv.classList.add("show-nav")
    e.stopPropagation()
})

crossIcon.addEventListener("click", () => {
    headerDiv.classList.remove("show-nav")
})

document.body.addEventListener("click", () => {
    headerDiv.classList.remove("show-nav")
})

navigation.addEventListener("click", (e) => {
    e.stopPropagation()
})