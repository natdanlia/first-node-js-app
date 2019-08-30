console.log('Client side javascript file is loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne= document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')






weatherForm.addEventListener('submit', ()=> {
    event.preventDefault()
    const searchText = search.value
    messageOne.innerHTML = 'loading'
    fetch(`http://localhost:3000/weather/?address=${searchText}`)
        .then(res => res.json())
        .then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.innerHTML = data.location
                messageTwo.textContent = data.forecast
                
            }
        })
})



