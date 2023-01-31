var boredQueryUrl = "http://www.boredapi.com/api/activity/"
var jokeQueryUrl = "https://official-joke-api.appspot.com/jokes/"
var boredurl = "http://www.boredapi.com/api/activity?"
var boredMinPrice;
var boredMaxPrice;

//greg 1/26 added function to reload page when clear button is clicked.
function clear() {
    location.reload()
}


function randomActivity() {
    //retrieve data from activity api and log to console
    fetch(boredQueryUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var activity = "Activity:  " + data.activity;
            var type = "Subject:  " + data.type;
            var participants = "Participants:  " + data.participants;
            var link = data.link;
            if (document.getElementById('random-activity').firstChild == null) {
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
            } else {
                document.getElementById('random-activity').children[0].innerHTML = activity;
                document.getElementById('random-activity').children[1].innerHTML = type;
                document.getElementById('random-activity').children[2].innerHTML = participants;
                document.getElementById('random-activity').children[3].innerHTML = link;
            }
        })
}
function socialparts(e) {
    var selection = e.target.value
    var socialParticipants = document.getElementById("participants");
    var socialParticipantsVal = socialParticipants.value;
    console.log(selection)
    console.log(socialParticipantsVal)
    if (selection === 'social') {
        var rmhidden = document.getElementsByClassName('hidden');
        console.log(rmhidden[0])
        console.log(document.getElementById('hide'))
        rmhidden[0].classList.remove('hidden')
    } else {
        socialParticipants.value = ""
        var hideEl = document.getElementById('hide')
        hideEl.classList.add('hidden')
    }
}

function activity(event) {
    event.preventDefault()
    var boredType = document.getElementById('activity-id');
    var boredTypeVal = boredType.value;
    var boredParticipants = document.getElementById("participants");
    var boredParticipantsVal = boredParticipants.value;
    var newboredapi = boredurl + "type=" + boredTypeVal + "&participants=" + boredParticipantsVal
    if (boredTypeVal === 'social' && boredParticipantsVal >= 6) {
        window.alert("Max Social Activity participants is 5")
        boredParticipants.value = ""
        return;
    }
    console.log(newboredapi);
    console.log(boredTypeVal, boredParticipantsVal)
    fetch(newboredapi)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var activity = "Activity:  " + data.activity;
            var participants = "Participants:  " + data.participants;
            var type = "Subject:  " + data.type;
            var link = data.link;
            if (document.getElementById('random-activity').firstChild == null) {
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
            } else {
                document.getElementById('random-activity').children[0].innerHTML = activity;
                document.getElementById('random-activity').children[1].innerHTML = type;
                document.getElementById('random-activity').children[2].innerHTML = participants;
                document.getElementById('random-activity').children[3].innerHTML = link;
            }
        })
}
//retrieve data from joke api and log to console

function randomJoke() {

    var jokeTypeElement = document.getElementById('joke-type');
    var jokeTypeValue = jokeTypeElement.value;



    fetch(jokeQueryUrl + jokeTypeValue + '/random')
        .then(function (response) {

            return response.json();
        })
        .then(function (data) {
            console.log(data[0].setup);
            var setup = "Joke: " + data[0].setup;
            var punchline = "Punchline: " + data[0].punchline;
            var currentJoke = {
                setup: data[0].setup,
                punchline: data[0].punchline,
            }
            var setupElement = document.createElement('h5');
            var punchlineElement = document.createElement('h6');
            if (document.getElementById('joke-display').firstChild == null) {

                var setupElement = document.createElement('h5');
                var punchlineElement = document.createElement('h4');
                var favElement = document.createElement('button')

                setupElement.innerHTML = setup;
                punchlineElement.innerHTML = punchline;
                favElement.innerHTML = 'Save As Favorite';
                favElement.id = 'fav-btn';

                document.getElementById('joke-display').appendChild(setupElement);
                document.getElementById('joke-display').appendChild(punchlineElement);
                document.getElementById('joke-display').appendChild(favElement);


            } else {
                document.getElementById('joke-display').children[0].innerHTML = setup;
                document.getElementById('joke-display').children[1].innerHTML = punchline;
            }

            localStorage.setItem('currentJoke', JSON.stringify(currentJoke));

        })
}

