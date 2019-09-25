require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var axios =  require("axios");
var moment = require("moment");
var spotify = new Spotify(keys.spotify)
var input;
{
    console.log("Choose from four commands to use this app: concert-this + name of an artist, spotify-this-song + name of a song, movie-this + name of a movie, or do-what-it-says");
}
if(process.argv.length > 3){
    var command = process.argv[2].toLowerCase();
    console.log(command);
    if(process.argv.length > 4){
        input = [];
        for(var i = 3; i < process.argv.length; i++){
            input.push(process.argv[i].toLowerCase());
        };
    }
}
console.log(input);
if(command === "concert-this"){
//     `node liri.js concert-this <artist/band name here>`
//    * This will search the Bands in Town Artist Events API (`"https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"`) for an artist and render the following information about each event to the terminal:
//      * Name of the venue
//      * Venue location
//      * Date of the Event (use moment to format this as "MM/DD/YYYY")
    console.log("test")
} else if(command === "spotify-this-song"){
    /* If no song is provided then your program will default to "The Sign" by Ace of Base. */
    var song = input.join(" ");
    spotify
    .search({type: 'track', query: song, limit: 1 })
    .then(data => {
        var results = data.tracks.items[0];
        console.log(`Song name: ${results.name} \n Album: ${results.album.name} \n Artist(s): ${results.album.artists[0].name} \n Preview link: ${results.external_urls.spotify}`)     
    })
    .catch(error => {
        console.log(error);
    });
} else if(command === "movie-this"){
    console.log("a movie")
} else if(command === "do-what-it-says"){
    console.log("test")
}

/* 
 

`node liri.js movie-this '<movie name here>'`
   * This will output the following information to your terminal/bash window:
     ```
       * Title of the movie.
       * Year the movie came out.
       * IMDB Rating of the movie.
       * Rotten Tomatoes Rating of the movie.
       * Country where the movie was produced.
       * Language of the movie.
       * Plot of the movie.
       * Actors in the movie.
     ```
   * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
     * If you haven't watched "Mr. Nobody," then you should: <http://www.imdb.com/title/tt0485947/>
     * It's on Netflix!
   * You'll use the `axios` package to retrieve data from the OMDB API. Like all of the in-class activities, the OMDB API requires an API key. You may use `trilogy`.

`node liri.js do-what-it-says`
   * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
     * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.
     * Edit the text in random.txt to test out the feature for movie-this and concert-this.
*/