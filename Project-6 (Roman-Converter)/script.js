const form = document.querySelector("form")
const outputEl = document.querySelector("#output")
const convertBtn = document.querySelector("#convert-btn")

const romanNumRef = [
    {
        val: 1000,
        sym: "M"
    },
    {
        val: 900,
        sym: "CM"
    },
    {
        val: 500,
        sym: "D"
    },
    {
        val: 400,
        sym: "CD"
    },
    {
        val: 100,
        sym: "C"
    },
    {
        val: 90,
        sym: "XC"
    },
    {
        val: 50,
        sym: "L"
    },
    {
        val: 40,
        sym: "XL"
    },
    {
        val: 10,
        sym: "X"
    },
    {
        val: 9,
        sym: "IX"
    },
    {
        val: 5,
        sym: "V"
    },
    {
        val: 4,
        sym: "IV"
    },
    {
        val: 1,
        sym: "I"
    }
]

const numToRoman = (input) => {
    let result = ""
    for (let i = 0; i < romanNumRef.length; i++) {
        while (input >= romanNumRef[i].val) {
            result += romanNumRef[i].sym
            input -= romanNumRef[i].val
            if (input === 0) {
                outputEl.innerText = result
                return
            }
        }
    }
}

const validateNum = (input) => {
    if (isNaN(input) || input === "") {
        outputEl.innerText = "Please enter a valid number"
    } else if (input <= 0) {
        outputEl.innerText = "Please enter a number greater than or equal to 1"
    } else if (input >= 4000) {
        outputEl.innerText = "Please enter a number less than or equal to 3999"
    } else {
        numToRoman(input)
    }
}

const resetInput = () => {
    document.querySelector("#number").value = ""
}


form.addEventListener("submit", (e) => {
    e.preventDefault()
})

convertBtn.addEventListener("click", () => {
    const inputVal = parseInt(document.querySelector("#number").value)

    validateNum(inputVal)
    setTimeout(resetInput, 2000)
})