/*********************************************************************************************/
var lastAllResults = null;
var lastAllResultsMap = new Map(); // create an empty Map
var tempDateEdit = null;
var reg_numLast = null;
/*********************************************************************************************/
var rowBtns = function(id){
	return "<center>" +
	"<button id='"+id+"' onclick='viewRecBtn(this)' class=' btn btn-circle btn-3d  btn-mn btn-primary' data-toggle='tooltip' data-placement='left' title='View Record'>  <span class='fa fa-info-circle'></span> </button>" +
	"<button id='"+id+"' onclick='editbnt(this)' class=' btn btn-circle btn-3d  btn-mn btn-info' data-toggle='tooltip' data-placement='top' title='Edit'>  <span class='fa fa-pencil-square'></span> </button>" +
	"<button id='"+id+"' onclick='deletebnt(this)' class='btn btn-circle btn-3d btn-mn btn-danger' data-toggle='tooltip' data-placement='bottom' title='Delete'>  <span class='fa fa-minus-circle'></span> </button>" +

	"</center>"};

/*********************************************************************************************/

/*********************************************************************************************/


/*********************************************************************************************/

/*********************************************************************************************/

var selectAll = $('#selectAll'); // main checkbox inside table 
var table = $('#showingTable'); // table selector 
var tdCheckbox = table.find('tbody input:checkbox'); // checboxes inside table body
var tdCheckboxChecked = []; // checked checbox arr

//Select or deselect all checkboxes on main checkbox change
selectAll.on('click', function() {
	tdCheckbox.prop('checked', this.checked);
	tdCheckboxChecked = table.find('tbody input:checkbox:checked'); //Collect all checked checkboxes from tbody tag
});
//Switch main checkbox state to checked when all checkboxes inside tbody tag is checked
tdCheckbox.on('change', function() {
alert("asaa");
	tdCheckboxChecked = table.find('tbody input:checkbox:checked'); //Collect all checked checkboxes from tbody tag
	//if length of already checked checkboxes inside tbody tag is the same as all tbody checkboxes length, then set property of main checkbox to "true", else set to "false"
	selectAll.prop('checked', (tdCheckboxChecked.length == tdCheckbox.length));

});
/*********************************************************************************************/

/*********************************************************************************************/
/*********************************************************************************************/

/*********************************************************************************************/
$("#actOnSelectedRows").click(function () {
	tdCheckboxChecked = table.find('tbody input:checkbox:checked'); //Collect all checked checkboxes from tbody tag
	
	selectAll.prop('checked', (tdCheckboxChecked.length == tdCheckbox.length));
	/*if( tdCheckboxChecked.length == 1 ){
		deletebnt(tdCheckboxChecked[0]);
	}else if ( tdCheckboxChecked.length > 1) {
			for (var i = 0; i < tdCheckboxChecked.length; i++) {
			console.log(tdCheckboxChecked[i]);
			alert(tdCheckboxChecked[i])

		}
	}*/
	alert("To be done next week")
	
	
});
/*********************************************************************************************/
/*********************************************************************************************/
$("#btnEditNextStudentData").click(function(){
	var pos = $(window).scrollTop();
	$("#orJustsaveTxt").hide();
	$("#btnEditJustSaveStudentData").hide();
	
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
		$("#btnEditNextStudentData").hide();
		$("btnEditJustSaveStudentData").hide();
		$("#btnEditPrevStudentData").show();
		$("#btnEditSaveStudentData").show();
		$("#formHeadingDetails").text("Guardians Information");
		
		

	});
});

/*********************************************************************************************/
$("#btnEditPrevStudentData").click(function() {

	$("#orJustsaveTxt").show();
	$("#btnEditJustSaveStudentData").show();
	$("#gardianDetailsSection").hide("slide", {
		direction: "left"
	}, 100, function() {


		$("#studentDetailsSection").show("slide", {
			direction: 'right'
		}, 10);
		$("#formHeadingDetails").text("Student Information");
		$("#btnEditNextStudentData").show();
		$("#btnEditPrevStudentData").hide();
		$("#btnEditSaveStudentData").hide();
		$("#btnEditJustSaveStudentData").show();

	});
});
/*********************************************************************************************/
$("#btnEditSaveStudentData , #btnEditJustSaveStudentData").click(function(argument) {
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
		showErrorMessage("Guardians  Name can't be empty", 0);
		validateError("GinputFirstname", "Guardians  Name Required");

		return;
	}
	if (GinputSurname == '') {


		$("html, body").animate({
			scrollTop: (pos / 4)
		}, "fast");
		showErrorMessage("Guardians Surname can't be empty", 0);
		validateError("GinputSurname", "Guardians Surname Required");

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

	saveEditStudentFinally();


});

