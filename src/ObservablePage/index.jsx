import React, { useState, useEffect } from "react";
import "./styles.scss";
import { interval, from, range, of } from "rxjs";
import { concatMap, delay } from "rxjs/operators";

const observableTemperature = range(1, 30).pipe(
  concatMap((i) => of(i).pipe(delay(1000 + Math.random() * 4000)))
);

const observableAirPressure = range(600, 1000).pipe(
  concatMap((i) => of(i).pipe(delay(1000 + Math.random() * 4000)))
);

const observableHumidity = range(1, 100).pipe(
  concatMap((i) => of(i).pipe(delay(1000 + Math.random() * 4000)))
);

const ObservablePage = () => {
  const [temperature, setTemperature] = useState(2);
  const [airPressure, setAirPressure] = useState(0);
  const [humidity, setHumidity] = useState(0);

  useEffect(() => {
    const subTemperature = observableTemperature.subscribe(setTemperature);
    const subTairPressure = observableAirPressure.subscribe(setAirPressure);
    const subHumidity = observableHumidity.subscribe(setHumidity);

    return () => {
        subTemperature.unsubscribe()
        subTairPressure.unsubscribe()
        subHumidity.unsubscribe()
    };
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
