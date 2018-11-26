
var bgImageArray = ["http://image.tmdb.org/t/p/original//uyJgTzAsp3Za2TaPiZt2yaKYRIR.jpg"];

// Shorthand for $( document ).ready()
$(function() {

    NowPlaying();

    console.log(bgImageArray);

    // Starts the array index at 0
    let bgIndex = [0];
    // When false, background zooms in, when true, background zooms out
    let flip = false;
    $('.inner-div-in').addClass('active');
    // Pass index of bgImageArray as url link for background image
    $('.inner-div-in').css("background-image", `url('${bgImageArray[bgIndex]}')`);
    bgIndex++;
    $('.inner-div-out').css("background-image", `url('${bgImageArray[bgIndex]}')`);
    $('.inner-div-out').css('animation-delay', `5s`); 


    // Timer to change background every 5 secs
    setInterval(() => {
        if(!flip){
            zoomOut();
        } else if(flip){
            zoomIn();
        }  
    }, 5000);
   

    zoomIn = function() {
        $('.inner-div-out').removeClass('active');
        $('.inner-div-in').remove();
        $('.inner-div-out').remove();
        if (bgIndex !== bgImageArray.length) {
            let innerDivIn = $('<div class="inner-div-in"></div>');
            innerDivIn.css("background-image", `url('${bgImageArray[bgIndex]}')`);
            innerDivIn.addClass('active');
            $('.outer-div').append(innerDivIn);
            bgIndex++;
            let innerDivOut = $('<div class="inner-div-out"></div>');
            innerDivOut.css("background-image", `url('${bgImageArray[bgIndex]}')`);
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
           }, 1000);
           bgIndex++;
        }
        else if ((bgIndex >= 1) && (bgIndex !== bgImageArray.length)) {
            $('.inner-div-in').removeClass('active');
            $('.inner-div-in').remove();
            $('.inner-div-out').remove();
            console.log(`Zoom-out: removed div-in and div-out, bgIndex: ${bgIndex}`);
            
            let innerDivOut = $('<div class="inner-div-out"></div>');
            innerDivOut.css("background-image", `url('${bgImageArray[bgIndex]}')`);
            innerDivOut.addClass('active');
            $('.outer-div').append(innerDivOut);
            bgIndex++;
            let innerDivIn = $('<div class="inner-div-in"></div>');
            innerDivIn.css("background-image", `url('${bgImageArray[bgIndex]}')`);
            $('.outer-div').append(innerDivIn);
            flip = true;
        }else if (bgIndex === bgImageArray.length){
            bgIndex = 2;
            zoomOut();
        }
    }
})


/* -------------------------------------------------------------------------------------------------- */
/*                                                                                                    */
/*                                             API FUNCTIONS                                          */
/*                                                                                                    */
/* -------------------------------------------------------------------------------------------------- */

// global used as param in query url
let pageNum = 1;


// captures value(s) from form submission
$('#my-form').submit(function (event){
    event.preventDefault();
    // grab input value from form
    let movieInput = $('#movie-input').val().trim();
    /* this is generic */
    /* will need to be updated when HTML tags include genre id's  */
    // let genreInput = $('#genre-input').val().trim();
    // let decadeInput = $('#decade-input').val().trim();

    // pass value to function
    makeApiCall(movieInput);
    // makeApiCallGenre(genreInput, decadeInput);
});


makeApiCall = function(movieInput) {
    // movieInput passed as a param to search movie titles
    let queryURL = "https://api.themoviedb.org/3/search/movie?api_key=c5203bcbbee2d69dcb21052d7ef5621c&query=" + movieInput;

    $.ajax({ /* jquery ajax call */
            url: queryURL,
            method: "GET"
        })
        .then(function (response) { /* promise */
            console.log(response);
        });
}


