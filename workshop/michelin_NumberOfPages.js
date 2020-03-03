
const fs = require('fs');
const jsonfile = require('jsonfile')
arr=[["1","2", "e"],["1","2", "e"],["1","2", "e"],["1","2", "e"]];


function AppendJsonFile(data, filename) {
	const restaurants=ReadJsonFile(filename);
    var result = [];
	for(var i in restaurants)
    	result.push(restaurants[i]);
	for(var i in data)
    	result.push(data[i]);
    WriteJsonFile(result, filename);
	return result;
}

function WriteJsonFile(array, filename) {
	var arrayToString = JSON.stringify(Object.assign({}, array));  // convert array to string
	fs.writeFileSync(filename, arrayToString);
	return arrayToString;
}


function ReadJsonFile(filename) {
	let rawdata = fs.readFileSync(filename);
	//let value = JSON.parse(rawdata);
	return rawdata;
}


WriteJsonFile(arr,"restaurant.json");
AppendJsonFile(arr,"restaurant.json");
