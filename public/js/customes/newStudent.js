/*********************************************************************************************/
var isBeenPrev = false;
/*********************************************************************************************/


/*********************************************************************************************/


/*********************************************************************************************/

/*********************************************************************************************/


/*********************************************************************************************/

/*********************************************************************************************/


/*********************************************************************************************/

/*********************************************************************************************/


/*********************************************************************************************/
$('.mask-date').mask('00/00/0000');


/*********************************************************************************************/
$("#btnNextStudentData").click(function() {
	var pos = $(window).scrollTop();
	let inputClassLevel = $("#inputClassLevel").val().trim();
	let inputClass = $("#inputClass").val().trim();
	let inputFirstname = $("#inputFirstname").val().trim();
	let inputSurname = $("#inputSurname").val().trim();
	let inputGender = $("#inputGender").val();
	let inputDob = $("#inputDob").val().trim();
	let inputEmail = $("#inputEmail").val().trim();
	let inputPhoneNumber = $("#inputPhoneNumber").val().trim();
	let inputAddress = $("#inputAddress").val().trim();

	if (inputClassLevel == '') {

		$("html, body").animate({
			scrollTop: 3
		}, "fast");
		showErrorMessage("Select or set Class Level", 0);
		validateError("inputClassLevel", "Student  Grade");

		return;
	}
	if (inputClassLevel !='') {
		hideValidateError("inputClassLevel");
	}
	if (inputClass == '') {

		$("html, body").animate({
			scrollTop: 3
		}, "fast");
		showErrorMessage("Set Class Name", 0);
		validateError("inputClass", "Assign the student a Class");

		return;
	}
	if (inputClass !='') {
		hideValidateError("inputClass");
	}
	if (inputFirstname == '') {

		$("html, body").animate({
			scrollTop: 3
		}, "fast");
		showErrorMessage("Student Name can't be empty", 0);
		validateError("inputFirstname", "Set Class Name");

		return;
	}

	if (inputFirstname !='') {
		hideValidateError("inputFirstname");
	}

	if (inputSurname == '') {

		$("html, body").animate({
			scrollTop: 3
		}, "fast");
		showErrorMessage("Student  Surname can't be empty", 0);
		validateError("inputSurname", "Student  Surname can't be empty");

		return;
	}

	if (inputSurname !='') {
		hideValidateError("inputSurname");
	}

	if (inputGender == 'null') {

		$("html, body").animate({
			scrollTop: 20
		}, "fast");
		showErrorMessage("Choose Gender.", 0);
		validateError("inputGender", "Choose Gender.");

		return;
	}

	if (inputGender !='') {
		hideValidateError("inputGender");
	}

	if (inputDob == '') {

		$("html, body").animate({
			scrollTop: 31
		}, "fast");
		showErrorMessage("Set Date Of Birth.", 0);
		validateError("inputDob", "Set Date Of Birth.");

		return;
	}

	if (inputDob !='') {
		hideValidateError("inputDob");
	}


	if (inputEmail == '') {

		showErrorMessage("Set Email.", 0);
		/*$("#divinputEmail").addClass("form-animate-error");
		$("<label style='margin-top:60px;color:black;'> Set Email.If none set to NONE.</label>").appendTo($("#divinputEmail"));*/
		validateError("inputEmail", "Set Email.If none set to NONE.");

		return;
	}
	if (inputEmail !='') {
			hideValidateError("inputEmail");
		}
	if (inputPhoneNumber == '') {


		showErrorMessage("Set cell Number.", 0);
		validateError("inputPhoneNumber", "Set cell Number.If none set to NONE");

		return;
	}

	if (inputPhoneNumber !='') {
			hideValidateError("inputPhoneNumber");
		}

	if (inputAddress == '') {

		$('div#content').animate({
			scrollTop: 40
		}, 'fast');
		showErrorMessage("Set address.", 0);
		validateError("inputAddress", "Set Physical address.");

		return;
	}

	if (inputAddress !='') {
			hideValidateError("inputAddress");
		}
		

	$("#studentDetailsSection").hide("slide", {
		direction: "left"
	}, 100, function() {


		$("#gardianDetailsSection").show("slide", {
			direction: 'right'
		}, 10);
		$("#btnNextStudentData").hide();
		$("#btnPrevStudentData").show();
		$("#btnSaveStudentData").show();
		$("#formHeadingDetails").text("Gardians Information");
		
		if(!isBeenPrev){
			isBeenPrev = true;
			showGeneralMessage("Now fiil in the Gardians Information", 8000);

		}

	});

});
/*********************************************************************************************/
//laodingScreen(true,"");
/*********************************************************************************************/

