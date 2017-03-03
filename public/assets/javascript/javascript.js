$(document).ready(function() {
	//getting the url to send it to the back in to query the username so the DB can send back the rating information
<<<<<<< HEAD
  $.get("/findRating").done(function(result){
      //when a page is loaded. wait for a tutor page to load up and run the rating search to create a start rating for the tutor
    var rating = result.rating/result.sessions;
      
        $("#tutorRating").rateYo({
          rating: rating,
          readOnly: true,
          multiColor: {
            "startColor": "#000000", //black
            "endColor"  : "#5cb85c"  //successgreen
          }
        });
  });
=======
  function findRating (userName, cb){
    $.post("/findRating", {userName: userName}).done(function(result){
      var rating = result.rating/result.sessions;
      
      cb(rating);
    });
  }
  
  function isClassStyle(classList) {

		arr = classList.trim().replace(/\s+/g, '').toUpperCase().split(',');
		for (let i = 0; i < arr.length; i++) {
			if (!(/^[A-Z]{3,5}\d+$/.test(arr[i]))) {
        return false
				//throw new Error('Incorrect Syntax. If not provided, follow this example: MATH2001, ...etc');
			}
		}
    return true;
	}
>>>>>>> b59c56731bc6f2c0752b81d5548cb187a6adcc1c
  
  $('.grid-item').on('click', function() {

    // $('#accordion').empty()
    let subject = $(this).attr('value') 
    $.get('/class/' + subject).done(function(data) {
      console.log(data)
      $.each(data, function(index, value) {

        let tutorName = "Becky" || "Becky"
        let classes = "MATH1202, DAVE3202, SHAN2342" || 2
        let link = 'assets/images/' + subject + ".gif" || 2
        let rating = 3 || 3
        let id = 'One'


        var large = `<div class='panel panel-default'><div class='panel-heading' role='tab' id='heading${id}'><h4 class='panel-title'><a role='button' data-toggle='collapse' data-parent='#accordion' href='#collapse${id}' aria-expanded='true' aria-controls='collapse${id}'><div class='row'><div class='col-xs-12' align='left'><div class='col-xs-6'><img class='img-rounded 'id='profileImage' width='55' height='55' src=${link}></div><div class='col-xs-6'><div class='row'>${tutorName}</div><div class='row'>${rating}</div><div class='row'>${classes}</div></div></div></div></a></h4></div><div id='collapse${id}' class='panel-collapse collapse' role='tabpanel' aria-labelledby='heading${id}'><div class='panel-body text-left'>Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.</div></div></div>`

        $('#accordion').append(large)
      })





    })
  })


  //when clicked on the signin button a modal will show up
  $("#modalSignIn").on("click",function() {
    $("#signInModal").modal();
  });
	//when clicked on the signup button a modal will show up
  $("#modalSignUp").on("click", function() {
    $("#signUpModal").modal();
  });

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

  // colors when subject is being selected by tutors
  $('.subject').on("click",function(){
    $(this).toggleClass('btn-default select');
  });

// tutor list with subject selected
  $(".grid-item").on("click", function(){
      jQuery.noConflict();
      $("#tutorList").modal();
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

  $('#lol').on('click', function() {
    jQuery.noConflict()
    $('#tutorClasses').modal()
  });
  
  var a = null;
  
  $('.classModal').on('click', function() {
    a = $(this).attr('value')
  })
<<<<<<< HEAD

=======
  
  $('#tutorClassesSubmit').on('click', function() {
    
    if (!a) {return}
    console.log($('#specificClass').val())
    if (!isClassStyle($('#specificClass').val())) {
      return
    } else {
      $.post('/class/' + a, {classList: $('#specificClass').val()}, function(data, status) {
        console.log(data, status)
      })
    }
  })
      
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
>>>>>>> b59c56731bc6f2c0752b81d5548cb187a6adcc1c
});
