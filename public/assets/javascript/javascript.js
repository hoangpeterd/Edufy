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

//collecting the information and checking them before pushing it to a database
function creatingUser (){
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

  if(email !== "" && password!== "" && fName !== "" && lName !== ""){
    if($(".chb:checked").val() === "tutor") {
      var createObject = {
        tutorUserName: email,
        pass: password,
        lastName: lName,
        firstName: fName
      };

      $.post("/signupTutor", createObject).done(function(result) {});
    } else if ($(".chb:checked").val() === "student") {
      var createObject = {
        studentUserName: email,
        pass: password,
        lastName: lName,
        firstName: fName
      };

      $.post("/signupStudent", createObject).done(function(result) {});
    }
  }

}

function signingIn (){
  var userName = $("#userName").val().toLowerCase();
  var password = $("#password").val();
  var info = {
    userName: userName,
    password: password
  };

  $.post("/signing", info).done(function(result) {});
}

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

  //button to start the create new user path
  $("#createBtn").on("click", function() {
    creatingUser();
  });

  // makes sure only one choice can be chosen with checkbox
  $(".chb").change(function() {
    $(".chb").prop('checked', false);
    $(this).prop('checked', true);
  });

});
