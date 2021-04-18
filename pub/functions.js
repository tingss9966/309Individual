"use strict"


//insert after a child node
function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

//process the form for adding an event to a specific day
function processForm(e) {
    if (e.preventDefault) e.preventDefault();
    const form = $$$(".userinput")
    form.setDisplay("none")
    const day = form.element.children[0].value
    const index = day.indexOf('d')
    const startDay = parseInt(day.slice(index+1))
    const ta = document.getElementsByClassName('table')
    const tableNum = parseInt(day.slice(1,index))
    const table = ta[tableNum]
    const project = document.getElementById('project')
    if (project.value === ""){
        alert("Please Enter a project name!")
        return
    }
    let num_days = parseInt(document.getElementById('num-days-to-repeat').value)
    if (document.getElementById('num-days-to-repeat').value === ""){
        num_days = Infinity
    }
    switch (document.getElementById('repeat').value){
        //case for repeating it everyday
        case "day":
            console.log(table.value)
            for (let i = startDay; i <= table.value && i<num_days+ startDay;i++){
                const newId = 'l'+tableNum+'d'+i
                const temp = document.getElementById(newId)
                const newInfo = document.createElement('p')
                newInfo.className = "event"
                newInfo.appendChild(document.createTextNode(project.value))
                insertAfter(newInfo, temp.children[0])
            }
            break
        //case for not repeating it any day
        case "none":
            const newInfo = document.createElement('p')
            newInfo.appendChild(document.createTextNode(project.value))
            const newId = 'l'+tableNum+'d'+startDay
            newInfo.className = "event"
            const selectDay = document.getElementById(newId)
            insertAfter(newInfo, selectDay.children[0])
            break
        //case for repeating it every other day
        case "otherday":
            for (let i = startDay; i <= table.value && i<num_days*2+ startDay;i+=2){
                const newId = 'l'+tableNum+'d'+i
                const newInfo = document.createElement('p')
                const temp = document.getElementById(newId)
                newInfo.className = "event"
                newInfo.appendChild(document.createTextNode(project.value))
                insertAfter(newInfo, temp.children[0])
            }
            break
        //case for repeating it every week
        case "week":
            for (let i = day; i <= table.value && i<num_days*7+ startDay;i+=7){
                const newId = 'l'+tableNum+'d'+i
                const newInfo = document.createElement('p')
                const temp = document.getElementById(newId)
                newInfo.className = "event"
                newInfo.appendChild(document.createTextNode(project.value))
                insertAfter(newInfo, temp.children[0])

            }
            break
    }
    project.value = ""
    // to check if the event added is today and added the added event to the master date
    const events = document.getElementById('events')
    const master = document.getElementById('masterDate')
    const event = document.getElementsByClassName(master.children[0].innerText)
    console.log(master.children[0].innerText)
    console.log(event)
    for (let i = 0; i< event.length;i++){
        const temp = event[i].getElementsByClassName('event')
        console.log(temp)
        for (let j = 0; j < temp.length; j++){
            if (j === 0 && i===0) {
                removeAllChildNodes(events)
            }
            const p = document.createElement('p')
            p.appendChild(document.createTextNode(temp[j].innerText))
            console.log(temp[j].innerText)
            events.appendChild(p)
        }

    }
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

const form = document.getElementById('myform')
form.addEventListener('submit', processForm)



function addListener(){
    const inputPicture = document.getElementsByClassName("pic")
    for(let i=0; i<inputPicture.length; i++) {
        inputPicture[i].addEventListener('change', addPic, false)
    }
}

//Setting the date for the month that has been selected
function setDate(the_month){
    if (the_month === 'undefined'){
        the_month = document.getElementById('month').value
    }
    let the_date = document.getElementById('date')
    removeAllChildNodes(the_date)

    for (let i = 0; i< total_day[the_month]; i++){
        const d = document.createElement('option')
        d.innerText = i+1+""
        d.value = i+1+""
        the_date.appendChild(d)
    }
}

//add images to the schedule
function addPic(){
    const f = this.files
    const file = f[0];
    const img = document.createElement('img');
    img.classList.add("obj");
    img.file = file;
    const day = this.parentElement.parentElement
    console.log(this.parentElement.parentElement)
    const numEle = day.children.length
    day.insertBefore(img, day.children[numEle-2])


    const reader = new FileReader();
    reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img);
    reader.readAsDataURL(file);

}

