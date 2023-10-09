// Variables to store the latitude and longitude 
// which is returned from the postcodes API.

let latitude = ""
let longitude = ""

async function getPostcode(){
    // Where the users postcode will be stored -- userPostcodeField.value
    let userPostcode = userPostcodeField.value
    // Log the userPostcode to check its captured correctly.
    console.log(userPostcode);
    // Fetch command to API to request Postcode information
    let response = await fetch(`http://api.getthedata.com/postcode/${userPostcode}`)
    let postcodeObj = await response.json()
    // Parse the returned object and find the latitude and logitude.
    // Add the latitude and longitude to variables ready to use in the other API.
    latitude = postcodeObj.data.latitude;
    longitude = postcodeObj.data.longitude;
}