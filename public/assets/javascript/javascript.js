//checking if this is an email or not
function validateForm(email) {
    var x = email;
    var atPos = x.indexOf("@");
    var dotPos = x.lastIndexOf(".");

    if (atPos<1 || dotPos<atPos+2 || dotPos+2>=x.length || !x.endsWith("edu")) {
      console.log("Not a valid e-mail address");
    } else {
			console.log("True");
		}
}
