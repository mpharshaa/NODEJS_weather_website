
const weatherForm = document.querySelector('form');
const search = document.querySelector('input');


weatherForm.addEventListener('submit', (e) => {
    document.querySelector('#firstMessage').textContent="loading"
    document.querySelector('#secondMessage').textContent ="";
    e.preventDefault();
    console.log(search.value)
    fetch('http://localhost:3000/weather?address=' + search.value)
        .then((response) => {
            if (response.error) {
                //console.log(response.error)
                document.querySelector('#firstMessage').textContent = response.error
            }
            response.json().then((data) => {
                if (data.error) {
                    document.querySelector('#firstMessage').textContent = data.error
                    return console.log(data.error)
                } else {
                    document.querySelector('#firstMessage').textContent = data.location
                    document.querySelector('#secondMessage').textContent = data.forecast
                    console.log(data)
                    console.log(data.location)
                }
            })
        })
})
