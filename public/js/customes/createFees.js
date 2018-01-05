 $(document).ready(function() {
 	$('.bestupper').bestupper();
 });


/*********************************************************************************************/


/*********************************************************************************************/

/*********************************************************************************************/
function checkBank () {

	let payment_methodFee = $("#payment_methodFee").val();
	
	if( payment_methodFee != 'TransFeer' ){

		$("#feeBankName").attr('disabled' , true).val('NA');		

	}else{
		$("#feeBankName").attr('disabled' , false).val('');		
	}
}

/*********************************************************************************************/
$("#btnSaveFee").click(function () {
	let feeName = $("#feeName").val().trim();
	let FeeAmount = $("#FeeAmount").val().trim();
	FeeAmount = FeeAmount.replaceAll2('$', '');
	let student_payingFee = $("#student_payingFee").val();
	let studentFeeTypelist= $("#studentFeeTypelist").val();
	let payment_methodFee = $("#payment_methodFee").val();
	let feeBankName= $("#feeBankName").val().trim();
	let remarkFee= $("#remarkFee").val().trim();



	if(feeName == ''){
		showWarningMessage("Fees Name can not be empty." , 4000);
		return;
	}
	if(FeeAmount == ''){
		showWarningMessage("Fees Amount can not be empty." , 4000);
		return;
	}
	if(validateNumbersCurrency(FeeAmount) == null){
		showWarningMessage("Put  Valid Numbers." , 4000);
		return;
	}
	if(student_payingFee == 'null'){
		showWarningMessage("Select Paying students." , 4000);
		return;
	}
	if(studentFeeTypelist == 'null'){
		showWarningMessage("Select Fee Type." , 4000);
		return;
	}
	if(payment_methodFee == 'null'){
		showWarningMessage("Select payment method." , 4000);
		return;
	}
	if(feeBankName == ''){
		showWarningMessage("Bank Name can not be empty." , 4000);
		return;
	}
	if(remarkFee == ''){
		showWarningMessage("Put Comment of description." , 4000);
		return;
	}
	
	saveNewFee(feeName ,FeeAmount   , student_payingFee    ,  studentFeeTypelist,  payment_methodFee   , feeBankName  , remarkFee  );
});
/*********************************************************************************************/
$("#btnCancelFee").click(function () {
	$("#divsaveFee").slideUp("slow");
	$("#divCancelFee").slideUp("slow");
	$("#diFeevDetails").slideUp("slow");
	$("#diFeeDetails2").slideUp("slow");
});
/*********************************************************************************************/
$("#addFee").click(function () {
	$("#divsaveFee").slideDown("slow");
	$("#divCancelFee").slideDown("slow");
	$("#diFeevDetails").slideDown("slow");
	$("#diFeeDetails2").slideDown("slow");
});
/*********************************************************************************************/

$("#btnCancelType").click(function () {
	$("#typeFee").val('');
	$("#descriptionType").val('');

	$("#divsaveType").slideUp('fast');
	$("#divDetails").slideUp('fast');
	$("#btnSaveType").slideUp('fast');
	$("#divCancelType").slideUp('fast');
});
/*********************************************************************************************/
$("#btnSaveType").click(function () {
	let tbody = $("#showItemFeesTypes");
	
	let typeFee = $("#typeFee").val().trim();
	let descriptionType = $("#descriptionType").val().trim();

	if(typeFee == ''){
		showWarningMessage("Please put name or type" ,3000);
		return;
	}
	if(descriptionType == ''){
		showWarningMessage("Please put description" ,3000);
		return;
	}

	$("#StatusshowItemFeesTypesLoadingGif").slideDown("fast");
	$.post("http://localhost:3500/saveFeeType",{
		feee:typeFee+'' ,
		descriptionType:descriptionType
	},function (response) {
		$("#StatusshowItemFeesTypesLoadingGif").slideUp("fast");

		if (response == 'done') {
			showSuccessMessage("Saved", 5000);
			$("#typeFee").val('');
			$("#descriptionType").val('');

			$("#divsaveType").slideUp("fast");
			$("#divDetails").slideUp("fast");
			$("#btnSaveType").slideUp("fast");
			$("#divCancelType").slideUp("fast");
			$("#StatusshowItemFeesTypes").hide("fast");			
			let tr = "<tr> <td> <input type='checkbox' /> </td> "+
				" <td>" + typeFee  + "</td> "+
				"<td> "+ descriptionType +" </td> </tr>";
			$(tr).appendTo(tbody);
			// this will reload data in the other tab
			 getFeeTypesInAddingFee ();

		} else {
			$("#StatusshowItemFeesTypes").slideDown("fast");
			showWarningMessage("Failed to save . Please try again", 3000);
		}
	});
});
/*********************************************************************************************/
$("#addShowNewType").click(function () {
	
	$("#divsaveType").slideDown("slow");
	$("#divDetails").slideDown("slow");
	$("#btnSaveType").slideDown("slow");	
	$("#divCancelType").slideDown("slow");
	
});