/*********************************************************************************************/
function saveEditStudentFinally() {

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

	loadingScreen(true, "Updating , Please wait....");
	
	$.post("http://localhost:3500/saveStudentDataEdit", {
		reg_num: reg_numLast,
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

		if (response == 'done') {
			lastAllResultsMap.set( reg_numLast , [
						inputClassLevel ,  // at - 0
						inputClass , // at - 1
						inputFirstname , // at - 2
						inputSurname , // at - 3
						inputGender , // at - 4
						inputDob , // at - 5
						inputEmail , // at -6 
						inputPhoneNumber , // at - 7
						inputAddress , // at - 8
						GinputFirstname , // at - 9
						GinputSurname , // at - 10
						GinputID , // at - 11
						GinputAddress , // at - 12
						GinputEmail , // at - 13
						GinputPhoneNumber , // at - 14
						tempDateEdit // at - 15

					]);	
			$("html, body").animate({
			scrollTop: 3
		}, "fast");
			$("#formPanel").slideUp("fast");
			$("#newStuden_NotificationPanel").slideDown("slow");
			$("#btnEditBacktoListView").hide("fast");
		}
		
		if (response == 'error') {

		}
	});
}

/*********************************************************************************************/
function getAllStudents(){
	let tbody = $("#showList");
	showNoRecordRow(false);
	tbody.empty();
	showSpinnerRow(true);

	if (lastAllResultsMap.size == 0) {
		$.get("http://localhost:3500/getAllStudentData",{},
			function(response){
				if(response .length == 0 ){
					showSpinnerRow(false);
					showNoRecordRow(true);
					return;
				}

				response.forEach(function(item){
					lastAllResultsMap.set( item.reg_num , [
						item.inputClassLevel ,  // at - 0
						item.inputClass , // at - 1
						item.inputFirstname , // at - 2
						item.inputSurname , // at - 3
						item.inputGender , // at - 4
						item.inputDob , // at - 5
						item.inputEmail , // at -6 
						item.inputPhoneNumber , // at - 7
						item.inputAddress , // at - 8
						item.GinputFirstname , // at - 9
						item.GinputSurname , // at - 10
						item.GinputID , // at - 11
						item.GinputAddress , // at - 12
						item.GinputEmail , // at - 13
						item.GinputPhoneNumber , // at - 14
						item.date_ // at - 15

					]);					
					let tr = "<tr>" +  "<td>  <div class='checkbox checkbox-success'>"+
													" <input type='checkbox' class='styled' name='checkbox1' id='" + item.reg_num + "'  >"+
													"<label for='" + item.reg_num + "'> </label>"+
												"</div>"+
										"</td>" +
										"<td>" + item.reg_num + "</td>" +
										"<td>" + item.inputFirstname + "</td>" +
										"<td>" + item.inputSurname + "</td>" +
										"<td>" + item.inputGender + "</td>" +
										"<td>" + item.inputDob + "</td>" +
										"<td>" + item.inputClassLevel +' '+ item.inputClass +"</td>" +
										"<td>" + dateConvertor(item.date_) + "</td>" +
										"<td> " + rowBtns( item.reg_num ) + "</td>" +
										
								"</tr>";
					tbody.append(tr);
				});
				$("#showingResultsID").text("Showing "+lastAllResultsMap.size +" Record(s) found.")
				showSpinnerRow(false);
			});
	}else{
		for (const entry of lastAllResultsMap.entries() ) {

				let tr = "<tr>" +
											"<td> <div class='checkbox checkbox-success'>"+
													" <input class='styled'  type='checkbox' name='checkbox1' id='" + entry[0]  + "'  >"+
													"<label for='" + entry[0] + "'> .</label>"+
													"</div>"+
											"</td>" +
											"<td>" + entry[0] + "</td>" +
											"<td>" + entry[1][2] + "</td>" +
											"<td>" + entry[1][3] + "</td>" +
											"<td>" + entry[1][4]  + "</td>" +
											"<td>" + entry[1][5]  + "</td>" +
											"<td>" + entry[1][0]  +' '+  entry[1][1] + "</td>" +
											"<td>" + dateConvertor(entry[1][15])  + "</td>" +
											"<td> " + rowBtns( entry[0] ) + "</td>" +
											
									"</tr>";
					tbody.append(tr);
		}
		$("#showingResultsID").text("Showing "+lastAllResultsMap.size +" Record(s) found.")
		showSpinnerRow(false);
	}



}
getAllStudents();
/*********************************************************************************************/
/*********************************************************************************************/
function filterByGrade () {
	var count_grad = 0;
	let grad_ = $("#searchGradeLevel").val();
	let tbody = $("#showList");
	showNoRecordRow(false);
	tbody.empty();
	showSpinnerRow(true);
	
	if (grad_ == 'null'){		
		getAllStudents();
	}else{

		for (const entry of lastAllResultsMap.entries()) {
			if (entry[1][0] == grad_) {
				count_grad++;
				let tr = "<tr>" +
					"<td> <div class='checkbox checkbox-success'>" +
					" <input class='styled'  type='checkbox' name='checkbox1' id='" + entry[0] + "'  >" +
					"<label for='" + entry[0] + "'> .</label>" +
					"</div>" +
					"</td>" +
					"<td>" + entry[0] + "</td>" +
					"<td>" + entry[1][2] + "</td>" +
					"<td>" + entry[1][3] + "</td>" +
					"<td>" + entry[1][4] + "</td>" +
					"<td>" + entry[1][5] + "</td>" +
					"<td>" + entry[1][0] + ' ' + entry[1][1] + "</td>" +
					"<td>" + dateConvertor(entry[1][15]) + "</td>" +
					"<td> " + rowBtns(entry[0]) + "</td>" +

					"</tr>";
				tbody.append(tr);

			}
		}
		
		if (count_grad == 0) {
			
			showNoRecordRow(true);

		}

		showSpinnerRow(false);
	}
	
}
/*********************************************************************************************/
function searchData(){
	let query = $("#searchtxt").val().trim();
	let grad_ = $("#searchGradeLevel").val();
	if (query == '') {
		showWarningMessage("Nothing to search.", 6000);
		return;
	}
	showNoRecordRow(false);
	showSpinnerRow(true);
	$.post(grad_ == 'null' ? "http://localhost:3500/getStudentDataSearch" : "http://localhost:3500/getStudentDataSearchGrade", {
		query: query,
		grad_: grad_
	}, function(response) {
		let grad_ = $("#searchGradeLevel").val();
		let tbody = $("#showList");
		showSpinnerRow(false);
		tbody.empty();
		if (response.length == 0) {
			showNoRecordRow(true);
		} else {

			response.forEach(function(item) {

				let tr = "<tr>" + "<td>  <div class='checkbox checkbox-success'>" +
					" <input type='checkbox' class='styled' name='checkbox1' id='" + item.reg_num + "'  >" +
					"<label for='" + item.reg_num + "'> </label>" +
					"</div>" +
					"</td>" +
					"<td>" + item.reg_num + "</td>" +
					"<td>" + item.inputFirstname + "</td>" +
					"<td>" + item.inputSurname + "</td>" +
					"<td>" + item.inputGender + "</td>" +
					"<td>" + item.inputDob + "</td>" +
					"<td>" + item.inputClassLevel + ' ' + item.inputClass + "</td>" +
					"<td>" + dateConvertor(item.date_) + "</td>" +
					"<td> " + rowBtns(item.reg_num) + "</td>" +

					"</tr>";
				tbody.append(tr);

			});
		}
	});
}
/*********************************************************************************************/
/*********************************************************************************************/
/*********************************************************************************************/
$("#btnreserSearch").click(function () {
	
	if($("#searchtxt").val().trim() != '' || $("#searchGradeLevel").val() !='null' ){
		getAllStudents();

	}
	$("#searchtxt").val('');
	$("#searchGradeLevel").val('null');
});
/*********************************************************************************************/
function recordDeleteDismiss()  {
	$("#DeleteDectionContainer").slideUp("slow");
	loadingScreenElement("blockTableVieList" ,false,"Locked");
	diableSearchFunctions(false);
}
/*********************************************************************************************/
function recordDelete () {
	const id__  = $("#recID").text();
	
	loadingScreen(true, "Deleting , Please wait....");

	$.post("http://localhost:3500/getDeleteStudent",
		{id_:id__},function (response) {
			loadingScreen(false, "Updating , Please wait....");
			if(response == 'done'){
				showSuccessMessage("Deleted Record" , 5000);
				lastAllResultsMap.delete(id_);
				getAllStudents();
				$("#DeleteDectionContainer").slideUp("slow");
			}else{
				showErrorMessage("An Error occurred Please try again.");
			}
		});

	
}
/*********************************************************************************************/

