// Expense Tracker Project
import { editItemForm , addItemForm , filterForm , limitsForm, removeFiltersButton ,AmountdateInput, monthlychart} from './uielements.js'
import Amount from './Amount.js'
import {amounts ,getNewId , addAmount , initializeStore , editAmount , applyFilters , removeFilters , setLimit} from './store.js'
initializeStore()

let currentDay = new Date()
let currentDate = currentDay.getDate()
let curretMonth = currentDay.getMonth() + 1
let currentYear = currentDay.getFullYear()
AmountdateInput.setAttribute('max', `${currentYear}-${curretMonth<10 ? '0'+curretMonth : curretMonth}-${currentDate <10 ? '0'+currentDate : currentDate}`)

limitsForm.elements.daily_limit.value = amounts.limits.daily
limitsForm.elements.monthly_limit.value = amounts.limits.monthlyLimit


addItemForm.addEventListener('submit' , function(event){
    event.preventDefault()
    let {amount ,
        amount_type : type ,
        amount_category:category ,
        amount_date:date,
        amount_description : description
        } = addItemForm.elements

    let amountdata = new Amount(amount.value , type.value , category.value, date.value  ,description.value , getNewId())
    addAmount(amountdata)
    addItemForm.reset()
})

editItemForm.addEventListener('submit' , function(event){
    event.preventDefault()
    let {
        edit_amount_id,
        amount ,
        amount_type : type ,
        amount_category:category ,
        amount_date:date,
        amount_description : description
        } = editItemForm.elements
        editAmount( edit_amount_id.value,
            amount.value ,
            type.value ,
            category.value ,
            date.value,
            description.value)
        $('#edit_model_id').modal('toggle')
})

filterForm.addEventListener('submit' , function(event){
    event.preventDefault()
    let {filter_date_from: from ,
        filter_date_to :to ,
        filter_type : type,
        filter_category : category,
        filter_search : search} =     filterForm.elements
    applyFilters(from.value || null ,
         to.value||null , type.value||null ,
          category.value||null ,
          search.value||null)
    
})

removeFiltersButton.addEventListener('click' , function(){
    filterForm.reset()
    removeFilters()
})

limitsForm.addEventListener('submit' ,function(event){
    event.preventDefault()
    setLimit(limitsForm.elements.daily_limit.value , limitsForm.elements.monthly_limit.value)
})


let chartdisplay = new Chart(monthlychart , {
        type : 'bar',
        data : {
            labels : ['Jan' , 'Feb' , 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets : [
                {
                    label: 'Expense',
                    backgroundColor: 'rgb(255 ,0 ,0)',
                    borderColor : 'rgb(0,255,0)',
                    data: [1,2,3,4,5]
                },
                {
                    label: 'Income',
                    backgroundColor: 'rgb(0 ,0, 255)',
                    borderColor : 'rgb(0,0,255)',
                    data: [7,18,22,26,34]
                }
            ],
        },
        options : {

        }
    },
)

chartdisplay.destroy()
let chartdisplay2 = new Chart(monthlychart , {
    type : 'bar',
    data : {
        labels : ['Jan' , 'Feb' , 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets : [
            {
                label: 'Expense2',
                backgroundColor: 'rgb(255 ,0 ,0)',
                borderColor : 'rgb(0,255,0)',
                data: [1,2,3,4,5]
            },
            {
                label: 'Income',
                backgroundColor: 'rgb(0 ,0, 255)',
                borderColor : 'rgb(0,0,255)',
                data: [7,18,22,26,34]
            }
        ],
    },
    options : {

    }
},
)