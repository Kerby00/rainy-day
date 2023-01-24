var boredQueryUrl = "http://www.boredapi.com/api/activity/"
var jokeQueryUrl= "https://official-joke-api.appspot.com/jokes/ten"

var boredType;
var boredParticipants;
var boredMinPrice;
var boredMaxPrice;
var jokeType;


//retrieve data from activity api and log to console
fetch(boredQueryUrl)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data)
    })


//retrieve data from joke api and log to console
fetch(jokeQueryUrl)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data)           

    })

