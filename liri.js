require('dotenv').config();

const axios = require('axios')

const Spotify = require('node-spotify-api');

const keys = require("./keys");

var spotify = new Spotify(keys.spotify);

// console.log(spotify);

var liriCommand = process.argv[2];

console.log(liriCommand);




