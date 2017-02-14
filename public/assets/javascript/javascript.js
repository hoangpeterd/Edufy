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

function validatePassword(password){
  if(password.length<6){
    console.log("Password to short");
  } else {
    return true;
  }
}

function creatingUser (){
  var email = "";
  var password = "";
  var position = "";

  if(validateEmail($("#createUser").val())){
    email = $("#createUser").val();
  }

  if(validatePassword($("#createPassword").val())){
    password = $("#createPassword").val();
  }

  position = $("#creatPosition").val();

  if(email !== "" && password!== "" && position !== ""){
    var createObject = {
      email: email,
      password: password,
      position: position
    }

    $.post("/signup", createObject).done(function(result) {

    });
  }


}

function signingIn (info){
  $.post("/signing", info).done(function(result) {

  });
}

$("document").ready(function(){
  $("#submit").on("click",function() {
    var userName = $("#userName").val().toLowerCase();
    var password = $("#password").val();
    var info = {
      userName: userName,
      password: password
    };

    signingIn(info);
  });

  $("#createBtn").on("click", function(){
    creatingUser();
  });
});
