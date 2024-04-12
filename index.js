

//getting html elements by id
const [dogeCoinImg,time,ourUsers]=['coin','time','users'].map(id => {
    return document.getElementById(id)
});


//call back function will be passed on window object loading event
const renderingBackGroundImage = async ()=> { //fetching an image from unspalsh api
    //the fetch function is promised based  it can either use the .then() OR async await
   const responseFromSever = await fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
   const data =  await responseFromSever.json()//converting the promise to json format
    
   document.body.style.backgroundImage = `url(${data.urls.regular})`;
     ourUsers.innerHTML= ` By:${data.user.name}`
   

}
getCoin();
window.addEventListener('DOMContentLoaded',renderingBackGroundImage);



function handlingTime(){//callback functio for handling time...
      const currentTime = new Date();
        
      const hours = currentTime.getHours();
      const minutes = currentTime.getMinutes();
      const mili = currentTime.getSeconds();

      const amORpm = hours < 12 ? "AM":"PM"

      time.textContent =`${hours}:${minutes} : ${mili} ${amORpm}`

}

setInterval( handlingTime , 1000);//calling the function

async function getCoin(){
    const response = await fetch('https://api.coingecko.com/api/v3/coins/dogecoin'); //fetching coin from the coingecko...
    const data = await  response.json();
    dogeCoinImg.innerHTML = `<img src=${data.image.small} />
    <span>${data.name}</span>
    `
    document.querySelector('.coin-top').innerHTML+= `
    <p>🎯: $${data.market_data.current_price.usd}</p>
    <p>👆🏿: $${data.market_data.high_24h.usd}</p>
    <p>👇: $${data.market_data.low_24h.usd}</p>
    
    `


};
//usng a then and catch method..for handling my promise res
navigator.geolocation.getCurrentPosition(position => {
    fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial`)
        .then(res => {
            if (!res.ok) {
                throw Error("Weather data not available")
            }
            return res.json()
        })
        .then(data => {
            const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
            document.getElementById("weather").innerHTML = `
                <img src=${iconUrl} />
                <p class="weather-temp">${Math.round(data.main.temp)}º</p>
                <p class="weather-city">${data.name}</p>
            `
        })
        .catch(err => console.error(err))
});