/*********************************************************************************************/

/*********************************************************************************************/
/*********************************************************************************************/

function getAllFees () {
	let tbody = $("#showItemFees");
	tbody.empty();
	$("#StatusshowItemFees").hide();
	$("#loadingRowFees").slideDown();

	$.get("http://localhost:3500/getFees",{}
		,function (response) {
		if(response.length == 0){
			showWarningMessage("Fee lists .Nothing to show" , 3000);
			$("#loadingRowFees").slideUp();
			$("#StatusshowItemFees").show();
		}else{
			response.forEach(function(item) {
					let tr = "<tr> <td> <input type='checkbox' disabled /> </td> "+
						"<td>" + item.fee_name + "</td> "+
						"<td> " + item.amount + " </td>"+
						"<td>" + item.whose_paying + "</td> "+
						"<td> " + item.fee_type + " </td>"+
						"<td>" + item.payment_method + "</td> "+
						"<td> " + item.bank + " </td>"+
						"<td>" + item.description + "</td> "+
						"<td> " + getDateConvertion(item.date_) + " </td>"+
						" </tr>";
					tbody.append(tr);
				});
			$("#loadingRowFees").slideUp();

		}
	});
}
getAllFees ();
/*********************************************************************************************/
function saveNewFee (feeName ,FeeAmount   , student_payingFee    ,  studentFeeTypelist,  payment_methodFee   , feeBankName  , remarkFee ) {
	loadingScreen(true , "Saving");
	$.post("http://localhost:3500/saveNewFee" , {
		feeName:feeName ,
		FeeAmount:FeeAmount   , 
		student_payingFee:student_payingFee    ,  
		studentFeeTypelist:studentFeeTypelist ,
		payment_methodFee:payment_methodFee   , 
		feeBankName:feeBankName  , 
		remarkFee:remarkFee
	},function (response) {
		loadingScreen(false , "Saving");
		if(response == "done"){
			$("#feeName").val('');
			$("#FeeAmount").val('');
			$("#student_payingFee").val();
			$("#studentFeeTypelist").val();
			$("#payment_methodFee").val('null');
			$("#feeBankName").val('');
			$("#remarkFee").val('');
			getAllFees();
		}else{
			
		}
	});
}
/*********************************************************************************************/
function getAllTypes () {
	let tbody = $("#showItemFeesTypes");
	$("#StatusshowItemFeesTypes").hide("fast");
	$("#StatusshowItemFeesTypesLoadingGif").slideDown("fast");
	tbody.empty();
	
	$.get("http://localhost:3500/getFeeType", {},
		function(response) {
			$("#StatusshowItemFeesTypesLoadingGif").slideUp("fast");

			if (response.length == 0) {
				$("#StatusshowItemFeesTypesLoadingGif").slideUp("fast");
				$("#StatusshowItemFeesTypes").slideDown("fast");
				showWarningMessage("Nothing to Show", 3500);
			} else {
				response.forEach(function(item) {
					let tr = "<tr> <td> <input type='checkbox' disabled /> </td> "+
						"<td>" + item.fee_type + "</td> "+
						"<td> " + item.description + " </td> </tr>";
					tbody.append(tr);
				});
			}


	});
}
getAllTypes ();
/*********************************************************************************************/
/*********************************************************************************************/

