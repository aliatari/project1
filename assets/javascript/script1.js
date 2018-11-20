// Shorthand for $( document ).ready()
$(function() {
    // Background image array
    let bgImageArray = ["avatar.jpg", "empire.jpg", "sound.jpg", "darth.jpg", 
    "tanenbaums.jpg", "titanic.jpg", "darjeeling.jpg", "wonderWoman.jpg"];

    // Starts the array index at 0
    let bgIndex = [0];
    // When false, background zooms in, when true, background zooms out
    let flip = false;
    $('.inner-div-in').addClass('active');
    // Pass index of bgImageArray as url link for background image
    $('.inner-div-in').css("background-image", `url('assets/images/${bgImageArray[bgIndex]}')`);
    bgIndex++;
    $('.inner-div-out').css("background-image", `url('assets/images/${bgImageArray[bgIndex]}')`);
    $('.inner-div-out').css('animation-delay', `8s`);


    // Timer to change background every 5 secs
    setInterval(() => {
        if(!flip){
            zoomOut();
        } else if(flip){
            zoomIn();
        }  
    }, 10000);
   

    zoomIn = function() {
        $('.inner-div-out').removeClass('active');
        $('.inner-div-in').remove();
        $('.inner-div-out').remove();
        if (bgIndex !== bgImageArray.length) {
            let innerDivIn = $('<div class="inner-div-in"></div>');
            innerDivIn.css("background-image", `url('assets/images/${bgImageArray[bgIndex]}')`);
            innerDivIn.addClass('active');
            $('.outer-div').append(innerDivIn);
            bgIndex++;
            let innerDivOut = $('<div class="inner-div-out"></div>');
            innerDivOut.css("background-image", `url('assets/images/${bgImageArray[bgIndex]}')`);
            $('.outer-div').append(innerDivOut);
            flip = false;
        }else if(bgIndex === bgImageArray.length){
            bgIndex = 2;
            zoomIn();
        }
    }


    zoomOut = function() {
        if(bgIndex <= 1){
           $('.inner-div-in').removeClass('active'); 
           setTimeout(() => {
               $('.inner-div-in').remove();
           }, 2000);
           bgIndex++;
        }
        else if ((bgIndex >= 1) && (bgIndex !== bgImageArray.length)) {
            $('.inner-div-in').removeClass('active');
            $('.inner-div-in').remove();
            $('.inner-div-out').remove();
            console.log(`Zoom-out: removed div-in and div-out, bgIndex: ${bgIndex}`);
            
            let innerDivOut = $('<div class="inner-div-out"></div>');
            innerDivOut.css("background-image", `url('assets/images/${bgImageArray[bgIndex]}')`);
            innerDivOut.addClass('active');
            $('.outer-div').append(innerDivOut);
            bgIndex++;
            let innerDivIn = $('<div class="inner-div-in"></div>');
            innerDivIn.css("background-image", `url('assets/images/${bgImageArray[bgIndex]}')`);
            $('.outer-div').append(innerDivIn);
            flip = true;
        }else if (bgIndex === bgImageArray.length){
            bgIndex = 2;
            zoomOut();
        }
    }
})

/* -------------------------------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------------------------------- */

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
    let queryURL = "https://api.themoviedb.org/3/search/movie?api_key=c5203bcbbee2d69dcb21052d7ef5621c&query=" + movieInput;

    $.ajax({ /* jquery ajax call */
            url: queryURL,
            method: "GET"
        })
        .then(function (response) { /* promise */
            console.log(response);
        });
}

var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://api.themoviedb.org/3/genre/movie/list?language=en-US&api_key=c5203bcbbee2d69dcb21052d7ef5621c",
  "method": "GET",
  "headers": {},
  "data": "{}"
}

$.ajax(settings).done(function (response) {
  console.log(response);
});


// makes api call with param(s)
makeApiCallGenre = function() {
    // only param being passed currently is movieInput (a movie title)
    // let queryURL = "https://api.themoviedb.org/3/genre/13/movie/list?language=en-US&api_key=c5203bcbbee2d69dcb21052d7ef5621c";
    let queryURL = "https://api.themoviedb.org/3/discover/movie?api_key=c5203bcbbee2d69dcb21052d7ef5621c&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_date.gte=1990-01-01&primary_release_date.lte=1999-12-31&vote_average.gte=6&with_genres=" + genre;


    $.ajax({ /* jquery ajax call */
            url: queryURL,
            method: "GET"
        })
        .then(function (response) { /* promise */
            console.log(response);
        });
}

makeApiCallGenre();







// url: "genre/" + options.id + "/movies" + theMovieDb.common.generateQuery(options)
