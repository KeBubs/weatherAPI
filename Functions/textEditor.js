async function changeText() {
    await getWeatherInfo()
    // console.log(database)
    let location = document.getElementById("location")

    for (let i = 0; i < database.dailyFigures.weatherCode.length; i++){
        let weatherCode = document.getElementById(`weatherCode${[i]}`);
        let sunrise = document.getElementById(`sunrise${[i]}`);
        let sunset = document.getElementById(`sunset${[i]}`);
        weatherCode.textContent = `Weather Code: ${database.dailyFigures.weatherCode[i]}`;
        sunrise.textContent = `Sunrise: ${database.dailyFigures.sunrise[i]}`;
        sunset.textContent = `Sunset: ${database.dailyFigures.sunset[i]}`;
    }
    for (let i = 0; i < database.dailyFigures.minimum.length-1; i++){
        if (i == 1){
            // Select the centre div and assign to a variable
            let divCentre = document.getElementById("centre-box");
            // Create a new P element to add to the centre div
            let p = document.createElement("p");
            // Target the current "temp1" file, so we can append above it.
            let temp1 = document.getElementById("temp1")
            // Create a new class in the newly created p element 
            p.setAttribute("id", "currentTemp");
            // Insert new P element.
            divCentre.insertBefore(p, temp1)
            // Target the newly created element
            p = document.getElementById("currentTemp");
            // Add text to the new element
            p.textContent = `Current Temperature: ${database.dailyFigures.currentWeather}`
            // Targets the P element for "Temperatures", this specifically targets based on the index. 
            let currentTemp = document.getElementById(`temp${[i]}`);
            currentTemp.textContent = `Minimum Temperature: ${database.dailyFigures.minimum[i]}. Maximum Temperature: ${database.dailyFigures.maximum[i]}`;
            continue
        } else {
            let currentTemp = document.getElementById(`temp${[i]}`);
            currentTemp.textContent = `Minimum Temperature: ${database.dailyFigures.minimum[i]}, Maximum Temperature: ${database.dailyFigures.maximum[i]}`;
        }
    }
}