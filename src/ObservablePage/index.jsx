import React, { useState, useEffect } from "react";
import "./styles.scss";
import { range, of } from "rxjs";
import { concatMap, delay, timeout } from "rxjs/operators";

const ObservablePage = () => {
  const [temperature, setTemperature] = useState([0]);
  const [airPressure, setAirPressure] = useState(0);
  const [humidity, setHumidity] = useState(0);

  const randomDelay = () => {
    return 1 + Math.random() * 2000;
  };

  const observableTemperature = range(1, 30).pipe(
    concatMap((i) => of(i).pipe(delay(randomDelay())))
  );

  const observableAirPressure = range(600, 1000).pipe(
    concatMap((i) => of(i).pipe(delay(randomDelay())))
  );

  const observableHumidity = range(1, 100).pipe(
    concatMap((i) => of(i).pipe(delay(randomDelay())))
  );

  const subTemperature = () => {
    observableTemperature.pipe(timeout(1000)).subscribe(
      (val) => setTemperature(val),
      (err) => {
        setTemperature("N/a");
        subTemperature();
      }
    );
  };

  const subAirPressure = () => {
    observableAirPressure.pipe(timeout(1000)).subscribe(
      (val) => setAirPressure(val),
      (err) => {
        setAirPressure("N/a");
        subAirPressure();
      }
    );
  };

  const subHumidity = () => {
    observableHumidity.pipe(timeout(1000)).subscribe(
      (val) => setHumidity(val),
      (err) => {
        setHumidity("N/a");
        subHumidity();
      }
    );
  };

  useEffect(() => {
    subTemperature();
    subAirPressure();
    subHumidity();
  }, []);

  return (
    <div class="container">
      <div class="data">
        <h1>Temperature</h1>
        <span>{temperature} C</span>
      </div>
      <div class="data">
        <h1>Air pressure</h1>
        <span>{airPressure}</span>
      </div>
      <div class="data">
        <h1>Humidity</h1>
        <span>{humidity} %</span>
      </div>
    </div>
  );
};

export default ObservablePage;
