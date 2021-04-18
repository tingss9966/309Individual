"use strict"

let day = 0
//The total months in a year
let total_month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
let total_day = {}

function create_days()
{
    for (let i = 0; i < 12; i++){
        if (i === 0 || i === 2 || i === 4 || i === 6 || i===7 || i ===9 || i===11){
            total_day[total_month[i]] = 31
        }else if (i===1){
            total_day[total_month[i]] = 28
        }else{
            total_day[total_month[i]] = 30
        }
    }
}

//JQuery code that lets it easier to access objects in DOM
function $$$(selector) {

    const _self = {}
    _self.selector = selector
    _self.element = document.querySelector(selector)

    _self.text = function() {
        return _self.element.innerText
    }

    _self.addClass = function(className) {
        if (!_self.element.classList.contains(className)) {
            _self.element.classList.add(className)
        }
    }

    _self.attr = function(name, value) {
        if (!value) {
            return _self.element.getAttribute(name)
        } else {
            _self.element.setAttribute(name, value)
        }
    }

    _self.setDisplay = function (display){

        _self.element.style.display = display
    }



    return _self
}


function ScheduleGenerator(){

    this.schedule = []


}

ScheduleGenerator.prototype={

    //To initialize the selection for the schedules
    //including the forms to add more schedule and adding forms to add events
    init: function (){
        //creating a form to input the event
        const div = document.createElement('div')
        const form = document.createElement('form')
        const input = document.createElement('input')

        //creating selection that allow the users to select on how many time to repeat
        const select = document.createElement('select')
        const opion = document.createElement('option')
        const opion1 = document.createElement('option')
        const opion2 = document.createElement('option')
        const opion3 = document.createElement('option')
        const submit = document.createElement('input')
        const numDays = document.createElement('input')
        const quit = document.createElement('button')
        const day = document.createElement('h4')

        //creating a form to add a new schedule
        const createDiv = document.createElement('div')
        const createForm = document.createElement('form')
        const createInput = document.createElement('input')
        const createSubmit = document.createElement('input')
        const month = document.createElement('select')
        const date = document.createElement('select')
        const year = document.createElement('input')
        const project_name = document.createElement('input')

        //The master date at the top that shows what you have planed for today
        const master_date = document.createElement('div')
        let today = new Date();
        master_date.id = "masterDate"
        const cur_date = document.createElement('label')
        cur_date.appendChild(document.createTextNode(total_month[today.getMonth()]+today.getDate()+""))
        master_date.appendChild(cur_date)
        const events = document.createElement('div')
        events.id = "events"
        master_date.appendChild(events)
        events.value = total_month[today.getMonth()]+today.getDate()+""

        //Setting up the selection for the input of day and month of the project
        date.id = "date"
        month.id = "month"
        year.id = "year"
        year.type = "number"
        create_days()
        for (let i = 0; i< total_month.length; i++){
            const m = document.createElement('option')
            m.innerText = total_month[i]
            m.value = total_month[i]
            month.appendChild(m)
        }

        for (let i = 0; i< total_day["January"]; i++){
            const d = document.createElement('option')
            d.innerText = i+1+""
            d.value = i+1+""
            date.appendChild(d)
        }
        const the_month = 'undefined'
        month.onchange = function (){setDate(the_month)}


        //Adding parameters for the form of adding schedules
        project_name.type = "text"
        project_name.placeholder = "Sample Project"
        project_name.id = "project_name"
        createForm.id = "create-form"
        createInput.type = "number"
        createInput.id = "numDays"
        createSubmit.type = "submit"
        createSubmit.value = "Add Schedule"
        createInput.placeholder = "Number"
        year.placeholder = "Year(Between 2019, 2099)"
        createForm.appendChild(document.createTextNode("Project Name: "))
        createForm.appendChild(project_name)
        createForm.appendChild(document.createElement('br'))
        createForm.appendChild(document.createTextNode("Number of Days "))
        createForm.appendChild(createInput)
        createForm.appendChild(document.createElement('br'))
        createForm.appendChild(document.createTextNode("Month:"))
        createForm.appendChild(month)
        createForm.appendChild(document.createElement('br'))
        createForm.appendChild(document.createTextNode("Date: "))
        createForm.appendChild(date)
        createForm.appendChild(document.createElement('br'))
        createForm.appendChild(document.createTextNode("Year: "))
        createForm.appendChild(year)
        createForm.appendChild(document.createElement('br'))
        createForm.appendChild(createSubmit)
        createForm.appendChild(document.createElement('br'))
        createDiv.appendChild(createForm)
        const kk = this
        //adding event listener that will creating schedules whe the forms arr submitted
        createForm.addEventListener('submit', function (e){
            if (e.preventDefault) e.preventDefault();
            const days = document.getElementById('numDays')
            const month = document.getElementById('month')
            const date = document.getElementById('date')
            const year = document.getElementById('year')
            const name = document.getElementById('project_name')
            if (days.value === "" || year.value === "" ||  parseInt(year.value)<2019 ||  parseInt(year.value)> 2100){
                alert("Please Enter Correct information")
            }else{
                kk.makeSchedule(parseInt(days.value), month.value, parseInt(date.value), parseInt(year.value),name.value)
                addListener()
                days.value = ""
                year.value = ""
            }
        })

        //adding parameters for the form that adds events to dates that is hidden
        submit.type = 'submit'
        submit.value = "Submit"
        opion1.value = 'day'
        opion1.innerText = "Every Day"
        opion2.value = 'otherday'
        opion2.innerText = "Every Other Day"
        opion3.value = 'week'
        opion3.innerText = "Every Week"
        opion.value = 'none'
        opion.innerText = "None"
        numDays.type = "number"
        numDays.placeholder = "Number of days"
        numDays.id = "continueDays"
        select.appendChild(opion)
        select.appendChild(opion1)
        select.appendChild(opion2)
        select.appendChild(opion3)

        select.id = 'repeat'
        input.id = 'project'
        form.id = "myform"
        //div.style.display = "none"
        div.className = 'userinput'
        input.type = "text"
        input.placeholder = "hello"
        quit.innerText = 'cancel'
        select.id = "repeat"
        numDays.id = "num-days-to-repeat"
        quit.onclick = function (){
            const form = $$$(".userinput")
            form.setDisplay('none')
        }

        //Adding everything to the body
        form.appendChild(document.createTextNode("Event Name: "))
        form.appendChild(input)
        form.appendChild(document.createElement('br'))
        form.appendChild(document.createTextNode("Repeat: "))
        form.appendChild(select)
        form.appendChild(document.createElement('br'))
        form.appendChild(document.createTextNode("Number of Days to repeat: "))
        form.appendChild(numDays)
        form.appendChild(document.createElement('br'))
        form.appendChild(submit)
        form.appendChild(quit)


        div.appendChild(day)
        div.appendChild(form)
        const body = $('body')
        body.append(createDiv)
        body.append(master_date)
        body.append(div)

    },


    //creating a schedule with number of days specified
    makeSchedule: function(days, month, date,year,name){
        console.log(month)
        console.log(date)
        let cur_month = month
        let cur_date = date
        const table = document.createElement('table')
        table.value = days
        table.className = "table"
        const thead = document.createElement('thead')
        const row = document.createElement('tr')
        const week = document.createElement('th')
        week.innerText = name
        week.scope = "col"
        row.appendChild(week)
        const monday = document.createElement("th")
        monday.innerText="Monday"
        monday.scope = "col"
        const tuesday = document.createElement("th")
        tuesday.innerText="Tuesday"
        tuesday.scope = "col"
        const wednesday = document.createElement("th")
        wednesday.innerText="Wednesday"
        wednesday.scope = "col"
        const thursday = document.createElement("th")
        thursday.innerText="Thursday"
        thursday.scope = "col"
        const friday = document.createElement("th")
        friday.innerText="Friday"
        friday.scope = "col"
        const saturday = document.createElement("th")
        saturday.innerText="Saturday"
        saturday.scope = "col"
        const sunday = document.createElement("th")
        sunday.innerText="Sunday"
        sunday.scope = "col"

        //Creating the list with the parameters given
        let lis = []
        lis[0] = monday
        lis[1] = tuesday
        lis[2] = wednesday
        lis[3] = thursday
        lis[4] = friday
        lis[5] = saturday
        lis[6] = sunday
        for (let i = 0; i< 7;i++){
            row.appendChild(lis[i])
        }
        thead.appendChild(row)
        table.appendChild(thead)
        const tbody = document.createElement('tbody')
        let dayOfWeek = new Date(month+" "+date+", "+year)
        const offset = dayOfWeek.getDay()-1
        console.log(offset)
        let acc = 1
        const numRows = Math.ceil((days+offset)/7.0)
        for (let j = 0; j < numRows; j++) {
            const newRow = document.createElement('tr')
            const newWeek = document.createElement('th')
            newWeek.innerText = j+1+"";
            newWeek.scope = "row"
            newRow.appendChild(newWeek)
            for (let i = 0; i < 7; i++) {
                const newColumn = document.createElement('td')
                //offset the number of days so that the day will start on the right day of the week
                if (i+j*7<offset){

                }
                else if (j*7 + i < days+offset){
                    const content = document.createElement('p')
                    content.className = "content"
                    const num = acc;
                    acc++
                    const text = document.createTextNode("Day: "+num)
                    const button = document.createElement('button')
                    const picture = document.createElement('input')
                    const picdiv = document.createElement('div')
                    const label = document.createElement('label')



                    label.className = 'label label-default'
                    label.htmlFor = this.schedule.length+1+"pic"+num
                    label.innerText = "Upload Picture"
                    picdiv.className = 'upload-pic'
                    picture.className = "custom-file-input"
                    picture.className = 'pic'
                    picture.id = this.schedule.length+1+"pic"+num
                    picture.type = "file"
                    picture.accept = "image/*"
                    picture.multiple = false
                    picdiv.appendChild(picture)
                    picdiv.appendChild(label)

                    button.appendChild(document.createTextNode("Add Event"))
                    //Adding a button to every block so users can add events and images.
                    button.onclick = function (e) {

                        console.log(e.target.parentElement)
                        const form = $$$(".userinput")
                        const index = e.target.parentElement.id.indexOf('d')
                        const dayValue = parseInt(e.target.parentElement.id.slice(index+1))
                        form.element.children[0].innerHTML ="Day" + dayValue
                        form.element.children[0].value = e.target.parentElement.id
                        form.setDisplay("block")
                    }
                    const info = document.createElement('p')
                    info.appendChild(document.createTextNode(cur_month+cur_date))
                    newColumn.className = cur_month+cur_date+""
                    cur_date++
                    if (cur_date > total_day[cur_month]){
                        console.log(cur_month)
                        cur_month = total_month[total_month.indexOf(cur_month)+1]
                        cur_date=1
                    }

                    content.appendChild(text)
                    content.appendChild(info)
                    newColumn.appendChild(content)
                    newColumn.appendChild(button)
                    newColumn.appendChild(picdiv)

                    // newColumn.id = num+''
                    const listNum = this.schedule.length
                    newColumn.id = "l"+listNum+"d"+num

                }
                newRow.appendChild(newColumn)

            }
            tbody.appendChild(newRow)
        }
        table.appendChild(tbody)
        const body = $('body')
        body.append(table)
        this.schedule.push(table)
        console.log(this.schedule)
    }


}