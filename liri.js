require("dotenv").config();

const axios = require("axios");

const Spotify = require("node-spotify-api");

const keys = require("./keys");

var spotify = new Spotify(keys.spotify);

// console.log(spotify);

var liriCommand = process.argv[2];
var userInput = process.argv.slice(3).join(" ");

// console.log(liriCommand);
// console.log(userInput);
switch (liriCommand) {
  case "spotify-this-song":
    if (userInput !== "") {
      spotify
        .search({ type: "track", query: userInput, limit: 1 })
        .then(function(response) {
          var trackData = response.tracks.items[0];
          console.log("Artist: " + trackData.artists[0].name);
          console.log("Song Title: " + trackData.name);
          console.log("Preview Track: " + trackData.preview_url);
          console.log("Album: " + trackData.album.name);
        })
        .catch(function(err) {
          console.log(err);
        });
    } else {
      spotify
        .search({ type: "track", query: "The Sign ace of base", limit: 1 })
        .then(function(response) {
          var trackData = response.tracks.items[0];
          console.log("Artist: " + trackData.artists[0].name);
          console.log("Song Title: " + trackData.name);
          console.log("Preview Track: " + trackData.preview_url);
          console.log("Album: " + trackData.album.name);
        })
        .catch(function(err) {
          console.log(err);
        });
    }
    break;
  case "movie-this":
  if (userInput !== '') {
    axios
      .get(`http://www.omdbapi.com/?apikey=trilogy&t=${userInput}`)
      .then(function(response) {
        console.log(`Title: ${response.Title}`);
      })
      .catch(function(error) {
        console.log(error);
      });
    } else {
        axios
      .get(`http://www.omdbapi.com/?apikey=trilogy&t=mr.nobody`)
      .then(function(response) {
        console.log(response.data.Title);
      })
      .catch(function(error) {
        console.log(error);
      });
    }

  default:
    break;
}
