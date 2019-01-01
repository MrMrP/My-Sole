// // Dependencies //
const cheerio = require("cheerio");
const axios = require("axios");
const express = require("express");
const mongojs = require("mongojs");

console.log ("Grabbing every relevant article available from the most trusted sources in sneakers")

//Making request iva axios. The pages HTML is passed as the callback's
//third argument

let app = express();
app.use(express.static("public"));

const databaseUrl = "news";
const collections = ["articles"];


// Using mongojs to hook the database to the db  // 

let db = mongojs(databaseUrl, collections);
db.on("error", function(error) {
	console.log("Database Error:", error);
});

// Routes //
app.get("/", function(req, res) {
	res.send("Welcome");
});

app.get("/all", function(req, res) {
	db.articles.find({}, function(error, found) {
		if(error) {
			console.log(error);
			}
			else {
				res.json(found);
			}
	})
});


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


// Set the app to listen on port 3000 // 
	app.listen(3000, function() {
		console.log("App running on port 3000!")
	}); 
