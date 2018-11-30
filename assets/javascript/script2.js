$("#notification").on("click", function(){
  
  //console.log("test"); 
  $(".movie-notify").toggle("hide");
  
})

$("#about").on("click", function(){

  $("#about-container").removeClass("about-hidden");

  $(".pic-container").css("visibility", 'hidden'); 

  $(".movie-notify").toggle("hide");
  $(".hide").css("display", 'none');
})




  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBvEDRjMvvZ39keCybb9VWvlKNKdAD9NQg",
    authDomain: "movie-of-all-time-web.firebaseapp.com",
    databaseURL: "https://movie-of-all-time-web.firebaseio.com",
    projectId: "movie-of-all-time-web",
    storageBucket: "movie-of-all-time-web.appspot.com",
    messagingSenderId: "338668317924"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  // 2. Button for adding Employees
$("#email-submit").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var emailAddress = $("#email-input").val().trim();
  
  // Creates local "temporary" object for holding employee data
  var newEmail = {
    email: emailAddress
  };

  // Uploads employee data to the database
  database.ref().push(newEmail);

  //console.log(newEmail.email);

  $("#email-input").val("");

});










