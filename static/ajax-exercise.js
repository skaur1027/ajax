'use strict';

// PART 1: SHOW A FORTUNE

function showFortune(evt) {
  fetch("/fortune")
  .then(response => response.text())
  .then(fortune => document.querySelector("#fortune-text").innerHTML = fortune);
}

document.querySelector('#get-fortune-button').addEventListener('click', showFortune);

// PART 2: SHOW WEATHER

function showWeather(evt) {
  evt.preventDefault();

  const url = '/weather.json';
  const zipcode = document.querySelector('#zipcode-field').value;

  fetch(`/weather.json?zipcode=${zipcode}`)
  .then(response => response.json())
  .then(forecast => document.querySelector("#weather-info").innerHTML = forecast.forecast);
}

document.querySelector('#weather-form').addEventListener('submit', showWeather);

// PART 3: ORDER MELONS

function orderMelons(evt) {
  evt.preventDefault();

  // TODO: show the result message after your form
  const formInputs = {
    qty: document.querySelector('[name=qty]').value,
    melon_type: document.querySelector('[name=melon_type]').value,
  };

  fetch('/order-melons.json', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify(formInputs)
  })
  .then(response => response.json())
  .then(data => {
    if (data.code === "OK") {
      document.querySelector("#order-status").classList.remove("order-error")
      document.querySelector("#order-status").innerHTML = data.msg      
    } else {
      document.querySelector("#order-status").classList.add("order-error")
      document.querySelector("#order-status").innerHTML = data.msg
    }
  });

  // TODO: if the result code is ERROR, make it show up in red (see our CSS!)
  
}
document.querySelector('#order-form').addEventListener('submit', orderMelons);


function Dogs() {
  fetch('https://dog.ceo/api/breeds/image/random') 
    .then(response => response.json())
    .then(data => document.querySelector('#dog-image').insertAdjacentHTML('beforeend', `<img src=${data.message}></img>`));
  }
  
document.querySelector('#get-dog-image').addEventListener('click', Dogs);

