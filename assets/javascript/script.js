/* -------------------------------------------------------------------------------------------------- */
/*                                                                                                    */
/*                                        BACKGROUND IMAGES                                           */
/*                                                                                                    */
/* -------------------------------------------------------------------------------------------------- */

// Shorthand for $( document ).ready()
$(function () {
    // Background image array
    let bgImageArray = ["avatar.jpg", "empire.jpg", "sound.jpg", "darth.jpg",
        "tanenbaums.jpg", "titanic.jpg", "darjeeling.jpg", "wonderWoman.jpg"
    ];

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
        if (!flip) {
            zoomOut();
        } else if (flip) {
            zoomIn();
        }
    }, 10000);


    zoomIn = function () {
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
        } else if (bgIndex === bgImageArray.length) {
            bgIndex = 2;
            zoomIn();
        }
    }


    zoomOut = function () {
        if (bgIndex <= 1) {
            $('.inner-div-in').removeClass('active');
            setTimeout(() => {
                $('.inner-div-in').remove();
            }, 2000);
            bgIndex++;
        } else if ((bgIndex >= 1) && (bgIndex !== bgImageArray.length)) {
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
        } else if (bgIndex === bgImageArray.length) {
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

// globals used as param in query urls
let pageNum = 1;
let genreID = "";
let decadeID = "";
let i = 0;

// capture input values for genre
$('#genre').on('click', 'a', function (e) {
    genreID = $(this).attr('id');
    console.log(genreID);
})

// capture input values for decade
$('#decade').on('click', 'a', function (e) {
    decadeID = $(this).attr('id');
    console.log(decadeID);
})


// captures value(s) from form submission
$('#my-form').submit(function (event) {
    event.preventDefault();
    if ($('#movie-input').val() === "") {
        let genreInput = genreID; /* change these later to simply genreID and decadeID  revisit*/
        let decadeInput = decadeID; /* change these later to simply genreID and decadeID  revisit*/

        makeApiCallGenre(genreInput, decadeInput);
        clearBody();
    } else {
        // grab input value from form
        let movieInput = $('#movie-input').val().trim();
        console.log(movieInput);
        // pass value to function
        makeApiCall(movieInput);
        clearBody();
    }
});


clearBody = function () {
    //hide background images and footer
    $('.pic-container').css('display', 'none');
    $('#footer').css('display', 'none');
}


makeApiCall = function (movieInput) {
    console.log('make api call ran');
    // movieInput passed as a param to search movie titles
    let queryURL = "https://api.themoviedb.org/3/search/movie?api_key=c5203bcbbee2d69dcb21052d7ef5621c&query=" + movieInput;
    if (movieInput === "") {
        console.log('no movie title entered');
    }

    $.ajax({ /* jquery ajax call */
            url: queryURL,
            method: "GET"
        })
        .then(function (response) { /* promise */
            // console.log(response); 
            let data = response;
            parseData(data);
        });
}


makeApiCallGenre = function (genreInput, decadeInput) {
    // variables to access movies within certain decades
    // passed to queryURL
    let yearStart = "";
    let yearEnd = "";

    // define these start and end years using data-tags in the html
    // in the drop down menu li's 
    // this is redundant
    switch (true) {
        case decadeInput == "30's":
            yearStart = "1930",
                yearEnd = "1949"
            break
        case decadeInput == "40's":
            yearStart = "1940",
                yearEnd = "1949"
            break
        case decadeInput == "50's":
            yearStart = "1950",
                yearEnd = "1959"
            break
        case decadeInput === "60's":
            yearStart = "1960",
                yearEnd = "1969"
            break
        case decadeInput === "70's":
            yearStart = "1970",
                yearEnd = "1979"
            break
        case decadeInput === "80's":
            yearStart = "1980",
                yearEnd = "1989"
            break
        case decadeInput === "90's":
            yearStart = "1990",
                yearEnd = "1999"
            break
        case decadeInput === "00's":
            yearStart = "2000",
                yearEnd = "2009"
            break;
        case decadeInput === "10's":
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
            // console.log(response); 
            let data = response;
            parseData(data);
            // iterate pageNum for click of 'load more' or 'next page'
            pageNum++;
        });
}

parseData = function (data) {
    // console.log(data);
    let base = "http://image.tmdb.org/t/p/w342/";
    data.results.forEach(function (element) {
        // console.log(element);
        let title = element.title;
        let release_date = element.release_date;
        let poster = base + element.poster_path;
        let overview = element.overview;
        let vote_average = element.vote_average;
        let vote_color = "";
        // converts 0-10 num to percent
        vote_average = Math.round((vote_average * 10));
        // constructs percentage colors
        if (vote_average <= 70) {
            vote_color = "orange";
        }else if (vote_average <= 80) {
            vote_color = "green";
        }else if (vote_average >= 80) {
            vote_color = "blue";
        }
        // converts percent into string
        vote_average = vote_average.toString();
        renderCard(title, release_date, poster, overview, vote_average, vote_color);
    });
}

renderCard = function (title, release_date, poster, overview, vote_average, vote_color) {
    // $('.container-fluid').empty();
    var myCol = $('<div class="col-sm-6 col-md-6 pb-4"></div>');

    var myPanel = $('<div class="card card-outline-info" id="' + i + 'Panel"><div class="card-block"> <img src="' + poster + ' "class="rounded poster"> <div class="box"><div class="single-chart"><svg viewBox="0 0 36 36" class="circular-chart ' + vote_color + '"><path class="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/><path class="circle" stroke-dasharray="' + vote_average + ', 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/><text x="18" y="20.35" class="percentage">' + vote_average + '%</text></svg><span id="title">' + title + '<br><span id="release-date">' + release_date + '</span></span></div><div id="overview"><p class="overflow">' + overview + ' </p></div></div></div></div>');

    myPanel.appendTo(myCol);
    myCol.appendTo('#contentPanel');
    i++;
}


/* Mandeep Function */

// NowPlaying = function () {
//    // movieInput passed as a param to search movie titles
//    let queryURL = "https://api.themoviedb.org/3/movie/now_playing?api_key=c5203bcbbee2d69dcb21052d7ef5621c&language=en-US&page=1";

//    $.ajax({ /* jquery ajax call */
//        url: queryURL,
//        method: "GET"
//    })
//        .then(function (response) { /* promise */
//            console.log(response);

//            var top20 = response.results.length;
//            for (i = 0; i < 10; i++) {
//                var movieID = response.results[i].id;
//                var posterpath = "http://image.tmdb.org/t/p/original/"+response.results[i].poster_path;
//                var title = response.results[i].title;

//                console.log(movieID + " " + title + " " + posterpath);

//                var newrow = $(".show-trend").append(
//                    $("<h4>").text(movieID),
//                    $("<h4>").text(title),
//                    $("<img width=300px>").attr("src", posterpath)

//                );

//                //for every movie get video
//                let videourl = "https://api.themoviedb.org/3/movie/" + movieID + "?api_key=c5203bcbbee2d69dcb21052d7ef5621c&append_to_response=videos,images";

//                $.ajax({ /* jquery ajax call */
//                    url: videourl,
//                    method: "GET"
//                })
//                    .then(function (response) { /* promise */
//                        console.log(response);
//                    } );

//                //for keywords
//                let keywordurl = "https://api.themoviedb.org/3/movie/" + movieID + "/keywords?api_key=c5203bcbbee2d69dcb21052d7ef5621c&append_to_response=videos,images";

//                $.ajax({ /* jquery ajax call */
//                    url: keywordurl,
//                    method: "GET"
//                })
//                    .then(function (response) { /* promise */
//                        console.log(response);
//                    } );

//                //configuartion to get image fullpath
//            };
//        })
//    };

// to see the list of id's for all genre's
// not needed for production

// var settings2 = {
//   "async": true,
//   "crossDomain": true,
//   "url": "https://api.themoviedb.org/3/genre/movie/list?language=en-US&api_key=c5203bcbbee2d69dcb21052d7ef5621c",
//   "method": "GET",
//   "headers": {},
//   "data": "{}"
// }

// $.ajax(settings2).done(function (response) {
//   console.log(response);
// });