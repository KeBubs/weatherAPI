Welcome to my Weather App!

This is my first project i'm uploading to Github which is a personal rather than bootcamp initialised.

When I say completed, I mean an MVP that doesnt look, well, terrible... But not to say there isnt (a lot of) room for improvement.
I've decided to upload this project at this moment in time as not only a reflection piece in the near future, to show how far i've come in the world of code, but also to showcase my code in the hope of getting feedback from peers, colleagues and other tech advocates!

Overview:
----------
Initially, when the web page loads, there is a blank template with a search field nearer to the top and a button. 
When the user enters a postcode and clicks the button, this initialises the first out of two API's.

Firstly the postcode is entered into the postcodes.io API: https://postcodes.io
This API returns specific information about a postcode from a large database. Specifically, i'm after the latitude and longitude. 

The latitude and longitude are then taken and stored temperarily into variables.

These variables are passed into the second API, open-meteo: https://open-meteo.com

This API returns a bunch of weather information which you specify you require in the get request, i'm only looking for data such as the Temperature, WeatherCode, Sunrise, Sunset, just so the code isnt too cluttered.

Once this data is collected and stored in my own weather DataBase, my functions can run to edit the website. 

Functions
---------

getPostcode():
This function is designed to take the input value from the search field and pass it into the postcodes API. 
Once the API runs, the latitude and longitude are stored locally into a variable ready for the next function. 

getWeatherInfo():
The getWeatherInfo code passes the latitude and longitude as placeholders into the URL required for the fetch request. 
Once the fetch has been awaited, we parse the result and store the data into our own database. 

changeText():
This function iterates through the database and targets elements of the HTML. It then ammends the HTML document using DOM and and changes the DIV to become an image, which (roughly) shows an image based on the predicted weather.

Reflection
------------

- Looking at the code at this point, I'd of liked to of put my functions into their own folders and import them where neccessary.
- I'd of liked to of given myself a deeper understanding of CSS Styling to make the page look more visually pleasing.
- Tidiness! As i've wrote the code i've thought, surely there is a cleaner way of doing this? But, this is where I learn in the future.