/*********************************************************************************************/

function getFeeTypesInAddingFee () {
	//let tbody = $("#showItemFees");
	
	let listOptions = $("#studentFeeTypelist");
	$("#studentFeeTypelist").empty().html("");
	$("<option/>").val("null")
	.text("Choose .." )
	.appendTo(listOptions);
	$.get("http://localhost:3500/getFeeType",{}
		,function (response) {
			if(response.length == 0){
				showWarningMessage("Fees,Nothing to Show", 3500);
			}else{
				response.forEach(function(item) {
					$("<option/>").val(item.fee_type)
					.text("" + item.fee_type)
					.appendTo(listOptions);
				});
			}
		});
}
getFeeTypesInAddingFee();
/*********************************************************************************************/


function getClassLevel () {
	let selectOptions = $("#student_payingFee");
	$('#student_payingFee').attr('disabled', false);
	$("#student_payingFeeLabel").html("<span> <img src='../public/images/spinner.gif' /> Students Paying </span>");
	$.get("http://localhost:3500/getClassDetails",{}
		,function (response) {
			if(response.length == 0){
				showWarningMessage("Nothing to show" , 3000);
				$('#student_payingFee').attr('disabled', true);
				$("#student_payingFeeLabel").html("<span style='color:red;'> <span class='fa fa-close'/> Settings Error </span>");
			}else{		
				
				
				let min = parseInt(response[0].gradeLevel[0]);
				let max = parseInt(response[0].gradeLevel[1]);									
				
				$('#student_payingFee')
					.append($("<option></option>")
						.attr("value", 'all')
						.text("All Students")
					);
				for (var i = min; i < max + 1; i++) {
					$("<option/>").val(i)
						.text("All of Grade " + i)
						.appendTo("#student_payingFee");
				}
				// get grades by ranges 1-2, 1-3, 1-4, 1-5, 1-6, 2-3, 2-4, 2-5, 2-6, 2-7, 3-4, 3-5, 3-6, 3-7, 4-5, 4-6, 4-7, 5-6, 5-7, 6-7
				let temp_arr = rangeArray(min , max);				
				let v= [];
				for (let i = 1; i < temp_arr.length+1; i++) {

					for (let j = (i ); j < temp_arr.length ; j++) {
							v.push(i +  "-" + (j + 1));
					}

				}		
				// add to the select tag		
				$.each(v, function (index , value) {					
					$("<option/>").val(value)
						.text("Grades " + value)
						.appendTo("#student_payingFee");
				});

				$("#student_payingFeeLabel").html("<span> Students Paying  </span>");

			}
		});
}

getClassLevel ();
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


/*********************************************************************************************/


/*********************************************************************************************/

/*********************************************************************************************/


/*********************************************************************************************/

/**
 * Validates a given string input.
 * The input must be a number with up to one comma and up to one decimal point with up to two decimal places.
 * @param value The value to be validated
 * @return Returns a string of the valid number if it is valid or null if not valid.
 */
  function validateNumbersCurrency (value) {
    //var value= $("#field1").val();
    var regex = /^[1-9]\d*(((,\d{3}){1})?(\.\d{0,2})?)$/;
    if (regex.test(value)) {
        //Input is valid, check the number of decimal places
        var twoDecimalPlaces = /\.\d{2}$/g;
        var oneDecimalPlace = /\.\d{1}$/g;
        var noDecimalPlacesWithDecimal = /\.\d{0}$/g;
        
        if(value.match(twoDecimalPlaces ))
        {
            //all good, return as is
            return value;
        }
        if(value.match(noDecimalPlacesWithDecimal))
        {
            //add two decimal places
            return value+'00';
        }
        if(value.match(oneDecimalPlace ))
        {
            //ad one decimal place
            return value+'0';
        }
        //else there is no decimal places and no decimal
        return value+".00";
    }
    return null;
}
/*********************************************************************************************/

/*********************************************************************************************/


/*********************************************************************************************/



















