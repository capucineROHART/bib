'use strict';

const michelin = require('./michelin');
const restaurateurs = require('./restaurateurs');

async function sandbox (searchLink) { 
try {
    //const restaurateur = await restaurateurs.scrape_Restaurant(searchLink);
    //const nb = await michelin.scrape_NumberOfPages(`https://guide.michelin.com/fr/fr/restaurants/bib-gourmand/page/`);
    //const site = await michelin.scrape_Pages(`https://guide.michelin.com/fr/fr/restaurants/bib-gourmand/page/`);
    //const restaurant = await michelin.scrape_Restaurants(searchLink);
    process.exit(0);
  } 
  catch (e) {
    console.error(e);
    process.exit(1);
  }
}
const [,, searchLink] = process.argv;

sandbox(searchLink);
