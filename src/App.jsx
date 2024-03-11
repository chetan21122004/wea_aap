import { useEffect, useState } from "react";

import "./App.css";

import search_icon from "./assets/search.png";
import cloud_icon from "./assets/cloud.png";
import drizzle_icon from "./assets/drizzle.png";
import snow_icon from "./assets/snow.png";
import rain_img from "./assets/rain.png";
import humidity_icon from "./assets/humidity.png";
import wind_icon from "./assets/wind.png";
import clear_icon from "./assets/clear.png";
function App() {
  let api_key = "2feab9d0a047e4b3af4c4f06fbbc0198";

// let's learn and grow together
  const [city, setCity] = useState("london");
  const [temp, setTemp] = useState(null)
  const [w_img, setW_img] = useState(null)
  const [humidity, setHumidity] = useState(null)
  const [wind, setWind] = useState(null)
  const [place, setPlace] = useState(null)
  const [icod, setIcod] = useState(null)

  const fetchData = async () => {
    let url = ` https://api.openweathermap.org/data/2.5/weather?q=${city}&units=Metric&appid=${api_key} `;

    const response = await fetch(url);

    const data = await response.json();

    setIcod(data.weather[0].icon);

    setTemp(data.main.temp);
    setHumidity(data.main.humidity);
    setWind(data.wind.speed);
    setPlace(data.name);
    
    switch (icod) {
      case '01n':
      case '01d':
        setW_img(clear_icon)
        break;
  
      case '02n':
      case '02d':
        setW_img(cloud_icon)
        break;
  
      case '03n':
      case '03d':
      case '04n':
      case '04d':
        setW_img(drizzle_icon)
        break;
  
      case '09n':
      case '09d':
      case '10n':
      case '10d':
        setW_img(rain_img)
        break;
  
      case '13n':
      case '13d':
        setW_img(snow_icon)
        break;
        
        default:
        setW_img(clear_icon)
        break;
    }
  };

  


  const [citym, setCitym] = useState('');

  const getCurrentCity = () => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`
          );
          const data = await response.json();
          setCity(data.address.city);
          // setCitym(data.address.city);
          }  
    )
    
  }
  

  const elem = document.getElementsByClassName("cityInput");
  const handleSubmit = (e) => {
    e.preventDefault();
    const elem2 = elem
    setCity(elem2[0].value);
    elem[0].value = ""
  };

  useEffect(() => {
    fetchData()
  
    
  }, [city])
  

  return (<>

    <div className="all">
      <div className="container">
          <div onClick={getCurrentCity} className="cur_loc">Current Loc</div>

        <form className="top_bar" onSubmit={handleSubmit}>
          <input type="text" className="cityInput"  defaultValue={city}/>

          <button type="submit" className="search_icon">
            <img src={search_icon} alt="" />
          </button>
        </form>

        <div className="weather-img wtext">
          <img src={w_img} alt="" />
        </div>

        <div className="weather-temp wtext">{temp}°C</div>

        <div className="weather-loction">
          <span className="place">{place}</span>
        </div>

        <div className="data-cont">
          <div className="elem">
            <img src={humidity_icon} className="icon hum" alt="" />
            <div className="data">
              <div className="humidity-per">{humidity}%</div>
              <div className="text">Humidity</div>
            </div>
          </div>
          <div className="elem">
            <img src={wind_icon} className="icon" alt="" />
            <div className="data">
              <div className="wind-speed">{wind}km/hr</div>
              <div className="text">Wind Speed</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default App;
