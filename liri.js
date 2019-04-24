require("dotenv").config();

const axios = require("axios");

const Spotify = require("node-spotify-api");

const keys = require("./keys");

const moment = require("moment");

const fs = require("fs");

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
    if (userInput !== "") {
      axios
        .get(`http://www.omdbapi.com/?apikey=trilogy&t=${userInput}`)
        .then(function(response) {
          var movieInfo = response.data;
          console.log(`Title: ${movieInfo.Title}`);
          console.log(`Year: ${movieInfo.Year}`);
          console.log(`IMDB rating: ${movieInfo.imdbRating}`);
          console.log(`Rotten Tomatoes: ${movieInfo.Ratings[1].Value}`);
          console.log(`Country: ${movieInfo.Country}`);
          console.log(`Language: ${movieInfo.Language}`);
          console.log(`Plot: ${movieInfo.Plot}`);
          console.log(`Cast: ${movieInfo.Actors}`);
        })
        .catch(function(error) {
          console.log(error);
        });
    } else {
      axios
        .get(`http://www.omdbapi.com/?apikey=trilogy&t=mr.nobody`)
        .then(function(response) {
          var movieInfo = response.data;
          console.log(`Title: ${movieInfo.Title}`);
          console.log(`Year: ${movieInfo.Year}`);
          console.log(`IMDB rating: ${movieInfo.imdbRating}`);
          console.log(`Rotten Tomatoes: ${movieInfo.Ratings[1].Value}`);
          console.log(`Country: ${movieInfo.Country}`);
          console.log(`Language: ${movieInfo.Language}`);
          console.log(`Plot: ${movieInfo.Plot}`);
          console.log(`Cast: ${movieInfo.Actors}`);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
    break;
  case "concert-this":
    if (userInput !== "") {
      axios
        .get(
          `https://rest.bandsintown.com/artists/${userInput}/events?app_id=codingbootcamp`
        )
        .then(function(response) {
          var concertInfo = response.data;
          for (let i = 0; i < concertInfo.length; i++) {
            console.log(`Venue: ${concertInfo[i].venue.name}`);
            console.log(
              `Location: ${concertInfo[i].venue.city}, ${
                concertInfo[i].venue.country
              }`
            );
            console.log(
              `Date: ${moment(concertInfo[i].datetime).format("MM-DD-YYYY")}`
            );
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
    break;
  case "do-what-it-says":
    fs.readFile("random.txt", "utf8", function(error, data) {
      if (error) {
        return console.log(error);
      }
      console.log(data);
      var dataArray = data.split(",");
      console.log(dataArray);
      spotify
        .search({ type: "track", query: dataArray[1], limit: 1 })
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
    });
    break;
  default:
    break;
}
