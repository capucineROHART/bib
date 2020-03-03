'use strict';
const fs = require('fs');

const michelin = require('./michelin-general');

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


let rawdata = fs.readFileSync('urls.json');
let value = JSON.parse(rawdata);

let rawdata1 = fs.readFileSync('value.json');
let value1 = JSON.parse(rawdata1);

for(var k=1;k<=value1[0];k++){
  if(value[k])
    value[k].forEach(element => sandbox(element));
  }