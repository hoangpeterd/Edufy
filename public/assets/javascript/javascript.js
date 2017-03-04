$(document).ready(function() {

  function isClassStyle(classList) {

		arr = classList.trim().replace(/\s+/g, '').toUpperCase().split(',');
		for (let i = 0; i < arr.length; i++) {
			if (!(/^[A-Z]{3,5}\d+$/.test(arr[i]))) {
				throw new Error('Incorrect Syntax. If not provided, follow this example: MATH2001, ...etc');
			}
		}
	}
	//getting the url to send it to the back in to query the username so the DB can send back the rating information
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


  $('.grid-item').on('click', function() {
    $('#accordion').empty();

    let subject = $(this).attr('value');

    $.get('/class/' + subject).done(function(data) {
      $.each(data, function(index, value) {
        let tutorName = value.fullName;
        let classes = value.class;;
        let link = 'assets/images/' + value.user_id + ".gif" || 2;
        let stars = value.rating;
        let id = value.id;
        let starIcon = "";
        for( var i = stars; i>0; i--){
          starIcon = starIcon + '<i class="fa fa-star"></i>';
        }

        for( var i = stars+1; i<5; i++){
          starIcon = starIcon + '<i class="fa fa-star-o"></i>'
        }

        var large = `<div class='panel panel-default'><div class='panel-heading' role='tab' id='heading${id}'><h4 class='panel-title'><a role='button' data-toggle='collapse' data-parent='#accordion' href='#collapse${id}' aria-expanded='true' aria-controls='collapse${id}'><div class='row'><div class='col-xs-12' align='left'><div class='col-xs-6'><img class='img-rounded 'id='profileImage' width='55' height='55' src"#"></div><div class='col-xs-6'><div class='row'>${tutorName}</div><div class='row'>` + starIcon + `</div><div class='row'>${classes}</div></div></div></div></a></h4></div><div id='collapse${id}' class='panel-collapse collapse' role='tabpanel' aria-labelledby='heading${id}'><div class='panel-body text-left'><div id="stuCal${index}"></div></div></div></div>`

        $('#accordion').append(large)
      });

      for(var i = 0; i<data.length; i++){
        var stuFC = {
            schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
            editable: false, // enable draggable events
            aspectRatio: 1.8,
            nowIndicator: true,
            slotEventOverlap: false,
            eventOverlap: false,
            slotDuration: '00:30:00',
            minTime: '06:00:00',
            defaultTimedEventDuration: '01:00:00',
            slotLabelFormat: 'hh:mm',
            header: {
                left: 'title',
                center: '',
                right: 'today prev,next agendaWeek,month'
            },
            defaultView: 'agendaWeek',
            eventLimit: true,
            eventBorderColor: "#4CAE4C ",
            eventBackgroundColor: "rgba(76, 174, 76, .5)",
            eventClick: function (start, end, jsEvent, view){
            }
        };
        stuFC["events"] = data[i].event;

        var id = "#stuCal" + i;
        // $(id).fullCalendar(stuFC);
        $("#stuCal1").fullCalendar(stuFC);
      }
    });
  });



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
  // $('.counter').each(function() {
  //   var $this = $(this)
  //   countTo = $this.attr('data-count');
  //
  //   $({ countNum: $this.text()}).animate({countNum: countTo},
  //
  //   {
  //     duration: 1300,
  //     easing:'linear',
  //     step: function() {
  //     $this.html("<p>total earnings</p> $" + Math.floor(this.countNum));
  //     }
  //   },
  //   complete: function() {
  //     $this.html("<p>total earnings</p> $" + this.countNum);
  //   }
  //   );
  // })

  $('#lol').on('click', function() {
    jQuery.noConflict()
    $('#tutorClasses').modal()
  });

  $('.classModal').on('click', function() {
    a = $(this).attr('value')
    console.log(a)
  })

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

});
