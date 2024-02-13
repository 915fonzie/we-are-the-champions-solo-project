// javascript
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js'
import { getDatabase, ref, push, onValue, remove } from 
'https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js'

const appSettings = {
    dataBaseURL: "https://realtime-database-1afdb-default-rtdb.firebaseio.com/",
    projectId: "realtime-database-1afdb"
}
const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementsInDB = ref(database, "Endorsements")

const publishBtn = document.getElementById("publish-btn")
const endorsementInputEl = document.getElementById("endorsement-input")
const fromInputEl = document.getElementById("from-input")
const toInputEl = document.getElementById("to-input")
const errorEl = document.getElementById("error-el")
const endorsementsListEl = document.getElementById("endorsements-list")

publishBtn.addEventListener("click", function(){
    let endorsementInput = endorsementInputEl.value
    let fromInput = fromInputEl.value
    let toInput = toInputEl.value
    let allInputs = {endorsement: endorsementInput, from: fromInput, to: toInput}

    if(endorsementInput === "" || fromInput === "" || toInput === ""){
        errorEl.textContent = "Please make sure to fill in all fields before publishing"
    } else {
        errorEl.textContent = ""
        push(endorsementsInDB, allInputs)
    }
})

onValue(endorsementsInDB, function(snapshot){
    if(snapshot.exists()){
        clearEndorsements()
        let itemsArray = Object.entries(snapshot.val())

        for(let i = 0; i < itemsArray.length; i++){
            let currentItem = itemsArray[i]
            appendItemToEndorsementsList(currentItem)
        }

    } else {
        endorsementsListEl.innerHTML = "Currently no endorsements have been added"
    }
})

function clearEndorsements() {
    endorsementsListEl.innerHTML = ""
}

function clearInputFields() {
    endorsementInputEl.value = ""
    fromInputEl.value = ""
    toInputEl.value = ""
}

function appendItemToEndorsementsList(item){
    let itemID = item[0]
    let itemEndorsementValue = item[1].endorsement
    let itemToValue = item[1].to
    let itemFromValue = item[1].from

    let newListEl = addElement("li")
    let newToEl = addElement("h3")
    let newParagraphEl = addElement("p")
    let newFromEl = addElement("h3")

    newParagraphEl.textContent = itemEndorsementValue
    newToEl.textContent = `From: ${itemToValue}`
    newFromEl.textContent = `To: ${itemFromValue}`

    newListEl.append(newFromEl)
    newListEl.append(newParagraphEl)
    newListEl.append(newToEl)
    endorsementsListEl.append(newListEl)
}

function addElement(element){
    return document.createElement(element)
}