//function to save current displayed joke to local storage as a favorite.  greg 1/27/23
function jokeFavorite() {
    var favJoke = document.getElementById('joke-display').children[0].innerHTML;
    console.log(favJoke)
    if (localStorage.getItem("favJokes") == null) {
        favJokeArray = JSON.parse('[]');
        var currJoke = JSON.parse(localStorage.getItem('currentJoke'));
        console.log(currJoke);
        favJokeArray.push(currJoke);
        localStorage.setItem('favJokes', JSON.stringify(favJokeArray));
    } else {
        var currJoke = JSON.parse(localStorage.getItem('currentJoke'));
        var favJokeArray = JSON.parse(localStorage.getItem('favJokes'));
        favJokeArray.push(currJoke);
        localStorage.setItem('favJokes', JSON.stringify(favJokeArray));
    }

}

//display favorite jokes in a table. greg 1/27/23
function displayFavoriteJokes() {

    var favJokesElement = document.getElementById('popup');
    var tableElement = document.createElement('table');
    tableElement.id = "fav-jokes-table";
    console.log(document.getElementById('fav-jokes-table') != null);

    if (document.getElementById('fav-jokes-table') != null) {
        document.getElementById('fav-jokes-table').remove()
    }

    var tableTitleRow = document.createElement('tr')
    var tableTitle = ''
    var tableRow = document.createElement('tr')
    var tableHeaderArray = ['Setup', 'Punchline'];

    tableTitleRow.innerHTML = tableTitle;
    tableElement.appendChild(tableTitleRow);

    for (let i = 0; i < tableHeaderArray.length; i++) {

        var tableHeader = document.createElement('th');
        var headerText = tableHeaderArray[i];
        tableHeader.innerHTML = headerText;
        tableRow.appendChild(tableHeader)
    }
    tableElement.appendChild(tableRow);
    favJokesElement.appendChild(tableElement);

    var favJokesArray = JSON.parse(localStorage.getItem('favJokes'));
    for (let j = 0; j < favJokesArray.length; j++) {

        var rowEl = document.createElement('tr');
        var setupEl = document.createElement('td');
        var punchlineEl = document.createElement('td');
        setupEl.innerHTML = favJokesArray[j].setup;
        punchlineEl.innerHTML = favJokesArray[j].punchline;

        rowEl.appendChild(setupEl);
        rowEl.appendChild(punchlineEl);

        tableElement.appendChild(rowEl);
    }
}

var popup = document.getElementById("popup")

function openPopup() {
    popup.classList.add("open-popup");
}

function closePopup() {
    popup.classList.remove("open-popup")
}

var randomBtn = document.getElementById('randomBtn');
var jokeBtn = document.getElementById('joke-btn');
var clearBtn = document.getElementById('clear-btn');  //added by greg 1/26 for clear button functionality
var changesocial = document.getElementById('activity-id')
var activitySub = document.getElementById('sub-bttn')
var jokeDisplay = document.getElementById('joke-display') //added by greg 1/27 for save favorite joke
var favJokesDisplay = document.getElementById('fav-jokes')

changesocial.addEventListener('change', socialparts)
activitySub.addEventListener('click', activity);
randomBtn.addEventListener('click', randomActivity);
jokeBtn.addEventListener('click', randomJoke);
clearBtn.addEventListener('click', clear); //added by greg 1/26 for clear button functionality
jokeDisplay.addEventListener('click', jokeFavorite);  //event listener to save current displayed joke as favorite when clicking save as favorite button
favJokesDisplay.addEventListener('click', displayFavoriteJokes); //event listener for button display favorite jokes



