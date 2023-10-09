async function getWeatherInfo(){
    // Await the postcode function to return latitude, longitude results.
    await getPostcode()
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset&current_weather=true&timezone=auto&past_days=1&forecast_days=3`)

    // Convert to a JavaScript response. 
    let data = await response.json();

    // Store todays current temperature value.
    database.dailyFigures.currentWeather = data.current_weather.temperature

    // Using the data returned from the API call - 
    // Using the For loop to iterate through the Database, storing returned results.
    for (i = 0; i < data.daily.temperature_2m_min.length; i++){
        database.dailyFigures.minimum[i] = data.daily.temperature_2m_min[i]
    }
    for (i = 0; i < data.daily.temperature_2m_max.length; i++){
        database.dailyFigures.maximum[i] = data.daily.temperature_2m_max[i]
    }
    for (i = 0; i < data.daily.sunrise.length; i++){
        database.dailyFigures.sunrise[i] = new Date(data.daily.sunrise[i]);
    }
    for (i = 0; i < data.daily.sunset.length; i++){
        database.dailyFigures.sunset[i] = new Date(data.daily.sunset[i]);
    }
    for (i = 0; i < data.daily.weathercode.length-1; i++){
        database.dailyFigures.weatherCode[i] = data.daily.weathercode[i]
    }

}