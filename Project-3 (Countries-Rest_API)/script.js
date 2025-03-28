const dropdownMenu = document.querySelector(".dropdown-menu")
const dropdownContainer = document.querySelector(".dropdown-container")
const countryContainer = document.querySelector(".country-container")

dropdownMenu.addEventListener("click", () => {
    dropdownContainer.classList.toggle("show")
})

fetch ('https://restcountries.com/v3.1/all')
    .then(res => res.json())
    .then(data => {
        data.forEach((country) => {
            // console.log(country.name.common);
            // console.log(country.borders);
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
    })