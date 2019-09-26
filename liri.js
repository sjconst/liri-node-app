//Node Packages
require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var axios =  require("axios");
var moment = require("moment");
var spotify = new Spotify(keys.spotify);
var fs = require("fs");
//Global Variables
var secondArg = process.argv[2].toLowerCase();
var command, input;
//How to use App message
{
    console.log("Choose from four commands to use this app: concert-this + name of an artist, spotify-this-song + name of a song, movie-this + name of a movie, or do-what-it-says");
}
//Processor
if(process.argv.length > 3 && secondArg != "do-what-it-says"){  
    command = process.argv[2].toLowerCase();
    input = "";
    for(var i = 3; i < process.argv.length; i++){
        input += process.argv[i];
    };
    processCommand(input, command);
} else if(secondArg === "do-what-it-says"){
    fs.readFile("random.txt", "utf8", (error, data) => {
        if(error) {
            return console.log(error)
        }
        content = data.split(",");   
        console.log(content);   
        command = content[0].toLowerCase();
        var x = content[1].toLowerCase();   
        input = x.replace(/['"]+/g, '');
        console.log("input is now" + input);   
        processCommand(input, command);
    })    
} 
//Callback Functions
function getConcert(input){
    var artist = input;
    var url = `https://rest.bandsintown.com/artists/${artist}/events?app_id=codingbootcamp&date=upcoming`;    
    axios
    .get(url)
    .then(response => {
        console.log(`${artist} is playing in the following upcoming venues:`);     
        var responseArr = response.data;        
        responseArr.forEach(element => {
            var date = moment(element.datetime).format("MM/DD/YYYY");         
            if(element.venue.country === "United States"){
                var location = element.venue.region;
            } else {
                var location = element.venue.country;
            }
            console.log(`Venue: ${element.venue.name}, Location: ${element.venue.city}, ${location}, Date: ${date}`)
        });
    })
    .catch(error => {
        if(error.response){
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if(error.request){
            console.log(error.request);
        } else{
            console.log("error", error.message)
        }
        console.log(error.config);
    }) 
};
function getSpotify(input){    
    if(!input){
        var trackID = "0hrBpAOgrt8RXigk83LLNE";
        console.log("You didn't choose a song, so we picked for you!");
        spotify
        .request(`https://api.spotify.com/v1/tracks/${trackID}`)
        .then(data => {            
            console.log(`Song name: ${data.name} \n Album: ${data.album.name} \n Artist(s): ${data.album.artists[0].name} \n Preview link: ${data.preview_url}`) 
        })
        .catch(error => console.log(error))
    } else {        
        spotify
        .search({
            type: 'track', query: input, limit: 1 
        })
        .then(data => {
            var results = data.tracks.items[0];        
            console.log(`Song name: ${results.name} \n Album: ${results.album.name} \n Artist(s): ${results.album.artists[0].name} \n Preview link: ${results.external_urls.spotify}`)     
        })
        .catch(error => console.log(error));
    }
}; 
function getMovie(input){      
    //Input: a string
    //Output: if no input, console.log details for Mr. Nobody, else console.log details for input
    if(!input){
        var movie = "Mr. Nobody"
        console.log("You didn't pick a movie, so we picked for you!")
    } else {
        var movie = input;
    }    
    var url = `http://www.omdbapi.com/?apikey=trilogy&t=${movie}`;
    axios
    .get(url)
    .then(response => {
        var results = response.data;       
        console.log(`Title: ${results.Title}\n Year: ${results.Year} \n imdb Rating: ${results.imdbRating}/10\n ${results.Ratings[1].Source}: ${results.Ratings[1].Value}\n Produced in: ${results.Country}\n Language: ${results.Language}\n Plot: ${results.Plot}\n Actors: ${results.Actors}`);     
    })
    .catch(error => {
        if(error.response){
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if(error.request){
            console.log(error.request);
        } else{
            console.log("error", error.message)
        }
        console.log(error.config);
    })    
}
function tryAgain(){
    //No input. Outputs message when called. 
    console.log("Sorry, I didn't understand that. Please try again");
}
function processCommand(input, command){
    if(command === "movie-this"){  
        getMovie(input);
    } else if(command === "spotify-this-song"){
        getSpotify(input);
    } else if(command === "concert-this"){
        getConcert(input);
    } else {
        tryAgain();
    }    
}
