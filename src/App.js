import React, { useState, useEffect } from "react";
import Async from "react-async";

const loadGlobalData = () =>
  fetch("https://corona.lmao.ninja/all")
    .then(res => (res.ok ? res : Promise.reject(res)))
    .then(res => res.json());

const loadCountryData = () =>
  fetch("https://corona.lmao.ninja/countries")
    .then(res => (res.ok ? res : Promise.reject(res)))
    .then(res => res.json());

class StatsList extends React.Component {
  render() {
    const stats = this.props.stats;
    const listItems = Object.entries(stats).map(([k, v]) => (
      <li key={k}>
        {k}: {v}
      </li>
    ));

    return (
      <div>
        honk
        <ul>{listItems}</ul>
      </div>
    );
  }
}

function App() {
  var globalData = [];
  var countryData = [];
  return (
    <div className="App">
      <Async promiseFn={loadGlobalData}>
        {({ data, err, isLoading }) => {
          if (isLoading) return "Loading...";
          if (err) return `Something went wrong: ${err.message}`;
          if (data) return <StatsList stats={data} />;
        }}
      </Async>
      <Async promiseFn={loadCountryData}>
        {({ countryData, err, isLoading }) => {
          if (isLoading) return "Loading...";
          if (err) return `Something went wrong: ${err.message}`;
        }}
      </Async>
      <div>
        <h2>
          <a
            className="btn btn-primary"
            data-toggle="collapse"
            href="#collapseGlobalStats"
            role="button"
            aria-expanded="false"
            aria-controls="collapseGlobalStats"
          >
            Global Stats
          </a>
        </h2>
      </div>
    </div>
  );
}

export default App;
