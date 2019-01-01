// // Dependencies //
const cheerio = require("cheerio");
const axios = require("axios");

console.log ("Grabbing every relevant article available from the most trusted sources in sneakers")

//Making request iva axios. The pages HTML is passed as the callback's
//third argument

axios.get("https://sneakernews.com/")
.then(function(response){
	let $ = cheerio.load(response.data);
	let results = [];

	$("h4").each(function(i,element){
		let title = $(element).text();
		let link = $(element).children().attr("href");

		//Save the results in an object that we'll push in the the results array defind earlier//

		results.push({
			title: title,
			link: link
		});
	});

	console.log(results);
});

