import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
    <header>
      <title>Bib</title>
        <h1>&#127837; Bib Gourmand & Maîtres restaurateurs  &#127837;</h1>
        <img src="bib.png" alt="logo Bib"/>
        <img src="maitre-restaurateur.png" alt="logo Maitres-restaurateurs"/>

        <div id="by_name">
        <p>Filtering restaurants by name</p>
        <input class="id" type="text" placeholder="Restaurant name"/>
        <button class="btn">Compute</button>
      </div>

        <div id="by_distance">
        <p>Filtering restaurants by distance</p>
        <input class="id" type="text" placeholder="Your localization"/>
        <button class="btn" >Compute</button>
      </div>
      </header>
    </div>
  );
}

export default App;
