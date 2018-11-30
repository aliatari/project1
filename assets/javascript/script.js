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

let longitude = 0.00;
let latitude = 0.00;

let geolocation = ""; //"47.7059591,-122.2106905";

// Starts the array index at 0
let bgIndex = 0;

// When false, background zooms in, when true, background zooms out
let flip1 = false;
let flip2 = true;
let flip3 = false;


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
    longitude = position.coords.longitude;
    latitude = position.coords.latitude;
    geolocation = position.coords.latitude + "," + position.coords.longitude;
    console.log(geolocation);

};


NowPlaying = function () {

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
            };
        });

};

/****************************************** */
/*     NowPlaying Cinemas near me           */
/****************************************** */

//International Showtimes API
showTimes = function () {

    //$(".now-playing-container").attr("hidden", "hidden");

    showtimeURL = "https://api.internationalshowtimes.com/v4/movies/?location=" + geolocation + "&distance=10&limit=1&fields=id,title,synopsis,poster_image_thumbnail,runtime,genres,ratings,website,release_dates,trailers";

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
            //console.log("HTTP Request Succeeded: " + jqXHR.status);
            //console.log(data);
            var movieId;
            var posterThumbnail;
            var runtime;
            var synopsis;
            var title;
            var genre;
            var trailers;
            var website;
            var theatreName;
            var theatreAddress;
            var theatrePhone;
            var theatrewebsite;

            //show only 10 movies currently playing near by
            for (i = 0; i < 1; i++) {

                //assign Movie data
                movieId = data.movies[i].id;
                posterThumbnail = data.movies[i].poster_image_thumbnail;
                runtime = data.movies[i].runtime;
                synopsis = data.movies[i].synopsis;
                title = data.movies[i].title;
                genre = data.movies[i].genres;
                trailers = data.movies[i].trailers;
                website = data.movies[i].website;


                console.log(
                    title + " " + posterThumbnail + " " + synopsis + " " + website + " " + runtime
                );

                console.log(genre.map(e => e.name).join(","));

                console.log(trailers[0].trailer_files[0].url);

                $("#movie-row-" + (i + 1)).find("img").attr("src", posterThumbnail);
                $("#movie-row-" + (i + 1)).find("img").attr("alt", title);
                $("#movie-row-" + (i + 1)).find(".title").text(title);
                $("#movie-row-" + (i + 1)).find(".synopsis").text(synopsis);
                $("#movie-row-" + (i + 1)).find(".genre").text("Genre: " + genre.map(e => e.name).join(","));
                $("#movie-row-" + (i + 1)).find(".runtime").text("Runtime: " + runtime + "mins");
                $("#movie-row-" + (i + 1)).find(".trailer-link").attr("href", trailers[0].trailer_files[0].url);

                //retrieve movie details & showtime details
                var cinemasQuery = "https://api.internationalshowtimes.com/v4/cinemas?movie_id=" + movieId + "&location=" + geolocation + "&distance=10&limit=3";
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
                        //console.log("HTTP Request Succeeded: " + jqXHR.status);
                        //console.log(data);

                        for (j = 0; j < 3; j++) {
                            theatreName = data.cinemas[j].name;
                            theatreAddress = data.cinemas[j].location.address.display_text;
                            theatrePhone = data.cinemas[j].telephone;
                            theatrewebsite = data.cinemas[j].website;

                            console.log(
                                theatreName + " " + theatreAddress + " " + theatrePhone + " " + theatrewebsite
                            );

                            $("#movie-row-1").find(".showingtheatres").append(text(theatreName + " " + theatreAddress + " " + theatrePhone + " " + theatrewebsite));
                        };
                    })
                    .fail(function (jqXHR, textStatus, errorThrown) {
                        console.log("HTTP Request Failed");
                    });

            };
        
        google.maps.event.addDomListener(window, 'load', initMap);

        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            console.log("HTTP Request Failed");
        });
};