$("#btnPrevStudentData").click(function() {

	$("#gardianDetailsSection").hide("slide", {
		direction: "left"
	}, 100, function() {


		$("#studentDetailsSection").show("slide", {
			direction: 'right'
		}, 10);
		$("#formHeadingDetails").text("Student Information");
		$("#btnNextStudentData").show();
		$("#btnPrevStudentData").hide();
		$("#btnSaveStudentData").hide();

	});


});
/*********************************************************************************************/
$("#btnSaveStudentData").click(function(argument) {
	var pos = $(window).scrollTop();

	let GinputFirstname = $("#GinputFirstname").val().trim();
	let GinputSurname = $("#GinputSurname").val().trim();
	let GinputID = $("#GinputID").val().trim();
	let GinputAddress = $("#GinputAddress").val().trim();
	let GinputEmail = $("#GinputEmail").val().trim();
	let GinputPhoneNumber = $("#GinputPhoneNumber").val().trim();

	if (GinputFirstname == '') {

		$("html, body").animate({
			scrollTop: (pos / 4)
		}, "fast");
		showErrorMessage("Guardian  Name can't be empty", 0);
		validateError("GinputFirstname", "Guardian  Name Required");

		return;
	}
	if (GinputSurname == '') {


		$("html, body").animate({
			scrollTop: (pos / 4)
		}, "fast");
		showErrorMessage("Guardian Surname can't be empty", 0);
		validateError("GinputSurname", "Guardian Surname Required");

		return;
	}
	if (GinputID == '') {

		$("html, body").animate({
			scrollTop: (pos / 4)
		}, "fast");
		showErrorMessage("Guardian  Surname can't be empty", 0);
		validateError("GinputID", "ID Required");

		return;
	}
	if (GinputAddress == '') {

		$('div#content').animate({
			scrollTop: 0
		}, 'fast');
		showErrorMessage("Address  can't be empty", 0);
		validateError("GinputAddress", "Physical Address Required");

		return;
	}
	if (GinputEmail == '') {

		$('div#content').animate({
			scrollTop: 0
		}, 'fast');
		showErrorMessage("Email can't be empty", 0);
		validateError("GinputEmail", "Email Required .If none set to NONE");

		return;
	}

	if (GinputPhoneNumber == '') {

		$('div#content').animate({
			scrollTop: 0
		}, 'fast');
		showErrorMessage("Student  Surname can't be empty", 0);
		validateError("GinputPhoneNumber", "Phone Number Required");

		return;
	}

	saveNewStudentFinally();


});
/*********************************************************************************************/
$("#getBackToAddStudent").click(function() {
	$('#addNewStudentForm')[0].reset();
	$("#formPanel").slideDown("fast");
	$("#newStuden_NotificationPanel").slideUp("fast");

	$("#gardianDetailsSection").hide("slide", {
		direction: "left"
	}, 100, function() {


		$("#studentDetailsSection").show("slide", {
			direction: 'right'
		}, 10);
		$("#formHeadingDetails").text("Student Information");
		$("#btnNextStudentData").show();
		$("#btnPrevStudentData").hide();
		$("#btnSaveStudentData").hide();

	});
});

/*********************************************************************************************/


/*********************************************************************************************/

  function uniqueId () {
  return  (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase();
};
/*********************************************************************************************/

function saveNewStudentFinally() {
	let inputClassLevel = $("#inputClassLevel").val().trim();
	let inputClass = $("#inputClass").val().trim();
	let inputFirstname = $("#inputFirstname").val().trim();
	let inputSurname = $("#inputSurname").val().trim();
	let inputGender = $("#inputGender").val();
	let inputDob = $("#inputDob").val().trim();
	let inputEmail = $("#inputEmail").val().trim();
	let inputPhoneNumber = $("#inputPhoneNumber").val().trim();
	let inputAddress = $("#inputAddress").val().trim();
	//
	let GinputFirstname = $("#GinputFirstname").val().trim();
	let GinputSurname = $("#GinputSurname").val().trim();
	let GinputID = $("#GinputID").val().trim();
	let GinputAddress = $("#GinputAddress").val().trim();
	let GinputEmail = $("#GinputEmail").val().trim();
	let GinputPhoneNumber = $("#GinputPhoneNumber").val().trim();

	loadingScreen(true, "Saving , Please wait....");
	let reg_num = uniqueId();
	$.post("http://localhost:3500/savingNewstudentData", {
		reg_num: reg_num,
		inputClassLevel: inputClassLevel,
		inputClass: inputClass,
		inputFirstname: inputFirstname,
		inputSurname: inputSurname,
		inputGender: inputGender,
		inputDob: inputDob,
		inputEmail: inputEmail,
		inputPhoneNumber: inputPhoneNumber,
		inputAddress: inputAddress,
		GinputFirstname: GinputFirstname,
		GinputSurname: GinputSurname,
		GinputID: GinputID,
		GinputAddress: GinputAddress,
		GinputEmail: GinputEmail,
		GinputPhoneNumber: GinputPhoneNumber

	}, function(response) {
		loadingScreen(false, "");
		console.log(response);

		if (response == 'done') {
			$("#formPanel").slideUp("fast");
			$("#newStuden_NotificationPanel").slideDown("slow");
		}
		if (response == 'exists') {

		}
		if (response == 'error') {

		}
	});
}
/*********************************************************************************************/
function validateError(elementID, message) {
	var parentDiv = $($("#" + elementID)).parent('div');
	parentDiv.addClass("form-animate-error");
	$("<label id='label"+elementID+"' style='margin-top:60px;color:black;'> " + message + " </label>").appendTo(parentDiv);
}


/*********************************************************************************************/
function hideValidateError(elementID) {
	var parentDiv = $($("#" + elementID)).parent('div');
	parentDiv.removeClass("form-animate-error");
	$("#label"+elementID).remove();   
	//$("<label style='margin-top:0px;color:black;'>  </label>").appendTo(parentDiv);
}
/*********************************************************************************************/


/*********************************************************************************************/

/*********************************************************************************************/



/*********************************************************************************************/

/*********************************************************************************************/


/*********************************************************************************************/


/*********************************************************************************************/

/*********************************************************************************************/


/*********************************************************************************************/


/*********************************************************************************************/

/*********************************************************************************************/


/*********************************************************************************************/


/*********************************************************************************************/

/*********************************************************************************************/


/*********************************************************************************************/


/*********************************************************************************************/

/*********************************************************************************************/


/*********************************************************************************************/

/*********************************************************************************************/