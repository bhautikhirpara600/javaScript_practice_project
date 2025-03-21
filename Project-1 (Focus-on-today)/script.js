const allCheckboxEl = document.querySelectorAll(".checkbox")
const allInputEl = document.querySelectorAll(".input-text")
const notice = document.querySelector(".notice")
const btnDiv = document.querySelector(".add-n-reset-btn")
const resetBtn = document.querySelector("#reset-btn")
const tracker = document.querySelector(".tracker")
const addBtn = document.querySelector("#add-btn")
const displayedInputEl = [...allInputEl].filter((input) => input.className == "input-text show")

const myGoals = JSON.parse(localStorage.getItem("goalData")) || {}
let completedGoalCount = Object.values(myGoals).filter((goal) => goal.completed).length
let inputCount = Object.values(myGoals).filter((goal) => goal.display).length
let myInput = Object.values(myGoals).filter((goal) => goal.display) // important point

tracker.style.width = `${completedGoalCount / inputCount * 100}%`
tracker.children[0].innerText = `${completedGoalCount}/${inputCount} Completed`

const showBtn = () => {
    if (displayedInputEl.every((input) => input.value)) {
        btnDiv.classList.remove("hidden")
    }
}

const resetApp = () => {
    localStorage.clear()
    location.reload()
}

allInputEl.forEach((input) => {
    if (myGoals[input.id]) {
        input.value = myGoals[input.id].goal
        if (myGoals[input.id].completed) {
            input.parentElement.classList.add("completed")
        }
        showBtn()
        if (myGoals[input.id].display === "show") {
            input.parentElement.classList.remove("remove")
            input.classList.add("show")
        }        
    }

    input.addEventListener("focus", () => {
        notice.classList.add("hidden")
    })

    input.addEventListener("input", (e) => {
        if (myGoals[input.id] && myGoals[input.id].completed) {
            input.value = myGoals[input.id].goal
            return
        }
        myGoals[input.id] = {
            goal: e.target.value,
            completed: false,
            display: "show",
        }
        inputCount = Object.values(myGoals).filter((goal) => goal.display).length
        myInput = Object.values(myGoals).filter((goal) => goal.display) // important point
        localStorage.setItem("goalData", JSON.stringify(myGoals))
        showBtn()
    })
})

allCheckboxEl.forEach((checkbox) => {
    checkbox.addEventListener("click", () => {
        if ([...allInputEl].filter((input) => input.className == "input-text show").every((input) => input.value)) {
            checkbox.parentElement.classList.add("completed")
            const inputId = checkbox.nextElementSibling.id
            myGoals[inputId].completed = true
            completedGoalCount = Object.values(myGoals).filter((goal) => goal.completed).length
            tracker.style.width = `${completedGoalCount / inputCount * 100}%`
            tracker.children[0].innerText = `${completedGoalCount}/${inputCount} Completed`
            localStorage.setItem("goalData", JSON.stringify(myGoals))
        } else {
            notice.innerText = `Please set all the ${[...allInputEl].filter((input) => input.className == "input-text show").length} goals!`
            notice.classList.remove("hidden")
        }
    })
})


addBtn.addEventListener("click", () => {
    let totalInputCount = inputCount
    if (totalInputCount === 3) {
        const input4 = document.querySelector("#goal-4")
        input4.parentElement.classList.remove("remove")
        input4.classList.add("show")
    } else if (totalInputCount === 4) {
        const input5 = document.querySelector("#goal-5")
        input5.parentElement.classList.remove("remove")
        input5.classList.add("show")
    } else if (totalInputCount > 4){
        alert("You can add only 5 Goals...!")
    }
})

resetBtn.addEventListener("click", () => {
    resetApp()
})