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
            var activity = data.activity;
            var type = data.type;
            var participants = data.participants;
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
function socialparts(e){
    var selection = e.target.value
    var socialParticipants = document.getElementById("participants");
    var socialParticipantsVal = socialParticipants.value;
    console.log(selection)
    console.log(socialParticipantsVal)
if(selection === 'social'){
    var rmhidden = document.getElementsByClassName('hidden');
    console.log(rmhidden[0])
    console.log(document.getElementById('hide'))
    rmhidden[0].classList.remove('hidden')
} else {
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
            var activity = data.activity;
            var participants = data.participants;
            var type = data.type;
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

function randomJoke() {

    var jokeTypeElement = document.getElementById('joke-type');
    var jokeTypeValue = jokeTypeElement.value;

    fetch(jokeQueryUrl + jokeTypeValue + '/random')
        .then(function (response) {

        return response.json();
    })
    .then(function (data) {
        console.log(data[0].setup);
        var setup = data[0].setup;
        var punchline = data[0].punchline;
        var setupElement = document.createElement('h2');
        var punchlineElement = document.createElement('h4');
        if (document.getElementById('joke-display').firstChild == null){
            var setupElement = document.createElement('h2');
            var punchlineElement = document.createElement('h4');
            setupElement.innerHTML = setup;
            punchlineElement.innerHTML = punchline;
            document.getElementById('joke-display').appendChild(setupElement);
            document.getElementById('joke-display').appendChild(punchlineElement);
        } else {
            document.getElementById('joke-display').children[0].innerHTML = setup;
            document.getElementById('joke-display').children[1].innerHTML = punchline;
        }
        })

}

var randomBtn = document.getElementById('randomBtn');
var jokeBtn = document.getElementById('joke-btn');
var clearBtn = document.getElementById('clear-btn');  //added by greg 1/26 for clear button functionality
var changesocial = document.getElementById('activity-id')
var activitySub = document.getElementById('sub-bttn')

changesocial.addEventListener('change', socialparts)
activitySub.addEventListener('click', activity)
randomBtn.addEventListener('click', randomActivity);
jokeBtn.addEventListener('click', randomJoke)
clearBtn.addEventListener('click', clear) //added by greg 1/26 for clear button functionality





