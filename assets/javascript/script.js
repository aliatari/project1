/* -------------------------------------------------------------------------------------------------- */
/*                                                                                                    */
/*                                        BACKGROUND IMAGES                                           */
/*                                                                                                    */
/* -------------------------------------------------------------------------------------------------- */

/* ---------------------------------------------------------------- */
/* Mandeep's changes                                                */
/* ---------------------------------------------------------------- */

// Background image array
let bgImageArray = [
    "https://image.tmdb.org/t/p/original/gLhYg9NIvIPKVRTtvzCWnp1qJWG.jpg",
    "https://image.tmdb.org/t/p/original/wdj8FK2bCA7iNtZRSzJHrltAwnr.jpg",
    "https://image.tmdb.org/t/p/original/pb60xSzUnS9D5iDvrV8N6QOG3ZR.jpg",
    "https://image.tmdb.org/t/p/original/pAWOZHOM86jLN1TlzQZ1NMGjdqK.jpg",
    "https://image.tmdb.org/t/p/original/aJ7RVMe6eE7gnTVjWqRUiw9wD9D.jpg",
    "https://image.tmdb.org/t/p/original/ozFatXRKefWqyZQJfiBenTizuqr.jpg"
];

//default location
let geolocation = "0.00,0.00"; //"47.7059591,-122.2106905";

// Starts the array index at 0
let bgIndex = 0;
// When false, background zooms in, when true, background zooms out
let flip = false;

/* Mandeep Function */
getLocation = function () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        console.log("Geolocation not supported by this browser.");
    }
};

showPosition = function (position) {
    // console.log("Latitude: " + position.coords.latitude +
    //     " Longitude: " + position.coords.longitude);
    geolocation = position.coords.latitude + "," + position.coords.longitude;
    console.log(geolocation);

    showTimes();

};



NowPlaying = function () {

    //Onload set GeoLocation from client's browser
    getLocation();

    // movieInput passed as a param to search movie titles
    let queryURL = "https://api.themoviedb.org/3/movie/now_playing?api_key=c5203bcbbee2d69dcb21052d7ef5621c&language=en-US&page=1";

    $.ajax({ /* jquery ajax call */
        url: queryURL,
        method: "GET"
    })
        .then(function (response) { /* promise */
            //console.log(response);

            var top20 = response.results.length;
            for (i = 0; i < top20; i++) {
                var movieID = response.results[i].id;
                var posterpath = "http://image.tmdb.org/t/p/original" + response.results[i].poster_path;
                var title = response.results[i].title;

                bgImageArray.push(posterpath);

                //for every movie get video
                // let videourl = "https://api.themoviedb.org/3/movie/" + movieID + "?api_key=c5203bcbbee2d69dcb21052d7ef5621c&append_to_response=videos";

                // $.ajax({ /* jquery ajax call */
                //     url: videourl,
                //     method: "GET"
                // })
                //     .then(function (response) { /* promise */
                //         console.log(response);
                //     });
            };
        });

};

