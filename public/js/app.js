const weather_form = document.querySelector('form')
const search_item = document.querySelector('input')
const message_one = document.querySelector('#message1')
const message_two = document.querySelector('#message1')

message_one.textContent = 'Loading...'
message_two.textContent = ''

weather_form.addEventListener('submit' , (e) => {
    e.preventDefault()

    const address = search_item.value

    
fetch('http://localhost:3000/weather?search=' + address + '').then((response) => {
    response.json().then((data) => {
        if(data.error){
            console.log('there is an error' + data.error)
            message_two.textContent = ('there is an error' + data.error)
        }
        else{
            console.log(data.location)
            console.log(data.data)
            message_two.textContent = (data.location ,data.data)
        }
    })
})

})