initMap = function () {

    console.log(latitude, longitude);
    var location = new google.maps.LatLng(latitude, longitude);

    var mapCanvas = document.getElementById('map');
    var mapOptions = {
        center: location,
        zoom: 16,
        panControl: false,
        scrollwheel: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    var map = new google.maps.Map(mapCanvas, mapOptions);

    var markerImage = 'marker.png';

    var marker = new google.maps.Marker({
        position: location,
        map: map,
        icon: markerImage
    });

    var contentString = '<div class="info-window">' +
        '<h3>Info Window Content</h3>' +
        '<div class="info-content">' +
        '<p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.</p>' +
        '</div>' +
        '</div>';

    var infowindow = new google.maps.InfoWindow({
        content: contentString,
        maxWidth: 400
    });

    marker.addListener('click', function () {
        infowindow.open(map, marker);
    });

    var styles = [{ "featureType": "landscape", "stylers": [{ "saturation": -100 }, { "lightness": 65 }, { "visibility": "on" }] }, { "featureType": "poi", "stylers": [{ "saturation": -100 }, { "lightness": 51 }, { "visibility": "simplified" }] }, { "featureType": "road.highway", "stylers": [{ "saturation": -100 }, { "visibility": "simplified" }] }, { "featureType": "road.arterial", "stylers": [{ "saturation": -100 }, { "lightness": 30 }, { "visibility": "on" }] }, { "featureType": "road.local", "stylers": [{ "saturation": -100 }, { "lightness": 40 }, { "visibility": "on" }] }, { "featureType": "transit", "stylers": [{ "saturation": -100 }, { "visibility": "simplified" }] }, { "featureType": "administrative.province", "stylers": [{ "visibility": "off" }] }, { "featureType": "water", "elementType": "labels", "stylers": [{ "visibility": "on" }, { "lightness": -25 }, { "saturation": -100 }] }, { "featureType": "water", "elementType": "geometry", "stylers": [{ "hue": "#ffff00" }, { "lightness": -25 }, { "saturation": -97 }] }];

    map.set('styles', styles);


}

// Shorthand for $( document ).ready()
$(function () {

    //Onload set GeoLocation from client's browser
    getLocation();

    NowPlaying();
    /***********Set Container 1**************** */
    $('#container-cl-1').find('.inner-div-in').addClass('active');

    // Pass index of bgImageArray as url link for background image
    $('#container-cl-1').find('.inner-div-in').css("background-image", `url('${bgImageArray[bgIndex]}')`);

    bgIndex++;
    $('#container-cl-1').find('.inner-div-out').css("background-image", `url('${bgImageArray[bgIndex]}')`);

    // Timer to change background every 10 secs
    setInterval(() => {
        if (!flip1) {
            zoomOut("#container-cl-1");
        } else if (flip1) {
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
        if (!flip2) {
            zoomOut("#container-cl-2");
        } else if (flip2) {
            zoomIn("#container-cl-2");
        }
    }, 8000);

    /***********Set Container 3**************** */
    $('#container-cl-3').find('.inner-div-in').addClass('active');

    //bgIndex++;
    // Pass index of bgImageArray as url link for background image
    $('#container-cl-3').find('.inner-div-in').css("background-image", `url('${bgImageArray[bgIndex]}')`);

    bgIndex++;
    $('#container-cl-3').find('.inner-div-out').css("background-image", `url('${bgImageArray[bgIndex]}')`);

    // Timer to change background every 10 secs
    setInterval(() => {
        if (!flip3) {
            zoomOut("#container-cl-3");
        } else if (flip3) {
            zoomIn("#container-cl-3");
        }
    }, 9000);


    zoomIn = function (container) {

        $(container).find('.inner-div-out').removeClass('active');
        $(container).find('.inner-div-in').remove();
        $(container).find('.inner-div-out').remove();
        //console.log(`Zoom-in: removed div-in and div-out, bgIndex: ${bgIndex}`);

        if (bgIndex !== bgImageArray.length) {
            let innerDivIn = $('<div class="inner-div-in"></div>');
            innerDivIn.css("background-image", `url('${bgImageArray[bgIndex]}')`);
            innerDivIn.addClass('active');
            $(container).find('.outer-div').append(innerDivIn);
            bgIndex++;
            let innerDivOut = $('<div class="inner-div-out"></div>');
            innerDivOut.css("background-image", `url('${bgImageArray[bgIndex]}')`);
            $(container).find('.outer-div').append(innerDivOut);

            if (container === "#container-cl-1") {
                flip1 = false;
            } else if (container === "#container-cl-2") {
                flip2 = false;
            } else if (container === "#container-cl-3") {
                flip3 = false;
            };
        } else if (bgIndex === bgImageArray.length) {
            bgIndex = 0;
            zoomIn(container);
        }

    };


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
            //console.log(`Zoom-out: removed div-in and div-out, bgIndex: ${bgIndex}`);

            let innerDivOut = $('<div class="inner-div-out"></div>');
            innerDivOut.css("background-image", `url('${bgImageArray[bgIndex]}')`);
            innerDivOut.addClass('active');
            $(container).find('.outer-div').append(innerDivOut);
            bgIndex++;
            let innerDivIn = $('<div class="inner-div-in"></div>');
            innerDivIn.css("background-image", `url('${bgImageArray[bgIndex]}')`);
            $(container).find('.outer-div').append(innerDivIn);
            if (container === "#container-cl-1") {
                flip1 = true;
            } else if (container === "#container-cl-2") {
                flip2 = true;
            } else if (container === "#container-cl-3") {
                flip3 = true;
            };
        } else if (bgIndex + 1 === bgImageArray.length) {
            bgIndex = 0;
            zoomOut(container);
        }
    };


});

/* -------------------------------------------------API's Etc------------------------------------------------- */


