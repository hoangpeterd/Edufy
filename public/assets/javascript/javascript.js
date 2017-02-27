//checking if this is an email or not
function validateEmail(email) {
    var x = email;
    var atPos = x.indexOf("@");
    var dotPos = x.lastIndexOf(".");

    if (atPos<1 || dotPos<atPos+2 || dotPos+2>=x.length || !x.endsWith(".edu")) {
      console.log("Not a valid e-mail address"); //setting up a warning
    } else {
			return true;
		}
}

//checking if the password is longer then 6 character
function validatePassword(password){
  if(password.length<=6){
    console.log("Password to short");
  } else {
    return true;
  }
}

//this function will send the tutor inforamtion to the backend where we update it on the database
function creatingTutor(){
  var email = "";
  var password = "";
  var position = "";
  var fName = "";
  var lName = "";
  var specificClasses = "";

  if(validateEmail($("#createUser").val())){
    email = $("#createUser").val();
  }

  if(validatePassword($("#createPassword").val())){
    password = $("#createPassword").val();
  }

  fName = $("#firstName").val();
  lName = $("#lastName").val();
  specificClasses = $("#specificClass").val();

  var createObject = {
    tutorUserName: email,
    pass: password,
    lastName: lName,
    firstName: fName,
    specificClasses: specificClasses
  };

  //we are going to create an array to check if the user has choosen any classes. It is required to select classes to offer to teach in
  var subjectList = [];

  $(".select").each(function(){
    subjectList.push($(this).val());
  });

  if(subjectList.length === 0 ){
    console.log("Need to select a class");
  } else {
    $(".select").each(function(){
      createObject[$(this).val()] = true;
    });
  }


  if(specificClasses !== "" && subjectList.length !== 0){

    console.log(createObject);
    $.post("/signupTutor", createObject).done(function(result) {
      if(result.redirect){
        window.location = result.redirect;
      }
    });
  }
}

//collecting the information and checking them before pushing it to a database
function creatingStudent (){
  var email = "";
  var password = "";
  var position = "";
  var fName = "";
  var lName = "";

  if(validateEmail($("#createUser").val())){
    email = $("#createUser").val();
  }

  if(validatePassword($("#createPassword").val())){
    password = $("#createPassword").val();
  }

  fName = $("#firstName").val();
  lName = $("#lastName").val();

  //this will check for all the information that is required to create an account. if it is a tutor a second modal will pop up for further quetioning other then that it will push the student iformation to the backend so it can create new inofrmation in the database
  if(email !== "" && password!== "" && fName !== "" && lName !== ""){
    if($(".chb:checked").val() === "tutor") {
      $("#tutorClasses").modal();

    } else if ($(".chb:checked").val() === "student") {
      var createObject = {
        studentUserName: email,
        pass: password,
        lastName: lName,
        firstName: fName
      };

      $.post("/signupStudent", createObject).done(function(result) {
        if(result.redirect){
          window.location = result.redirect;
        }
      });
    }
  }
}

//simple signing up function that will send the input values to the back end so we can check if there are any user by that name and the matching password. It will wait to see where it will be redirected
function signingIn (){
  var userName = $("#userName").val().toLowerCase();
  var password = $("#password").val();
  var info = {
    userName: userName,
    password: password
  };

  $.post("/signing", info).done(function(result) {
    if(result.redirect){
      window.location = result.redirect;
    }
  });
}

$('.subject').on("click",function(){
  $(this).toggleClass('btn-default select');
});

$("document").ready(function(){
  //when clicked on the signin button a modal will show up
  $("#modalSignIn").on("click",function() {
    $("#signInModal").modal();
  });

  //start the signin path by checking the inputs first
  $("#submitSignIn").on("click", function() {
    signingIn();
  });

  //when clicked on the signup button a modal will show up
  $("#modalSignUp").on("click", function() {
    $("#signUpModal").modal();
  });

  //button to start the create new user path of students
  $("#createBtn").on("click", function() {
    creatingStudent();
  });

  //button to starte the create new user path of tutors
  $("#tutorClassesSubmit").on("click",function(){
    creatingTutor();
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
    if ($('#imageUpload').val()) {$('#uploadImage').submit()}
  });
});
