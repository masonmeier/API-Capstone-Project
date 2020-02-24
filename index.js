'use strict';

//format query//
$(document).ready(function(){
    $('#submit-btn').on('click', function(e){
      e.preventDefault();
      
      const defaultNation = 'USA' // or whatever
      const nation = $('.nation-val').val();
      const month = $('.month-val').val();
      const apiKey = 'fc1ab01148fbada75e56010b3c2533bba3918d06';
      const key = apiKey; // why
      const baseUri = 'https://calendarific.com/api/v2/holidays?api_key=' + apiKey + '&year=2019';
        
      // now we're going to check if we got any input and adjust the query accordingly
      if (month) baseUri += `&month=${month}`; // add month if it exists
      baseUri += nation ? `nation=${nation}` : `nation=${defaultNation}`; // ternary - if nation was inputted, use it; else use defaultNation
       

      fetch(baseUri).then (function(response) {
        return (response.json());
      }).then(function(json){
        console.log(json);
        if(json.status === "422") {
          $('#hdapidata').html("<h2>Nation not found!</h2>");
        }

        //return JSON object//

        else {(outputHolidays);
        
        function outputHolidays() {
            let outhtml='';
            let holidays= response.holidays
            if(holidays.length == 0) { outhtml = outhtml + '<p>0 holidays found!</p></div>'; }
            else {
              outhtml = outhtml + '<p><strong>Holidays:</strong></p> <ul>';
              $.each(holidays, function(index) {

                outhtml += '<a target=”_blank” href=”http://www.google.com/search?q='+holidays[index].name+'”><h2>'+holidays[index].name+' <span class="smallname"></h2></a>';
                //link and title
                outhtml += outhtml + '<div class="holiday-content"><div class="country><h3>'+holidays[index].country.name+'</h3></div><div class="date"><h3>'+holidays[index].date.datetime+'</h3></div></div>'
                
                outhtml += outhtml + '<li>'+holidays[index]+'</li>';
              });
              outhtml = outhtml + '</ul></div>';
            }
            $('#hdapidata').html(outhtml);
          } 
        } 
      }); 
    }); 
});


//questions//
//Add a restart button to this
//why isnt this working
//any breaks in logic
//enforce limitations on input field
//Do I need a watchform function or is that handled by line 5?