makeApiCallGenre = function(genreInput, decadeInput) {
    // variables to access movies within certain decades
    // passed to queryURL
    let yearStart = "";
    let yearEnd = "";

    // define these start and end years using data-tags in the html
    // in the drop down menu li's 
    // this is redundant
    switch (true) {
        case decadeInput == "1930's":
            yearStart = "1930",
            yearEnd = "1949"
            break
        case decadeInput == "1940's":
            yearStart = "1940",
            yearEnd = "1949"
            break
        case decadeInput == "1950's":
            yearStart = "1950",
            yearEnd = "1959"
            break
        case decadeInput === "1960's":
            yearStart = "1960",
            yearEnd = "1969"
            break
        case decadeInput === "1970's":
            yearStart = "1970",
            yearEnd = "1979"
            break
        case decadeInput === "1980's":
            yearStart = "1980",
            yearEnd = "1989"
            break
        case decadeInput === "1990's":
            yearStart = "1990",
            yearEnd = "1999"
            break
        case decadeInput === "2000's":
            yearStart = "2000",
            yearEnd ="2009"
            break;
        case decadeInput === "2010's":
            yearStart = "2010",
            yearEnd = "2019"
            break;
    }

    // movie genreInput passed as a param to search movie genre's  
    let queryURL = "https://api.themoviedb.org/3/discover/movie?api_key=c5203bcbbee2d69dcb21052d7ef5621c&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=" + pageNum + "&primary_release_date.gte=" + yearStart + "-01-01&primary_release_date.lte=" + yearEnd + "-12-31&vote_average.gte=6&with_genres=" + genreInput;


    $.ajax({ /* jquery ajax call */
            url: queryURL,
            method: "GET"
        })
        .then(function (response) { /* promise */
            console.log(response);            
            // iterate pageNum for click of 'load more' or 'next page'
            pageNum++;
        });
}


// to see the list of id's for all genre's
// not needed for production

// var settings = {
//   "async": true,
//   "crossDomain": true,
//   "url": "https://api.themoviedb.org/3/genre/movie/list?language=en-US&api_key=c5203bcbbee2d69dcb21052d7ef5621c",
//   "method": "GET",
//   "headers": {},
//   "data": "{}"
// }

// $.ajax(settings).done(function (response) {
//   console.log(response);
// });

/***************To get movie info and poster for now playing in theaters movies*******************/

NowPlaying = function () {
    // movieInput passed as a param to search movie titles
    let queryURL = "https://api.themoviedb.org/3/movie/now_playing?api_key=c5203bcbbee2d69dcb21052d7ef5621c&language=en-US&page=1";

    $.ajax({ /* jquery ajax call */
        url: queryURL,
        method: "GET"
    })
        .then(function (response) { /* promise */
            console.log(response);

            var top20 = response.results.length;
            for (i = 0; i < 10; i++) {
                var movieID = response.results[i].id;
                var posterpath = "http://image.tmdb.org/t/p/original/"+response.results[i].poster_path;
                var title = response.results[i].title;

                bgImageArray.push(posterpath);

                //console.log(movieID + " " + title + " " + posterpath);

                var newrow = $(".show-trend").append(
                    $("<h4>").text(movieID),
                    $("<h4>").text(title),
                    $("<img width=300px>").attr("src", posterpath)

                );

                //for every movie get video
                let videourl = "https://api.themoviedb.org/3/movie/" + movieID + "?api_key=c5203bcbbee2d69dcb21052d7ef5621c&append_to_response=videos,images";

                $.ajax({ /* jquery ajax call */
                    url: videourl,
                    method: "GET"
                })
                    .then(function (response) { /* promise */
                        //console.log(response);
                    } );
                 
                //for keywords
                let keywordurl = "https://api.themoviedb.org/3/movie/" + movieID + "/keywords?api_key=c5203bcbbee2d69dcb21052d7ef5621c&append_to_response=videos,images";

                $.ajax({ /* jquery ajax call */
                    url: keywordurl,
                    method: "GET"
                })
                    .then(function (response) { /* promise */
                        //console.log(response);
                    } );

                //configuartion to get image fullpath
            };
        })
    };