import React, { useState, useEffect } from "react";
import "../component/style.css";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import moment from "moment/moment";
import axios from "axios";

const Tempapp = () => {
  const [city, setCity] = useState(null);
  const [data, setData] = useState({});
  const [visibility, setVisibility] = useState("");
  const [search, setSearch] = useState("Delhi");

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=f387a45bf8af17921f35a4fff7101bf1`
      )
      .then((response) => {
        console.log(response.data);
        setData(response.data);
        setCity(response.data.name);
        setVisibility(response.data.visibility / 1000);
      });
    // const fetchApi = async () => {
    //   const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=f387a45bf8af17921f35a4fff7101bf1`;
    //   const res = await fetch(url);
    //   const resJson = await res.json();
    //   console.log(resJson.name);
    //   setData(resJson);

    // };

    // fetchApi();
  }, [search]);

  const inputEvent = (e) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <div className="album">
        <div className="container">
          <h1 className="main_heading">Weather App</h1>
          <div className="row d-flex justify-content-between align-items-center">
            <div className="col">
              <div className="card">
                <input
                  type="search"
                  placeholder="Search Anyplace Name"
                  onChange={inputEvent}
                />
                {!city ? (
                  <p>No Data Found</p>
                ) : (
                  <div>
                    <div className="card_main">
                      <div className="data">
                        <h3>
                          {city}, {data?.sys?.country} .Weather
                        </h3>
                        <h6>
                          <span> As Of </span>
                          {moment
                            .utc(data?.dt, "X")
                            .add(data?.timezone, "seconds")
                            .format("HH:mm:ss a")}
                        </h6>
                        <div className="img_data">
                          <h4 className="text-center">{data?.main?.temp}°C</h4>
                          <img
                            className="main_img"
                            src={`http://openweathermap.org/img/w/${data?.weather[0].icon}.png`}
                            alt={`http://openweathermap.org/img/w/${data?.weather[0].icon}.png`}
                          />
                          <h3>{data?.weather[0].main}</h3>
                        </div>
                        <h3>{data?.weather[0].description}</h3>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-lg-6">
                          <h5>
                            <span className="label"> High / Low: </span>
                            {data?.main?.temp_max} /{data?.main?.temp_min}
                          </h5>
                          <h5>
                            <span className="label"> Humidity: </span>
                            {data?.main?.humidity} %
                          </h5>
                          <h5>
                            <span className="label"> Pressure: </span>
                            {data?.main?.pressure} hpa
                          </h5>
                          <h5>
                            <span className="label"> Visibility: </span>
                            {visibility} km
                          </h5>
                        </div>
                        <div className="col-lg-6">
                          <h5>
                            <span className="label"> Wind: </span>
                            {data?.wind?.speed} km/h
                          </h5>
                          <h5>
                            <span className="label"> Wind Direction: </span>
                            {data?.wind?.deg}° deg
                          </h5>
                          <h5>
                            <span className="label"> Sunrise: </span>
                            {moment
                              .utc(data?.sys?.sunrise, "X")
                              .add(data?.timezone, "seconds")
                              .format("HH:mm:ss a")}
                          </h5>
                          <h5>
                            <span className="label"> Sunset: </span>
                            {moment
                              .utc(data?.sys?.sunset, "X")
                              .add(data?.timezone, "seconds")
                              .format("HH:mm:ss a")}
                          </h5>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tempapp;
