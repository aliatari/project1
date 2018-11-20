// Shorthand for $( document ).ready()
$(function() {
    // Background image array
    let bgImageArray = ["avatar.jpg", "empire.jpg", "sound.jpg", "darth.jpg", 
    "tanenbaums.jpg", "titanic.jpg", "darjeeling.jpg", "wonderWoman.jpg"];
    // Starts the array index at 0
    let bgIndex = [0];
    // When false, background zooms in, when true, background zooms out
    let flip = false;
    // Pass index of bgImageArray as url link for background image
    $(".inner-div-in").css("background-image", `url('assets/images/${bgImageArray[bgIndex]}')`);
    bgIndex++;

    // Timer to change background every 5 secs
    setInterval(() => {
        if (!flip) {
            zoomOut();
        }else if(flip){
            zoomIn();
        }
    }, 5000);


    zoomIn = function() {
        $('.outer-div').empty();
        let innerDiv = $('<div class="inner-div-in"></div>');
        innerDiv.css("background-image", `url('assets/images/${bgImageArray[bgIndex]}')`);
        $('.outer-div').append(innerDiv);
        bgIndex++;
        flip = false;
    }


    zoomOut = function() {
        $('.outer-div').empty();
        let innerDiv = $('<div class="inner-div-out"></div>');
        innerDiv.css("background-image", `url('assets/images/${bgImageArray[bgIndex]}')`);
        $('.outer-div').append(innerDiv);
        bgIndex++;
        flip = true;
    }
})

// captures value(s) from form submission
$('#my-form').submit(function (event){
    event.preventDefault();
    // grab input value from form
    let movieInput = $('#movie-input').val().trim();
    // pass value to function
    makeApiCall(movieInput);
});

// makes api call with param(s)
makeApiCall = function(movieInput) {
    // only param being passed currently is movieInput (a movie title)
    let queryURL = "https://www.omdbapi.com/?t=" + movieInput +"&apikey=376982ce&"
    $.ajax({ /* jquery ajax call */
            url: queryURL,
            method: "GET"
        })
        .then(function (response) { /* promise */
            console.log(response);
        });
}