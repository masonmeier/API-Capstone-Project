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
      const monthuri  = 'https://calendarific.com/api/v2/holidays?api_key='+key+'&country='+nation+'&year=2019&month='+month+'';


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
      <h2>Input 1-3 letter nation code</h2><input type="text" id="nation-val"><br>
      <h2>Input 1-2 character month code</h2><input type="text" id="month-val">
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
    outhtml += '<a target=”_blank” href=”http://www.google.com/search?q='+holidays[index].name+'”><h2>'+holidays[index].name+' <span class="smallname"></h2></a>';
    outhtml += '<div class="holiday-content"><div class="country><h3>'+holidays[index].country.name+'</h3></div><div class="date"><h3>'+holidays[index].date.iso+'</h3></div></div>';
    outhtml += '</li>'
  });
    outhtml += '</ol></div>';
  }


  $('main').html(outhtml);
} 


