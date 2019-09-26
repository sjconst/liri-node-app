# liri-node-app

## Getting Started

This is a CLI app that fetchs data from several APIs based on four commands, followed by an appropriate string:
 * `concert-this`
 * `spotify-this-song`
 * `movie-this`
 * `do-what-it-says`

 ![liriNodeDemo](https://user-images.githubusercontent.com/42453320/65729822-78431080-e074-11e9-93c8-78bfc3a409f7.gif)

## Technical Approach

To account for users entering in the command with or without an appropriate string that follows, CLI input is first parsed into a command and an input variable, depending on length of process.argv. API calls are organized into their own functions, then assembled into a getCommand function that is called by the processor. This method of using a series of callback was used due to the asynchronous nature of node.js and the calls, to force some synchronous behavior.

A few of these calls default to a particular song or artist should the user not have provided one, otherwise the instructions of how to use the app are printed. 

Features include:

* City + Country or City + State output depending on whether concert location is outside of U.S. or not
![liriNodeCountry](https://user-images.githubusercontent.com/42453320/65729913-d5d75d00-e074-11e9-803b-ec654e5ce3d6.JPG)

* Instructions in case user forgets to enter in string:
![liriNodeDemo2](https://user-images.githubusercontent.com/42453320/65730020-4aaa9700-e075-11e9-80ea-fe60f1021687.gif)

* The ability to handle very large strings: 
![liriNodeDemo3](https://user-images.githubusercontent.com/42453320/65730184-c4db1b80-e075-11e9-9095-459cbeb23420.gif)
(Doesn't look like a very good movie!)

* And very small ones, or with characters in their name:



## Instructions

If you would like to clone this code and run it yourself, you will need to add your spotify keys into a .env file. 

## Technologies Used

* JavaScript
* Node.js
* Axios node package
* Moment node package
* Spotify node package
* ombDB and bandsintown APIs
* API key encryption with DotEnv

## Authors 

*Stephanie Lake - (https://github.com/sjconst)
