$(document).ready(function() {
	//getting the url to send it to the back in to query the username so the DB can send back the rating information
function findRating (userName, cb){
  $.post("/findRating", {userName: userName}).done(function(result){
    var rating = result.rating/result.sessions;

    cb(rating);
  });
}
  
//  $('.grid-item').on('click', function() {
//    
//    console.log($(this).attr('value'))
//    $.get('/class/' + $(this).attr('value')).done(function(data) {
//      console.log(data)
//    })
//  }) 
  	

  //when clicked on the signin button a modal will show up
  $("#modalSignIn").on("click",function() {
    $("#signInModal").modal();
  });
	//when clicked on the signup button a modal will show up
  $("#modalSignUp").on("click", function() {
    $("#signUpModal").modal();
  });

//  //start the signin path by checking the inputs first
//  $("#submitSignIn").on("click", function() {
//    signingIn();
//  });



  //button to start the create new user path of students
//  $("#createBtn").on("click", function() {
//    creatingStudent();
//  });

  //button to starte the create new user path of tutors
//  $("#tutorClassesSubmit").on("click",function(){
//    creatingTutor();
//  });

  // makes sure only one choice can be chosen with checkbox
  $(".chb").change(function() {
    $(".chb").prop('checked', false);
    $(this).prop('checked', true);
  });

  // isotope
  $('.grid').isotope({
  // options
  itemSelector: '.grid-item',
  layoutMode: 'fitRows'
  });

//User profile image upload
  $('#imageUpload').change(function() {
		setTimeout(function() {
			if ($('#imageUpload').val()) {$('#uploadImage').submit()}
		}, 1000)
  });

  //toggle colors when subject is being selected by tutors
  $('.subject').on("click",function(){
    $(this).toggleClass('btn-default select');
  });

  // countdown timer
  $('.counter').each(function() {
  var $this = $(this),
      countTo = $this.attr('data-count');

  $({ countNum: $this.text()}).animate({
    countNum: countTo
  },

  {

    duration: 1300,
    easing:'linear',
    step: function() {
      $this.html("<p>total earnings</p> $" + Math.floor(this.countNum));
    },
    complete: function() {
      $this.html("<p>total earnings</p> $" + this.countNum);
    }

  });



});

  //when a page is loaded. wait for a tutor page to load up and run the rating search to create a start rating for the tutor
  if ($("body").is("#tutorBody")) {
    findRating($(".lead").text().trim(), function(data){
      $(function () {
        $("#tutorRating").rateYo({
          rating: data,
          readOnly: true,
          multiColor: {
            "startColor": "#000000", //black
            "endColor"  : "#5cb85c"  //successgreen
          }
        });
      });
    });
  }
});

