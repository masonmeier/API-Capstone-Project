'use strict';

let state = {
  error: '', 
  adding: false,
  holidays: []
}

$(document).ready(function(){
    state.adding = true;
    render();
    $('form').on('submit', function(e){
      e.preventDefault();
      
      const nation = $('#nation-val').val();
      const month = $('#month-val').val();
      const apiKey = 'fc1ab01148fbada75e56010b3c2533bba3918d06';
      const key = apiKey;
      const monthuri  = 'https://calendarific.com/api/v2/holidays?api_key='+key+'&country='+findISO(nation)+'&year=2020&month='+month+'';

      setLocation(findISO(nation))

      fetch(monthuri).then (function(response) {
        return (response.json());
      }).then(function(json){
        if(json.status === "422") {
          $('#hdapidata').html("<h2>Nation not found!</h2>");
        }

        else {
          state.holidays = json.response.holidays;
          if (!state.holidays.length){
          state.error = "<p id='error-code'>No holidays found!</p>"
          }
          state.adding = false;
          render();
          state.error = '';
        } 
      }); 
    });
    initMap(); 
    setLocation('US');
});

function render() {
  let outhtml='';
  let holidays= state.holidays
  
  if(state.error) { outhtml = outhtml + `<p>${state.error}</p>`; }
  if (state.holidays.length){
    outhtml = outhtml + '<p id="holidays"><strong>Holidays:</strong></p> <ol>';
  $.each(holidays, function(index) {
    outhtml += '<li>'
    outhtml += '<a target=”_blank” href="http://www.google.com/search?q=%22'+holidays[index].name+'%22"><h2>'+holidays[index].name+' <span class="smallname"></h2></a>';
    outhtml += '<div class="holiday-content"><div class="country><h3>'+holidays[index].country.name+'</h3></div><div class="date"><h3>'+holidays[index].date.iso+'</h3></div></div>';
    outhtml += '</li>'
  });
    outhtml += '</ol></div>';
  }

  $('main').html(outhtml);
} 

function unHide() {
  var x = document.getElementById("info");
  if (x.style.display === "block") {
    x.style.display = "block";
  } else {
    x.style.display = "block";
  }
}


//map functionality//

let map;
let infowindow;
let geocoder;

function setLocation(countryCode){
  let location = geocoder.geocode({ address: isoCountries[countryCode] }, (results, status) => {
    if (status === google.maps.GeocoderStatus.OK) map.setCenter(results[0].geometry.location);
  });
}
function initMap() {
  var start = new google.maps.LatLng(1.4206, 38.9067);

  infowindow = new google.maps.InfoWindow();

  map = new google.maps.Map(document.getElementById('map'),{
        disableDefaultUI: true,
        center: start,
        zoom: 4.5,
        scrollwheel: false,
        navigationControl: false,
        mapTypeControl: false,
        scaleControl: false,
        draggable: false
      }
  );
  
  geocoder = new google.maps.Geocoder(); // this object helps us find the coordinates by name
  
}
function findISO(countryName){ let keys=Object.keys(isoCountries); 
  for(let i=0; i<keys.length; i++){ 
    let key=keys[i]; 
    if(countryName.toLowerCase() === isoCountries[key].toLowerCase()){ 
      return key; 
    } 
  } 
}

//end map functionality//