// Shorthand for $( document ).ready()
$(function () {

    /***********Set Container 1**************** */
    $('#container-cl-1').find('.inner-div-in').addClass('active');

    // Pass index of bgImageArray as url link for background image
    $('#container-cl-1').find('.inner-div-in').css("background-image", `url('${bgImageArray[bgIndex]}')`);

    bgIndex++;
    $('#container-cl-1').find('.inner-div-out').css("background-image", `url('${bgImageArray[bgIndex]}')`);

    // Timer to change background every 10 secs
    setInterval(() => {
        if (!flip) {
            zoomOut("#container-cl-1");
        } else if (flip) {
            zoomIn("#container-cl-1");
        }
    }, 10000);

    /***********Set Container 2**************** */
    $('#container-cl-2').find('.inner-div-in').addClass('active');

    //bgIndex++;
    // Pass index of bgImageArray as url link for background image
    $('#container-cl-2').find('.inner-div-in').css("background-image", `url('${bgImageArray[bgIndex]}')`);

    bgIndex++;
    $('#container-cl-2').find('.inner-div-out').css("background-image", `url('${bgImageArray[bgIndex]}')`);

    // Timer to change background every 10 secs
    setInterval(() => {
        if (!flip) {
            zoomOut("#container-cl-2");
        } else if (flip) {
            zoomIn("#container-cl-2");
        }
    }, 10000);

    /***********Set Container 3**************** */
    $('#container-cl-3').find('.inner-div-in').addClass('active');

    //bgIndex++;
    // Pass index of bgImageArray as url link for background image
    $('#container-cl-3').find('.inner-div-in').css("background-image", `url('${bgImageArray[bgIndex]}')`);

    bgIndex++;
    $('#container-cl-3').find('.inner-div-out').css("background-image", `url('${bgImageArray[bgIndex]}')`);

    // Timer to change background every 10 secs
    setInterval(() => {
        if (!flip) {
            zoomOut("#container-cl-3");
        } else if (flip) {
            zoomIn("#container-cl-3");
        }
    }, 10000);



    zoomIn = function (container) {

        $(container).find('.inner-div-out').removeClass('active');
        $(container).find('.inner-div-in').remove();
        $(container).find('.inner-div-out').remove();
        console.log(`Zoom-in: removed div-in and div-out, bgIndex: ${bgIndex}`);

        if (bgIndex !== bgImageArray.length) {
            let innerDivIn = $('<div class="inner-div-in"></div>');
            innerDivIn.css("background-image", `url('${bgImageArray[bgIndex]}')`);
            innerDivIn.addClass('active');
            $(container).find('.outer-div').append(innerDivIn);
            bgIndex++;
            let innerDivOut = $('<div class="inner-div-out"></div>');
            innerDivOut.css("background-image", `url('${bgImageArray[bgIndex]}')`);
            $(container).find('.outer-div').append(innerDivOut);
            flip = false;
        } else if (bgIndex === bgImageArray.length) {
            bgIndex = 0;
            zoomIn(container);
        }

    }


    zoomOut = function (container) {
        // if (bgIndex <= 1) {
        //     $(container).find('.inner-div-in').removeClass('active');
        //     setTimeout(() => {
        //         $(container).find('.inner-div-in').remove();
        //     }, 2000);
        //     bgIndex++;
        // } else if ((bgIndex >= 1) && 

        if (bgIndex !== bgImageArray.length) {

            $(container).find('.inner-div-in').removeClass('active');
            $(container).find('.inner-div-in').remove();
            $(container).find('.inner-div-out').remove();
            console.log(`Zoom-out: removed div-in and div-out, bgIndex: ${bgIndex}`);

            let innerDivOut = $('<div class="inner-div-out"></div>');
            innerDivOut.css("background-image", `url('${bgImageArray[bgIndex]}')`);
            innerDivOut.addClass('active');
            $(container).find('.outer-div').append(innerDivOut);
            bgIndex++;
            let innerDivIn = $('<div class="inner-div-in"></div>');
            innerDivIn.css("background-image", `url('${bgImageArray[bgIndex]}')`);
            $(container).find('.outer-div').append(innerDivIn);
            flip = true;
        } else if (bgIndex === bgImageArray.length) {
            bgIndex = 0;
            zoomOut(container);
        }
    }
})

/* -------------------------------------------------------------------------------------------------- */
/*                                                                                                    */
/*                                             API FUNCTIONS                                          */
/*                                                                                                    */
/* -------------------------------------------------------------------------------------------------- */

// globals used as param in query urls
let page = 1;
let genreID = "";
let decadeID = "";
let i = 0;
let yearStart = "";
let yearEnd = "";

// capture input values for genre
$('#genre').on('click', 'a', function (e) {
    genreID = $(this).attr('id');
})

// capture input values for decade
$('#decade').on('click', 'a', function (e) {
    decadeID = $(this).attr('id');
})