// globals used as param in query urls
let page = 1;
let movieInput = "";
let genreID = "";
let decadeID = "";
let i = 0;
let yearStart = "";
let yearEnd = "";
let callApiByTitle = false;
let callApiByGenre = false;
let pageCount = 0;

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
        movieInput = $('#movie-input').val().trim();
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
    // iterate page count
    // prevents double-render of pagination div
    pageCount += 1;

    // movieInput passed as a param to search movie titles
    let queryURL = "https://api.themoviedb.org/3/search/movie?api_key=c5203bcbbee2d69dcb21052d7ef5621c&query=" + movieInput + "&page=" + page + "&sort_by=popularity.desc";

    if (movieInput === "") {
        // console.log('no movie title entered');
    }

    $.ajax({ /* jquery ajax call */
        url: queryURL,
        method: "GET"
    })
        .then(function (response) { /* promise */
            console.log(response);
            let data = response;
            parseData(data);
            callApiByGenre = false;
            callApiByTitle = true;
            renderPagination();
        });
}


makeApiCallGenre = function (genreID, decadeID) {
    // iterate page count
    // prevents double-render of pagination div
    pageCount += 1;

    switch (true) {
        case decadeID == "30's":
            yearStart = "1930", yearEnd = "1949"
            break
        case decadeID == "40's":
            yearStart = "1940", yearEnd = "1949"
            break
        case decadeID == "50's":
            yearStart = "1950", yearEnd = "1959"
            break
        case decadeID === "60's":
            yearStart = "1960", yearEnd = "1969"
            break
        case decadeID === "70's":
            yearStart = "1970", yearEnd = "1979"
            break
        case decadeID === "80's":
            yearStart = "1980", yearEnd = "1989"
            break
        case decadeID === "90's":
            yearStart = "1990", yearEnd = "1999"
            break
        case decadeID === "00's":
            yearStart = "2000", yearEnd = "2009"
            break;
        case decadeID === "10's":
            yearStart = "2010", yearEnd = "2019"
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
            callApiByTitle = false;
            callApiByGenre = true;
            renderPagination();
        });
}

parseData = function (data) {
    let base = "http://image.tmdb.org/t/p/w342/";

    data.results.forEach(function (element) {
        let poster = "";

        // if poster path returns empty
        if (element.poster_path === null) {
            // display stock placeholder image
            poster = "./assets/stock-image/noPoster.jpg";
        } else {
            poster = base + element.poster_path;
        }

        let title = element.title;
        let release_date = element.release_date;
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

        // converts voting percentage into string
        vote_average = vote_average.toString();
        renderCard(title, release_date, poster, overview, vote_average, vote_color);
    });
}

renderPagination = function () {
    // if this is the first page render
    if (pageCount === 1) {
        // renders the pagination 
        let pages = $('<div id="pagination"><ul class="pagination pagination-content"><li><a href="#" class="page" id="prev">Prev</a></li><li><a href="#" class="page" id="1">1</a></li><li><a href="#" class="page" id="2">2</a></li><li><a href="#" class="page" id="3">3</a></li><li><a href="#" class="page" id="next">Next</a></li></ul></div>');
        pages.appendTo('.container-fluid');
    }
}

renderCard = function (title, release_date, poster, overview, vote_average, vote_color) {
    let myCol = $('<div class="col-sm-6 col-md-6 pb-4"></div>');

    let myPanel = $('<div class="card card-outline-info" id="' + i + 'Panel"><div class="card-block"> <img src="' + poster + ' "class="rounded poster"> <div class="box"><div class="single-chart"><svg viewBox="0 0 36 36" class="circular-chart ' + vote_color + '"><path class="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/><path class="circle" stroke-dasharray="' + vote_average + ', 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/><text x="18" y="20.35" class="percentage">' + vote_average + '%</text></svg><span id="title">' + title + '<br><span id="release-date">' + release_date + '</span></span></div><div id="overview"><p class="overflow">' + overview + ' </p></div></div></div></div>');

    myPanel.appendTo(myCol);
    myCol.appendTo('#contentPanel');
    i++;
}

// captures clicks on pagination buttons
$(document).on("click", ".pagination li a", function (e) {
    e.preventDefault();
    // gets id of page button clicked
    pageInput = $(this).attr('id');

    // updates page global based on which button was clicked
    if (pageInput === 'prev') {
        page = (parseInt(page) - 1);
    } else if (pageInput === 'next') {
        page = (parseInt(page) + 1);
    } else {
        page = parseInt(pageInput);
    }
    goToPage();
});

goToPage = function () {
    // empties page of previous cards
    $('.row').empty();

    // if user is paginating via genre's
    if (callApiByGenre) {
        makeApiCallGenre(genreID, decadeID);
        // if user is paginating via title
    } else if (callApiByTitle) {
        makeApiCall(movieInput);
    }
}
