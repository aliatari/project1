$("#notification").on("click", function(){
  
  //console.log("test"); 
  $(".movie-notify").toggle("hide");
  
})

$("#about").on("click", function(){

  $("#about-container").removeClass("about-hidden");

  $(".pic-container").css("visibility", 'hidden');
})

