'use strict';

let state = {
  error: '', 
  adding: false,
  holidays: []
}

$(document).ready(function(){
    state.adding = true;
    render();
    $('#submit-btn').on('click', function(e){
      e.preventDefault();
      
      const nation = $('#nation-val').val();
      const month = $('#month-val').val();
      const apiKey = 'fc1ab01148fbada75e56010b3c2533bba3918d06';
      const key = apiKey;
      const monthuri  = 'https://calendarific.com/api/v2/holidays?api_key='+key+'&country='+nation+'&year=2020&month='+month+'';


      fetch(monthuri).then (function(response) {
        return (response.json());
      }).then(function(json){
        console.log(json);
        if(json.status === "422") {
          $('#hdapidata').html("<h2>Nation not found!</h2>");
        }

        else {
          state.holidays = json.response.holidays;
          if (!state.holidays.length){
          state.error = "no holidays found!"
          }
          state.adding = false;
          render();
          state.error = '';
        } 
      }); 
    }); 
});

function render() {
  let outhtml='';
  let holidays= state.holidays
  let container = `   
  <div id="page">
    <div id="input-page">
      <h2>Input 1-2 letter nation code</h2><input type="text" id="nation-val"><br>
      <label>Input 1-2 character month code</label>
      <select id="month-val">
        <option value = "1">1</option>
        <option value = "2">2</option>
        <option value = "3">3</option>
        <option value = "4">4</option>
        <option value = "5">5</option>
        <option value = "6">6</option>
        <option value = "7">7</option>
        <option value = "8">8</option>
        <option value = "9">9</option>
        <option value = "10">10</option>
        <option value = "11">11</option>
        <option value = "12">12</option>
      <input type="submit" id="submit-btn">
    </div>
  </div>`;
  if (state.adding){
    outhtml += container
  };

  if(state.error) { outhtml = outhtml + `<p>${state.error}</p>`; }
  if (state.holidays.length){
    outhtml = outhtml + '<p><strong>Holidays:</strong></p> <ol>';
  $.each(holidays, function(index) {
    console.log(index, holidays[index].country.name);

    outhtml += '<li>'
    outhtml += '<a target=”_blank” href="http://www.google.com/search?q=%22'+holidays[index].name+'%22"><h2>'+holidays[index].name+' <span class="smallname"></h2></a>';
    outhtml += '<div class="holiday-content"><div class="country><h3>'+holidays[index].country.name+'</h3></div><div class="date"><h3>'+holidays[index].date.iso+'</h3></div></div>';
    outhtml += '</li>'
  });
    outhtml += '</ol></div>';
  }


  $('main').html(outhtml);
} 


//map functionality//

let map;
let service;
let infowindow;

function initMap() {
  var sydney = new google.maps.LatLng(-33.867, 151.195);

  infowindow = new google.maps.InfoWindow();

  map = new google.maps.Map(
      document.getElementById('map'), {center: sydney, zoom: 15});

  var request = {
    query: '#nation-val',
    fields: ['name', 'geometry'],
  };

  var service = new google.maps.places.PlacesService(map);

  service.findPlaceFromQuery(request, function(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        createMarker(results[i]);
      }
      map.setCenter(results[0].geometry.location);
    }
  });
}


//end map functionality//

/*
1. Turn json object into google search parameters
2. Do I need an API key to load a seperate google search page
3. Translate Country name into 2 letter code. 

*/