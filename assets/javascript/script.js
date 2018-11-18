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