function deletebnt(obj){
	const id__ = $(obj).attr('id');
	$("#recID").text(id__);
	$("html, body").animate({
			scrollTop: 3
		}, "fast");
	$("#DeleteDectionContainer").slideDown("fast");
	loadingScreenElement("blockTableVieList" ,true,"Locked");
	diableSearchFunctions(true);
}
/*********************************************************************************************/
function editbnt(obj){
	
	const id__ = $(obj).attr('id');
	reg_numLast = id__;
	const idEntry = lastAllResultsMap.get(id__);

	 $("#editStudentContainer").slideDown("slow");
	 $("#tableViewContainer").slideUp("fast");
	 $("#btnEditBacktoListView").show("fast");
	 $("#formPanel").slideDown("fast");
	

	$("#editStudentRegNumberView").text(id__);
	$('.mask-date').mask('00/00/0000');

	$("#inputClassLevel").val(idEntry[0]);
	$("#inputClass").val(idEntry[1]);
	$("#inputFirstname").val(idEntry[2]);
	$("#inputSurname").val(idEntry[3]);
	$("#inputGender").val(idEntry[4]);
	$("#inputDob").val(idEntry[5]);
	$("#inputEmail").val(idEntry[6]);
	$("#inputPhoneNumber").val(idEntry[7]);
	$("#inputAddress").val(idEntry[8]);
	//
	$("#GinputFirstname").val(idEntry[9]);
	$("#GinputSurname").val(idEntry[10]);
	$("#GinputID").val(idEntry[11]);
	$("#GinputAddress").val(idEntry[12]);
	$("#GinputEmail").val(idEntry[13]);
	$("#GinputPhoneNumber").val(idEntry[14]);
	tempDateEdit = idEntry[15];


		
}
/*********************************************************************************************/
function EditBacktoListView(){

	$("#editStudentContainer").slideUp("slow");
	$("#tableViewContainer").slideDown("fast");
	

	
}
/*********************************************************************************************/
function aftertEditBacktoListView(){

	$("#editStudentContainer").slideUp("slow");
	$("#tableViewContainer").slideDown("fast");

	$("#formPanel").slideUp("fast");editStudentContainer
	$("#newStuden_NotificationPanel").slideUp("slow");
	

	getAllStudents();
}
/*********************************************************************************************/
function viewRecBtn(obj){

	$("#viewRecordContainer").slideDown("slow");
	$("#tableViewContainer").slideUp("fast");
	const id__ = $(obj).attr('id');
	reg_numLast = id__;	
	const idEntry = lastAllResultsMap.get(id__);
	$("#editStudentRegNumberView").text(id__);

	//
	$("#showFullName").text(idEntry[2]+ ' '+ idEntry[3]);
	$("#ageShow").text(getAge(idEntry[5]) + ' years');
	$("#dobShow").text(idEntry[5]);
	$("#genderShow").text(idEntry[4]);
	$("#showCellNumber").text(idEntry[7]);
	$("#showAddress").text(idEntry[8]);
	$("#showEmail").text(idEntry[6]);
	$("#GshowFullName").text(idEntry[9] + ' ' + idEntry[10]);
	$("#GshowIdNumber").text(idEntry[11]);
	$("#GshowCellNumber").text(idEntry[14]);
	$("#GshowAddress").text(idEntry[12]);
	$("#GshowEmail").text(idEntry[13]);
	$("#showClass").text(idEntry[0] + ' ' +idEntry[1] );
	$("#showRegDate").text(getDateConvertion( idEntry[15]));



}
/*********************************************************************************************/
$("#btnViewInFoBacktoListView").click(function () {
	$("#viewRecordContainer").slideUp("fast");
	$("#tableViewContainer").slideDown("fast");

});
/*********************************************************************************************/
/*********************************************************************************************/
/*********************************************************************************************/
/*********************************************************************************************/
function diableSearchFunctions (is) {
	if(is){
		$('#searchdiv :input , #btnreserSearch').attr('disabled', true).addClass("disabledDiv");
	}else{
		 $('#searchdiv :input , #btnreserSearch').removeAttr('disabled').removeClass("disabledDiv");
	}
}

/*********************************************************************************************/

/*********************************************************************************************/
function getAge(dateString) {
    let  today = new Date();
    let  birthDate = new Date(dateString);
    let  age = today.getFullYear() - birthDate.getFullYear();
    let  m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
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
function showSpinnerRow(toShow) {
	if (toShow) {

		$("#loadingRoweFetch").show();
	} else {
		$("#loadingRoweFetch").hide();
	}
}

/*********************************************************************************************/
function showNoRecordRow(toShow) {
	if (toShow) {
		$("#noRecordFoundRow").show();
	} else {
		$("#noRecordFoundRow").hide();
	}
}
/*********************************************************************************************/



/*$("#inof").click(function() {

	for (var i = 0; i < tdCheckboxChecked.length; i++) {
		console.log(tdCheckboxChecked[i]);

	}


});*/