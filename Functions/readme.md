The functions in this folder are the core elements of the Weather APP

postcodes.js - This function will grab the postcode value which is entered into the search field.
The function will then contact an API with the given postcode, returning an Object.
The Object is then parsed to obtain the latitude and longitude, which is then later used with the second Weather API to return location specific weather information. 

weatherInfo.js - Weather Info function takes the returned latitude and longitude from the getPostcodes function, then passes it into the second API to get location specific weather info.
This information is then stored in a local database, which the textEditor function will communicate with to change the page. 

textEditor.js - The function here will combine all of the other functions together, to start ammending the structure of the webpage with specific weather information, currently formatted in three DIV elements, as well as creating a new P element in the centre DIV to insert the Current Weather, which is only given for today. 

