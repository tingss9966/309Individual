"use strict"
//These functions are used for the developer to be able to add to their own code

//returns a list of events for today
function getTodayEvents(){
    const events = document.getElementById('events')
    let lst = []
    for (let i = 0; i < events.children.length; i++){
        lst.push(events.children[i].innerText)
    }
    return lst
}

//Get the events on a specific day
//day: number
//month: String
//year: number
function getEvents(day, month){
    let lst = []
    const available_month = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"]
    let temp = true
    for (let i = 0; i < available_month.length; i++){
        if (month.toLowerCase()===available_month[i]){
            temp = false
        }
    }
    if (temp){
        console.error("month wrong")
    }
    let total_day = {}
    for (let i = 0; i < 12; i++){
        if (i === 0 || i === 2 || i === 4 || i === 6 || i===7 || i ===9 || i===11){
            total_day[available_month[i]] = 31
        }else if (i===1){
            total_day[available_month[i]] = 28
        }else{
            total_day[available_month[i]] = 30
        }
    }
    if (day < 1 || day > total_day[month] ){
        console.error("Parameter information wrong")
    }
    const days = document.getElementsByClassName(month+day+"")
    for (let j = 0; j < days.length; j++){
        const events = days[j].getElementsByClassName('event')
        for (let k = 0; k < events.length; k++){
            lst.push(events[k].innerText)
        }
    }
    return lst

}

function countEvents(){
    let count = 0
    const events = document.getElementsByClassName('event')
    for (let k = 0; k < events.length; k++){
        count++
    }

}

function getInfo(){
    const num_tables = document.getElementsByClassName('table').length
    const num_event = countEvents()
    let info = {
        number_of_table : num_tables,
        num_event: num_event
    }
}