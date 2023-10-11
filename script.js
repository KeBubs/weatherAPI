// Object to store key weather information returned by API.
const database = {
  dailyFigures: {
    // Current Day, Day 2, Day 3
    currentWeather: "",
    minimum: ["", "", ""],
    maximum: ["", "", ""],
    sunrise: ["", "", ""],
    sunset: ["", "", ""],
    weatherCode: ["", "", ""],
  },
};

const weatherCodeImages = {
  clearSky /*00-19*/: "images/clearSky00-19.png",
  precipitation /*20-29, 50-59*/: "images/precipitation20-29.png",
  slightSnow /*36-39*/: "images/snow36-39.png",
  fog /*40-49*/: "images/fog40-49.png",
  rain /*60-69*/: "images/rain60-69.png",
  snow /*70-79*/: "images/snow70-79.png",
  heavyShowers /*80-99*/: "images/heavyrain80-89.png",
};

// URL Used when the page initially loads
let URL = undefined;

// Will be used to store the Latitude and Longitude from the users entered postcode.
let latitude = "";
let longitude = "";

// When the refresh button is clicked, the function "changeText" will run.
// Confirmed that the button responds when clicked
let userPostcodeField = document.getElementById("postcode");
let refreshButton = document.getElementById("submit");
refreshButton.addEventListener("click", changeText);

// Function to take postcode from search field and store into a variable
// Confirmed that the latitude and logitiude is returned.
async function getPostcode() {
  // Where the users postcode will be stored -- userPostcodeField.value
  let userPostcode = userPostcodeField.value;
  // Checks if the user has yet entered a postcode, if not, sets to london.
  if (userPostcode == null) {
    userPostcode = "NW14NP";
  } else {
    // Fetch command to API to request Postcode information
    let response = await fetch(
      `http://api.getthedata.com/postcode/${userPostcode}`
    );
    let postcodeObj = await response.json();
    // Parse the returned object and find the latitude and logitude.
    // Add the latitude and longitude to variables ready to use in the other API.
    latitude = postcodeObj.data.latitude;
    longitude = postcodeObj.data.longitude;
    console.log(userPostcode);
  }
}
// GET request to return post code information, such as latitude and longitude
// Retrieve latitude and longitude from file, insert into URL request

async function getWeatherInfo() {
  await getPostcode();
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset&current_weather=true&timezone=auto&past_days=1&forecast_days=3`
  );
  let data = await response.json();
  console.log(data);
  database.dailyFigures.currentWeather = data.current_weather.temperature;
  // console.log(database.currentWeather)
  for (i = 0; i < data.daily.temperature_2m_min.length; i++) {
    database.dailyFigures.minimum[i] = data.daily.temperature_2m_min[i];
  }
  for (i = 0; i < data.daily.temperature_2m_max.length; i++) {
    database.dailyFigures.maximum[i] = data.daily.temperature_2m_max[i];
  }
  for (i = 0; i < data.daily.sunrise.length; i++) {
    database.dailyFigures.sunrise[i] = new Date(data.daily.sunrise[i]);
  }
  for (i = 0; i < data.daily.sunset.length; i++) {
    database.dailyFigures.sunset[i] = new Date(data.daily.sunset[i]);
  }
  for (i = 0; i < data.daily.weathercode.length - 1; i++) {
    database.dailyFigures.weatherCode[i] = data.daily.weathercode[i];
  }
}

async function changeText() {
  console.log(database);
  await getWeatherInfo();
  let body = document.body;
  for (let i = 0; i < database.dailyFigures.weatherCode.length; i++) {
    let weatherCode = document.getElementById(`weatherCode${[i]}`);
    let sunrise = document.getElementById(`sunrise${[i]}`);
    let sunset = document.getElementById(`sunset${[i]}`);
    weatherCode.textContent = `Weather Code: ${database.dailyFigures.weatherCode[i]}`;
    sunrise.textContent = `${database.dailyFigures.sunrise[i]}`;
    sunset.textContent = `${database.dailyFigures.sunset[i]}`;

    let image = document.getElementById(`image${[i]}`);

    if (
      database.dailyFigures.weatherCode[i] >= "00" &&
      database.dailyFigures.weatherCode[i] <= "19"
    ) {
      image.src = "/images/clearSky00-19.png";
      continue;
    } else if (
      database.dailyFigures.weatherCode[i] >= "20" &&
      database.dailyFigures.weatherCode[i] <= "29"
    ) {
      image.src = "/images/precipitation20-29.png";
      continue;
    } else if (
      database.dailyFigures.weatherCode[i] >= "30" &&
      database.dailyFigures.weatherCode[i] <= "39"
    ) {
      image.src = "/images/snow36-39.png";
      continue;
    } else if (
      database.dailyFigures.weatherCode[i] >= "40" &&
      database.dailyFigures.weatherCode[i] <= "49"
    ) {
      image.src = "/images/fog40-49.png";
      continue;
    } else if (
      database.dailyFigures.weatherCode[i] >= "50" &&
      database.dailyFigures.weatherCode[i] <= "59"
    ) {
      image.src = "/images/precipitation20-29.png";
      continue;
    } else if (
      database.dailyFigures.weatherCode[i] >= "60" &&
      database.dailyFigures.weatherCode[i] <= "69"
    ) {
      image.src = "/images/rain60-69.png";
      continue
    } else if (
      database.dailyFigures.weatherCode[i] >= "70" &&
      database.dailyFigures.weatherCode[i] <= "79"
    ) {
      image.src = "/images/snow70-79.png";
      continue
    } else if (
      database.dailyFigures.weatherCode[i] >= "80" &&
      database.dailyFigures.weatherCode[i] <= "89"
    ) {
      image.src = "/images/heavyrain80-89.png";
      continue
    }
  }

  for (let i = 0; i < database.dailyFigures.minimum.length - 1; i++) {
    if (i == 1) {
      // Select the centre div and assign to a variable
      let divCentre = document.getElementById("today");
      // Create a new P element to add to the centre div
      let p = document.createElement("p");
      // Target the current "temp1" file, so we can append above it.
      let temp1 = document.getElementById("temp1");
      // Create a new class in the newly created p element
      p.setAttribute("id", "currentTemp");
      // Insert new P element.
      divCentre.insertBefore(p, temp1);
      // Target the newly created element
      p = document.getElementById("currentTemp");
      // Add text to the new element
      p.textContent = `Current Temperature: ${database.dailyFigures.currentWeather}`;
      // Targets the P element for "Temperatures", this specifically targets based on the index.
      let currentTemp = document.getElementById(`temp${[i]}`);
      currentTemp.textContent = `Minimum Temperature: ${database.dailyFigures.minimum[i]}. Maximum Temperature: ${database.dailyFigures.maximum[i]}`;
      continue;
    } else {
      let currentTemp = document.getElementById(`temp${[i]}`);
      currentTemp.textContent = `Minimum Temperature: ${database.dailyFigures.minimum[i]}, Maximum Temperature: ${database.dailyFigures.maximum[i]}`;
    }
  }
}
