function getLocation() {
  //let locationButton = document.getElementById("get-location");
  let locationDiv = document.getElementById("location-details");
  let monthsCurrency = document.getElementById("sixmonths-plan-price");
  let yearlyCurrency = document.getElementById("yearly-plan-price");
  let lifetimeCurrency = document.getElementById("lifetime-plan-price");


  const showLocation = async (position) => {
    //We user the NOminatim API for getting actual addres from latitude and longitude
    let response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`
    );
    //store response object
    let data = await response.json();
    var countryName = data.address.country_code;
    console.log(data);
    switch (true) {
      case ["gb"].includes(countryName):
        monthsCurrency.innerText = "£32";
        yearlyCurrency.innerText = "£59";
        lifetimeCurrency.innerText = "£139"
        break;
      case ["inr"].includes(countryName):
        monthsCurrency.innerText = "₹1999";
        yearlyCurrency.innerText = "₹3599";
        lifetimeCurrency.innerText = "₹9999";
        break;
      case ["us"].includes(countryName):
        monthsCurrency.innerText = "$39";
        yearlyCurrency.innerText = "$69";
        lifetimeCurrency.innerText = "$169";
        break;
      case ["at", "be", "cy", "ee", "fi", "fr", "de", "gr", "ie", "it", "lv", "lt", "lu", "mt", "nl", "pt", "sk", "si", "es"].includes(countryName):
        monthsCurrency.innerText = "€39";
        yearlyCurrency.innerText = "€69";
        lifetimeCurrency.innerText = "€169";
        break;
      case ["ca"].includes(countryName):
        monthsCurrency.innerText = "$55";
        yearlyCurrency.innerText = "$95";
        lifetimeCurrency.innerText = "$230";
        break;
      case ["au"].includes(countryName):
        monthsCurrency.innerText = "$55";
        yearlyCurrency.innerText = "$95";
        lifetimeCurrency.innerText = "$230";
        break;
      case ["sg"].includes(countryName):
        monthsCurrency.innerText = "$55";
        yearlyCurrency.innerText = "$95";
        lifetimeCurrency.innerText = "$230";
        break;
      case ["ae"].includes(countryName):
        monthsCurrency.innerText = "د.إ145";
        yearlyCurrency.innerText = "د.إ259";
        lifetimeCurrency.innerText = "د.إ625";
        break;
      case ["sa"].includes(countryName):
        monthsCurrency.innerText = "﷼145";
        yearlyCurrency.innerText = "259﷼";
        lifetimeCurrency.innerText = "625﷼";
        break;
      default:
        monthsCurrency.innerText = "$39";
        yearlyCurrency.innerText = "$69";
        lifetimeCurrency.innerText = "$169";
    }
  };

  //Error Checks
  const checkError = (error) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        locationDiv.innerText = "Please allow access to location";
        break;
      case error.POSITION_UNAVAILABLE:
        //usually fired for firefox
        locationDiv.innerText = "Location Information unavailable";
        break;
      case error.TIMEOUT:
        locationDiv.innerText = "The request to get user location timed out";
    }
  };

  //Geolocation APU is used to get geographical position of a user and is available inside the navigator objects
  if (navigator.geolocation) {
    //returns position(latitude and longitude) or error
    navigator.geolocation.getCurrentPosition(showLocation, checkError);
  } else {
    //For old browser i.e IE
    locationDiv.innerText = "The browser does not support geolocation";
  };
}