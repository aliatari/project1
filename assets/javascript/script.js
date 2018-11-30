// Shorthand for $( document ).ready()

renderBackground = function() {
// $(function () {
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
// });
}

renderBackground();


/* -------------------------------------------------API's Etc------------------------------------------------- */


// globals used as param in query urls
let page = 1;
let pagePrev = page - 1;
let pageNext = page + 1;
let movieInput = "";
let genreID = "";
let decadeID = "";
let i = 0;
let yearStart = "";
let yearEnd = "";
let callApiByTitle = false;
let callApiByGenre = false;
// refelcts number of page loads for API calls
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
    // $('#footer').css('display', 'none');
}


makeApiCall = function (movieInput) {
    // empties any previous cards
    $('.row').empty();
    // iterate page count
    // prevents double-render of pagination div
    pageCount+=1;
    
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
    // empties any previous cards
    $('.row').empty();
    // iterate pageCount. prevents double-render of pagination div
    pageCount+=1;
    
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
        }else {
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
        }else if (vote_average <= 80) {
            vote_color = "green";
        }else if (vote_average >= 80) {
            vote_color = "blue";
        }

        // converts voting percentage into string
        vote_average = vote_average.toString();
        renderCard(title, release_date, poster, overview, vote_average, vote_color);
    });
}


renderCard = function (title, release_date, poster, overview, vote_average, vote_color) {
    let myCol = $('<div class="col-sm-6 col-md-6 pb-4"></div>');

    let myPanel = $('<div class="card card-outline-info" id="' + i + 'Panel"><div class="card-block"> <img src="' + poster + ' "class="rounded poster"> <div class="box"><div class="single-chart"><svg viewBox="0 0 36 36" class="circular-chart ' + vote_color + '"><path class="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/><path class="circle" stroke-dasharray="' + vote_average + ', 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/><text x="18" y="20.35" class="percentage">' + vote_average + '%</text></svg><span id="title">' + title + '<br><span id="release-date">' + release_date + '</span></span></div><div id="overview"><p class="overflow">' + overview + ' </p></div></div></div></div>');

    myPanel.appendTo(myCol);
    myCol.appendTo('#contentPanel');
    i++;
}


renderPagination = function() {
    // if this is the first page render
    if (pageCount === 1) {
        // renders the pagination 
        let pages = $('<div id="pagination"><ul class="pagination pagination-content"><li><a href="#" class="page" id="prev">Prev</a></li><li><a href="#" class="page" id="1">1</a></li><li><a href="#" class="page" id="2">2</a></li><li><a href="#" class="page" id="3">3</a></li><li><a href="#" class="page" id="next">Next</a></li></ul></div>');
        pages.appendTo('.container-fluid');

        renderFooter();
    }

    // /* new Thursday */
    else if (pageCount > 1) {
        // removes previous pagination div
        $('.pagination').remove();

        // renders the pagination with page variables
        let pages = $('<div id="pagination"><ul class="pagination pagination-content"><li><a href="#" class="page" id="prev">Prev</a></li><li><a href="#" class="page" id="'+ pagePrev +'">' + pagePrev + '</a></li><li><a href="#" class="page" id="' + page + '">' + page + '</a></li><li><a href="#" class="page" id="' + pageNext + '">' + pageNext + '</a></li><li><a href="#" class="page" id="next">Next</a></li></ul></div>');
        pages.appendTo('.container-fluid');

        renderFooter();
    }
}

renderFooter = function() {
    $('.footer').css('display', 'block');
}


// captures clicks on pagination buttons
$(document).on("click",".pagination li a", function(e){
    e.preventDefault();

    // gets id of page button clicked
    pageInput = $(this).attr('id');
    
    // updates page global based on which button was clicked
    if (pageInput === 'prev') {
        page = (parseInt(page) - 1);
    }else if (pageInput === 'next') {
        page = (parseInt(page) + 1);
    }else {
        page = parseInt(pageInput);
    }

    // updates globals
    pagePrev = page - 1;
    pageNext = page + 1;

    goToPage();
});


goToPage = function() {
    // empties page of previous cards
    $('.row').empty();
    
    // if user is paginating via genre's
    if (callApiByGenre) {
        makeApiCallGenre(genreID, decadeID);
        // scrolls to top of window
        window.scrollTo(0, 0);
    // if user is paginating via title
    }else if(callApiByTitle) {
        makeApiCall(movieInput);
        // scrolls to top of window
        window.scrollTo(0, 0);
    }
}



/* New Wednesday */

// home button clicked
$('#home').click(function() {
    $('#about-container').css('display', 'none').empty();
    $('.row').empty();
    // removes previous pagination div
    $('.pagination').remove();
    renderBackground();
    $(".pic-container").css("visibility", 'visible');
    // reset pageCount
    pageCount = 0;
});

// notiification clicked
$("#notification").on("click", function(){
    $(".movie-notify").toggle("hide");
});

// about-us clicked
$("#about").on("click", function(){
  $("#about-container").removeClass("about-hidden");
  $(".pic-container").css("visibility", 'hidden');
});




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