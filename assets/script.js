var boredQueryUrl = "http://www.boredapi.com/api/activity/"
var jokeQueryUrl= "https://official-joke-api.appspot.com/jokes/random"

var boredType;
var boredParticipants;
var boredMinPrice;
var boredMaxPrice;
var jokeType;



function randomActivity(){

//retrieve data from activity api and log to console
fetch(boredQueryUrl)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        var activity = data.activity;
        var type = data.type;
        var participants = data.participants;
        var link = data.link;
        
        var typeElement = document.createElement('li');
        var activityElement = document.createElement('h3');
        var participantsElement = document.createElement('li');
        var linkElement = document.createElement('li');

        typeElement.innerHTML = type;
        activityElement.innerHTML = activity;
        participantsElement.innerHTML = participants;
        linkElement.innerHTML = link;



        document.getElementById('random-activity').appendChild(activityElement);
        document.getElementById('random-activity').appendChild(typeElement);        
        document.getElementById('random-activity').appendChild(participantsElement);
        document.getElementById('random-activity').appendChild(linkElement);

    
    })

}
//retrieve data from joke api and log to console
fetch(jokeQueryUrl)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data)           

    })



var randomBtn  = document.getElementById('randomBtn');
randomBtn.addEventListener('click', randomActivity);

//randomActivity()