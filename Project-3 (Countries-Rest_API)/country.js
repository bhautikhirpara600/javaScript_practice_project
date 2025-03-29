const countryName = new URLSearchParams(window.location.search).get("name")
const backBtn = document.querySelector(".back-btn")
const flagImgEl = document.querySelector(".country-flag")
const countryNameEl = document.querySelector(".country-name")
const nativeNameEl = document.querySelector(".native-name")
const populationEl = document.querySelector(".population")
const regionEl = document.querySelector(".region")
const subregionEl = document.querySelector(".subregion")
const capitalEl = document.querySelector(".capital")
const topLevelDomainEl = document.querySelector(".top-level-domain")
const currencyEl = document.querySelector(".currency")
const languageEl = document.querySelector(".language")
const borderCountryDiv = document.querySelector(".border-country")
const homeEl = document.querySelector(".home")
const mode = document.querySelector(".mode")
const modeText = document.querySelector(".mode-text")
const modeIcon = document.querySelector("#mode-icon")

const checkMode = JSON.parse(localStorage.getItem("myMode")) || {}

if(checkMode.dark) {
    document.body.classList.add("dark")
} else {
    modeText.innerText = "Light"
    modeIcon.classList.remove("fa-moon")
    modeIcon.classList.add("fa-sun")
}

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

backBtn.addEventListener("click", () => history.back())
homeEl.addEventListener("click", () => location.href = "/")

fetch(`https://restcountries.com/v3.1/all`)
    .then(res => res.json())
    .then((data) => {
        const countryArr = data.filter((countryObj) => countryObj.name.common === countryName )
        const [country] = countryArr
        flagImgEl.src = country.flags.svg
        flagImgEl.alt = `${country.name.common}-flag`
        countryNameEl.innerText = `${country.name.common}`
        populationEl.innerText = country.population.toLocaleString("en-in")
        regionEl.innerText = country.region

        if(country.name.nativeName) { nativeNameEl.innerText = Object.values(country.name.nativeName)[0].common }
        else { nativeNameEl.innerText = "Not Available" }

        if(country.subregion) { subregionEl.innerText = country.subregion }
        else { subregionEl.innerText = "Not Available" }

        if(country.capital) { capitalEl.innerText = country.capital.join(", ") }
        else { capitalEl.innerText = "Not Available" }

        if(country.tld) { topLevelDomainEl.innerText = country.tld }
        else { topLevelDomainEl.innerText = "Not Available" }

        if(country.currencies) { currencyEl.innerText = Object.values(country.currencies)[0].name }
        else { currencyEl.innerText = "Not Available" }

        if(country.languages) { languageEl.innerText = Object.values(country.languages).join(", ") }
        else { languageEl.innerText = "Not Available" }

        if(country.borders) {
            country.borders.forEach((countryCode) => {
                fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`)
                    .then(res => res.json())
                    .then(([borderCountry]) => {
                        const borderCountryHtml = `
                        <a class="clickable country-text" href="/country.html?name=${borderCountry.name.common}">${borderCountry.name.common}</a>
                    `
                    borderCountryDiv.innerHTML += borderCountryHtml
                })
            })
        }
        else {
            borderCountryDiv.innerHTML += "Not Available"
        }
    })


