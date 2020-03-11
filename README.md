Something to Celebrate

Table of Contents:
1.Live Repo Link 
  -Sample Images
2. Summary
3. APIs Called
4. Technology Used




1. Live Repo Link
https://masonmeier.github.io/Something-to-Celebrate/


Sample Images: 

![An image of the landing page](link to image here)
![an image of the formpage](link to image here)


-----------------------------------------------------


2. Summary

Something to Celebrate is an interactive web application designed for use by educators and travelers. 
This application allows the user to search for holidays taking place in different countries around the world. 
It pulls information from Calendarifics Holiday API and Google Maps Geocoding API to provide region specific information
to the user. 

Because Calendarific will only accept nation ISO codes, there is a convenience function built into the app that allows the user to input 
the nations name they want to look up and it will automatically convert it to the ISO code prior to submitting the query to 
the calendarific API. 

Simultaneously, the input is submitted to the Google Maps geocoder where it is used to center the background map on the selected nation. 
This provides an experience to the user where they not only can learn about other nations around the world, they can also visually see
a depiction of the place they are researching. This makes the for a much better learning experience and allows users to verify they are searching
the correct place. 

The information recieved from the calendarific API is returned as a JSON object that is analyzed and seperated into different components
to provide an easy to read format to the user. 

All of the returned holidays are set up as links to a google search of the holiday itself so that the user can easily access additional 
information for research. 

--------------------------------------------------

3. APIs used

a. Calendarific Holiday API
b. Google Maps Geocoder API

--------------------------------------------------

4. Technology Used

a. HTML5
b. CSS
c. Javascript
d. Jquery


