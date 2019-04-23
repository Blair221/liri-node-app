require('dotenv').config();

const axios = require('axios')

const Spotify = require('node-spotify-api');

const keys = require("./keys");

var spotify = new Spotify(keys.spotify);

// console.log(spotify);

var liriCommand = process.argv[2];
var userInput = process.argv.slice(3).join(' ');

console.log(liriCommand);
console.log(userInput);





