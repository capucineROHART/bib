'use strict';

const axios = require('axios');
const cheerio = require('cheerio');
const querystring = require('querystring');
const fs = require('fs');



const parse = data => {
	const $ = cheerio.load(data);
	const info=[];
	const infoName=[];
	const infoAddress=[];
	const infoPhone=[];

	$('.single_libel').each((i, element) => {
    	var name = $(element).text();
    	const separate=name.split(" (");
    	const separate1=separate[0].split("\n          \n            ");
    	name=separate1[1];
    	infoName.push(name);
    });

	$('.single_details > div > div:nth-child(2) > div').each((i, element) => { 
		var address = $(element).text();
    	const separate=address.split("\n");
    	const separate1=separate[1].split("              ");
    	const separate2=separate[4].split("              ");
    	address=separate1[1]+","+separate2[1];
		infoAddress.push(address);
	});

	for(var i=0; i<infoName.length;i++) {
		info.push(infoName[i]);
		info.push(infoAddress[i]);
	}
	WriteJsonFile(info,'restaurateurs.json');
	return info;
};


function WriteJsonFile(array, filename) {
	var arrayToString = JSON.stringify(Object.assign({}, array));
	return arrayToString;
}


function ReadJsonFile(filename) {
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


module.exports.scrape_Restaurant = async url => {
	const payload = {
		'page':1,
		'request_id':'5abbd58b3bf69b631efefdd1887283a2'
	};

	const options = {
		'url':"https://www.maitresrestaurateurs.fr/annuaire/ajax/loadresult",
		'method':'POST',
		'headers':{'content-type':'application/x-www-form-urlencoded'},
		'data':querystring.stringify(payload)
	};

	const restaurants = [];
	for (var i=0;i<=155;i++) {
		payload.page=i;
		const response = await axios(options);
		const {data, status} = response;

		if (status >= 200 && status < 300) {
			restaurants.push(parse(data));
		}
	}
	console.log(restaurants);
	return null;
};

module.exports.get = () => {
	return [];
};
