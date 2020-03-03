'use strict';
const fs = require('fs');

const michelin = require('./michelin-generalTest');

async function sandbox (searchLink) { 
try {
  const restaurant = await michelin.scrape_Restaurant(searchLink);
  process.exit(0);
  } 
  catch (e) {
    console.error(e);
    process.exit(1);
  }
}
const [,, searchLink] = process.argv;

sandbox(searchLink);
