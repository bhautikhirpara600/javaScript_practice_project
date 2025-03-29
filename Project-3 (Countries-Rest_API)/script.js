const dropdownMenu = document.querySelector(".dropdown-menu")
const dropdownContainer = document.querySelector(".dropdown-container")
const countryContainer = document.querySelector(".country-container")
const inputEl = document.querySelector(".search-input")
const dropDownValueEl = document.querySelector(".dropdown-value")
const dropdownText = document.querySelector("#dropdown-text")
const homeEl = document.querySelector(".home")
const mode = document.querySelector(".mode")
const modeText = document.querySelector(".mode-text")
const modeIcon = document.querySelector("#mode-icon")
let allCountriesData

const checkMode = JSON.parse(localStorage.getItem("myMode")) || {}

if(checkMode.dark) {
    document.body.classList.add("dark")
} else {
    modeText.innerText = "Light"
    modeIcon.classList.remove("fa-moon")
    modeIcon.classList.add("fa-sun")
}

homeEl.addEventListener("click", () => location.href = "/")

dropdownMenu.addEventListener("click", () => {
    dropdownContainer.classList.toggle("show")
})

dropdownContainer.addEventListener("click", (e) => {
    e.stopPropagation()
})

window.addEventListener("click", () => {
    dropdownContainer.classList.remove("show")
})

mode.addEventListener("click", () => {
    document.body.classList.toggle("dark")
    if(document.body.className === "dark") {
        const checkMode = { dark: true }
        modeText.innerText = "Dark"
        modeIcon.classList.remove("fa-sun")
        modeIcon.classList.add("fa-moon")
        localStorage.setItem("myMode", JSON.stringify(checkMode))
    } else {
        const checkMode = { dark: false }
        modeText.innerText = "Light"
        modeIcon.classList.remove("fa-moon")
        modeIcon.classList.add("fa-sun")
        localStorage.setItem("myMode", JSON.stringify(checkMode))
    }
})

function update(countryArr) {
    countryContainer.innerHTML = ""
    countryArr.forEach((country) => {
        const countryCard = document.createElement("a")
        countryCard.classList.add("country-card", "clickable")
        countryCard.href = `/country.html?name=${country.name.common}`
        countryCard.innerHTML = `
            <div class="flag-img-div">
                <img class="flag-img" src="${country.flags.svg}" alt="${country.name.common}-flag">
            </div>
            <div class="country-card-text">
                <h3 class="country-name">${country.name.common}</h3>
                <p><b>Population:</b> <span class="population">${country.population.toLocaleString("en-in")}</span></p>
                <p><b>Region:</b> <span class="region">${country.region}</span></p>
                <p><b>Capital:</b> <span class="capital">${country.capital}</span></p>
            </div>`
        countryContainer.append(countryCard)
    })
}

fetch ('https://restcountries.com/v3.1/all')
    .then(res => res.json())
    .then(data => {
        update(data)
        allCountriesData = data
    })

inputEl.addEventListener("input", (e) => {
    const countryName = e.target.value.toLowerCase()
    const searchBarCountry = allCountriesData.filter((country) => country.name.common.toLowerCase().includes(countryName))
    update(searchBarCountry)
})

dropDownValueEl.addEventListener("click", (e) => {
    if (e.target !== e.currentTarget) {
        dropdownText.innerText = e.target.innerText
        if(e.target.innerText === "All Region") {
            location.href = "/"
        }
        fetch(`https://restcountries.com/v3.1/region/${e.target.innerText}`)
        .then(res => res.json())
        .then(update)
    } else {
        alert("Click on Region...!")
    }
})