// captures value(s) from form submission
$('#my-form').submit(function (event) {
    event.preventDefault();
    if ($('#movie-input').val() === "") {
        // let genreInput = genreID; /* change these later to simply genreID and decadeID  revisit*/
        // let decadeInput = decadeID; /* change these later to simply genreID and decadeID  revisit*/

        makeApiCallGenre(genreID, decadeID);
        clearBody();
    } else {
        // grab input value from form
        let movieInput = $('#movie-input').val().trim();
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


makeApiCallGenre = function (genreID, decadeID) {
    // variables to access movies within certain decades
    // passed to queryURL
    // let yearStart = "";
    // let yearEnd = "";

    // define these start and end years using data-tags in the html
    // in the drop down menu li's 
    // this is redundant
    switch (true) {
        case decadeID == "30's":
            yearStart = "1930",
                yearEnd = "1949"
            break
        case decadeID == "40's":
            yearStart = "1940",
                yearEnd = "1949"
            break
        case decadeID == "50's":
            yearStart = "1950",
                yearEnd = "1959"
            break
        case decadeID === "60's":
            yearStart = "1960",
                yearEnd = "1969"
            break
        case decadeID === "70's":
            yearStart = "1970",
                yearEnd = "1979"
            break
        case decadeID === "80's":
            yearStart = "1980",
                yearEnd = "1989"
            break
        case decadeID === "90's":
            yearStart = "1990",
                yearEnd = "1999"
            break
        case decadeID === "00's":
            yearStart = "2000",
                yearEnd = "2009"
            break;
        case decadeID === "10's":
            yearStart = "2010",
                yearEnd = "2019"
            break;
    }

    // movie genreInput passed as a param to search movie genre's  
    let queryURL = "https://api.themoviedb.org/3/discover/movie?api_key=c5203bcbbee2d69dcb21052d7ef5621c&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=" + page + "&primary_release_date.gte=" + yearStart + "-01-01&primary_release_date.lte=" + yearEnd + "-12-31&vote_average.gte=6&with_genres=" + genreID;


    $.ajax({ /* jquery ajax call */
        url: queryURL,
        method: "GET"
    })
        .then(function (response) { /* promise */
            console.log(response);
            let data = response;
            parseData(data);
            renderPagination();
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
        } else if (vote_average <= 80) {
            vote_color = "green";
        } else if (vote_average >= 80) {
            vote_color = "blue";
        }
        // converts percent into string
        vote_average = vote_average.toString();
        renderCard(title, release_date, poster, overview, vote_average, vote_color);
    });
}

renderPagination = function () {
    let pages = $('<div id="pagination"><ul class="pagination pagination-content"><li><a href="#" class="page" id="prev">Prev</a></li><li><a href="#" class="page" id="1">1</a></li><li><a href="#" class="page" id="2">2</a></li><li><a href="#" class="page" id="3">3</a></li><li><a href="#" class="page" id="next">Next</a></li></ul></div>');
    pages.appendTo('.container-fluid');
}

renderCard = function (title, release_date, poster, overview, vote_average, vote_color) {
    // $('.container-fluid').empty();
    let myCol = $('<div class="col-sm-6 col-md-6 pb-4"></div>');

    let myPanel = $('<div class="card card-outline-info" id="' + i + 'Panel"><div class="card-block"> <img src="' + poster + ' "class="rounded poster"> <div class="box"><div class="single-chart"><svg viewBox="0 0 36 36" class="circular-chart ' + vote_color + '"><path class="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/><path class="circle" stroke-dasharray="' + vote_average + ', 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/><text x="18" y="20.35" class="percentage">' + vote_average + '%</text></svg><span id="title">' + title + '<br><span id="release-date">' + release_date + '</span></span></div><div id="overview"><p class="overflow">' + overview + ' </p></div></div></div></div>');

    myPanel.appendTo(myCol);
    myCol.appendTo('#contentPanel');
    i++;
}

// capture clicks on pagination buttons
$(document).on("click", ".pagination li a", function (e) {
    e.preventDefault();
    pageInput = $(this).attr('id');
    if (pageInput === 'prev') {
        page = (page - 1);
    } else if (pageInput === 'next') {
        page = (page + 1);
    }
    console.log(page);
    goToPage(page);
});

goToPage = function (page) {

    // movie genreInput passed as a param to search movie genre's  
    let queryURL = "https://api.themoviedb.org/3/discover/movie?api_key=c5203bcbbee2d69dcb21052d7ef5621c&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=" + page + "&primary_release_date.gte=" + yearStart + "-01-01&primary_release_date.lte=" + yearEnd + "-12-31&vote_average.gte=6&with_genres=" + genreID;


    $.ajax({ /* jquery ajax call */
        url: queryURL,
        method: "GET"
    })
        .then(function (response) { /* promise */
            console.log(response);
            let data = response;
            parseData(data);
            // iterate pageNum for click of 'load more' or 'next page'
            // pageNum++;
            renderPagination();
        });
};



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

/****************************************** */
/*     NowPlaying Cinemas near me           */
/****************************************** */

//International  Showtimes they take TMDB movieID so good for us.
showTimes = function () {

    showtimeURL = "https://api.internationalshowtimes.com/v4/movies/?location=" + geolocation + "&distance=10&limit=10&fields=id,title,synopsis,poster_image_thumbnail,runtime,genres,ratings,website,release_dates,trailers";

    console.log(showtimeURL);

    $.ajax({
        url: showtimeURL,
        type: "GET",
        data: {
            "countries": "US",
        },
        headers: {
            "X-API-Key": "jDUuWtnLAKvxl1cNbMyNVpHJcpnFGbnX",
        },
    })
        .done(function (data, textStatus, jqXHR) {
            console.log("HTTP Request Succeeded: " + jqXHR.status);
            //console.log(data);

            //show only 10 movies near by
            for (i = 0; i < 10; i++) {
                //retrieve movie details & showtime details
                var cinemasQuery = "https://api.internationalshowtimes.com/v4/cinemas?movie_id=" + data.movies[i].id + "&location=" + geolocation + "&distance=10&limit=3";
                //console.log(cinemasQuery);

                $.ajax({
                    url: cinemasQuery,
                    type: "GET",
                    data: {
                        "countries": "US",
                    },
                    headers: {
                        "X-API-Key": "jDUuWtnLAKvxl1cNbMyNVpHJcpnFGbnX",
                    },
                })
                    .done(function (data, textStatus, jqXHR) {
                        console.log("HTTP Request Succeeded: " + jqXHR.status);
                        //console.log(data);

                        console.log(data.cinemas[0]);
                    })
                    .fail(function (jqXHR, textStatus, errorThrown) {
                        console.log("HTTP Request Failed");
                    });

            };
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            console.log("HTTP Request Failed");
        });
};

