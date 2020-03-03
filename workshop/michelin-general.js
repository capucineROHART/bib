'use strict';

const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const jsonfile = require('jsonfile');

const parse = data => {
	const $ = cheerio.load(data);
	const links=[];
	const site = $('div.js-restaurant__list_item > a').each((i, element) => {
		const link = $(element).attr('href');
		links.push("https://guide.michelin.com"+link);
	});
	return links;
};


const parse_NumberOfPages = data => {
	const $ = cheerio.load(data);
	const nb= $('body > main > section.section-main.search-results.search-listing-result > div > div > div.search-results__count > div.d-flex.align-items-end.search-results__status.box-placeholder > div.flex-fill.js-restaurant__stats > h1').text();
	const separate= nb.split(" sur ");
	const NumberOfRestaurants=separate[0].split("-");
	const TotalOfRestaurants=separate[1].split(" restaurants");
	const NumberOfPages=Math.round(Number(TotalOfRestaurants[0])/Number(NumberOfRestaurants[1]))+1;
	const value=[];
	value.push(NumberOfPages);
	WriteJsonFile(value, 'value.json');
	return value;
};


const parse_Restaurant = data => {
	const $ = cheerio.load(data);
	const restaurant=[];
	const name=$('body > main > div.restaurant-details > div.container > div > div.col-xl-4.order-xl-8.col-lg-5.order-lg-7.restaurant-details__aside > div.restaurant-details__heading.d-lg-none > h2').text();
	const address=$('body > main > div.restaurant-details > div.container > div > div.col-xl-4.order-xl-8.col-lg-5.order-lg-7.restaurant-details__aside > div.restaurant-details__heading.d-lg-none > ul > li:nth-child(1)').text();
	//const tel=$('body > main > div.restaurant-details > div.container > div > div.col-xl-8.col-lg-7 > section:nth-child(4) > div.row > div:nth-child(1) > div > div:nth-child(1) > div > div > a').text();
	//const experience=$('#experience-section > ul > li:nth-child(2)').text();
	restaurant.push(name, address); //tel, experience);
	AppendJsonFile(restaurant,'restaurant.json');
	return restaurant;
};


function WriteJsonFile(array, filename) {
	var arrayToString = JSON.stringify(Object.assign({}, array));  // convert array to string
	fs.writeFileSync(filename, arrayToString);
	return arrayToString;
}


function ReadJsonFile(filename) {
	//jsonfile.readFile(filename, function (err, obj) {
  		//if (err) console.error(err)
  			//console.dir(obj)
	//})
	let rawdata=fs.readFileSync(filename);
	let value = JSON.parse(rawdata);
	return value;
}


function AppendJsonFile(data, filename) {
	const restaurants=ReadJsonFile(filename);
    var result = [];
	for(var i in restaurants)
    	result.push(restaurants[i]);
	for(var i in data) 
    	result.push(data[i]);
    console.log(result);
    WriteJsonFile(result, filename);
	return result;
}


module.exports.scrapePages = async url => {
	const urls=[];
	const value=ReadJsonFile('value.json');

	for(var k=1;k<=value[0];k++) {
  		const response = await axios(url+k);
 	 	const {data, status} = response;

  		if (status >= 200 && status < 300)
    		urls.push(parse(data));
  	}
  	WriteJsonFile(urls,'urls.json');
    return urls;

  	console.error(status);
	return null;
};


module.exports.scrape_NumberOfPages = async url => {
  		const response = await axios(url);
 	 	const {data, status} = response;
  		if (status >= 200 && status < 300)
    		return parse_NumberOfPages(data);
  	console.error(status);
	return null;
};


module.exports.scrape_Restaurant = async url => {
    const response = await axios(url);
 	const {data, status} = response;
 	if (status >= 200 && status < 300)
    	return parse_Restaurant(data);

	console.error(status);
	return null;
};


module.exports.get = () => {
	return [];
};