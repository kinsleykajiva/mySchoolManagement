
/*********************************************************************************************/
var lastSearchRegNumber= '';
var lastNameSuName='';

/*********************************************************************************************/

/*********************************************************************************************/

/*********************************************************************************************/
/*********************************************************************************************/

/*********************************************************************************************/

/*********************************************************************************************/
function onChangeBank () {
	let paymentMethodPay= $("#paymentMethodPay").val();

	if(paymentMethodPay != 'TransFeer'){
		$("#bankPay").val('NONE').attr('disabled' , true);
		$("#accountNoPay").val('NONE').attr('disabled' , true);
	}else{
		$("#bankPay").val('').attr('disabled' , false);
		$("#accountNoPay").val('').attr('disabled' , false);
	}
}
/*********************************************************************************************/
$("#btnPayPayFees").click(function () {
	let studentRegNumberPay= $("#studentRegNumberPay").val().trim();
	let receptNumberPay= $("#receptNumberPay").val().trim();
	let amountPay = $("#amountPay").val().trim();
	let paymentMethodPay= $("#paymentMethodPay").val();
	let bankPay= $("#bankPay").val().trim();
	let accountNoPay= $("#accountNoPay").val().trim();
	let commentPay= $("#commentPay").val().trim();

	if(studentRegNumberPay == ''){
		showWarningMessage(" Registration Number cant be empty" , 3000);
		return;
	}
	if(receptNumberPay == ''){
		showWarningMessage(" Recept Number cant be empty" , 3000);
		return;
	}
	if(amountPay == ''){
		showWarningMessage(" amount cant be empty" , 3000);
		return;
	}
	if(paymentMethodPay == 'null'){
		showWarningMessage(" Select Payment Method" , 3000);
		return;
	}
	if(bankPay == ''){
		showWarningMessage(" Bank cant be empty" , 3000);
		return;
	}
	if(accountNoPay == ''){
		showWarningMessage("Account Number cant be empty" , 3000);
		return;
	}
	if(commentPay == ''){
		commentPay = 'NONE';
	}
	saveFeesPayment ( studentRegNumberPay ,receptNumberPay  ,amountPay , paymentMethodPay , bankPay , accountNoPay  , commentPay );
	
});
/*********************************************************************************************/
function saveFeesPayment ( studentRegNumberPay  ,amountPay , paymentMethodPay , bankPay , accountNoPay  , commentPay , receptNumberPay) {
	loadingScreen(true , "Saving...");
	$.post("http://localhost:3500/payFees",{
		studentRegNumberPay :studentRegNumberPay  ,
		amountPay :amountPay , 
		paymentMethodPay :paymentMethodPay ,
		bankPay :bankPay , 
		accountNoPay :accountNoPay  , 
		commentPay :commentPay  , 
		receptNumberPay :receptNumberPay  
	}).done(function (response) {
		loadingScreen(false , "Saving...");
		if(response == "done"){
			showSuccessMessage("Payment saved" , 4000);			
			$("#amountPay").val('') ;
			$("#paymentMethodPay").val('null') ;
			$("#bankPay").val('') ;
			$("#accountNoPay").val('') ;
			$("#commentPay").val('') ;
		}
	}).fail(function (err) {
		loadingScreen(false , "Saving...");
		showErrorMessage("Payment Failed , Please try again." , 4000);
	});
}
/*********************************************************************************************/

/*********************************************************************************************/
/*********************************************************************************************/
$('#btnfindStudentFeeSearch').click(function () {
	// get student
  let regNum = $('#searchRegNumber').val().trim()
  let nameSurname = $('#searchNameSurname').val().trim()

  if (regNum == '' && nameSurname == '') {
    showWarningMessage('Please put a search Parameter', 3000)
    return
  }
  $('#viewStudentDatadiv').slideDown('fast')
  $('#status_studentSearch').text('Searching ....')
  $('#loadingstudentSearch').slideDown('fast')
  $('#feeSearchtableListResults').slideUp('fast')
  let tbody = $('#feeStudentSearchResults')
  tbody.empty()
  let query = regNum == '' ? nameSurname : regNum
  $.post('http://localhost:3500/getStudentDataSearch', {
    query: query
  }, function (response) {
    if (response.length == 0) {
      $('#status_studentSearch').text('Student Not Found !').css('color', 'red');
      showWarningMessage('Student Not Found', 3000);
      $('#feeSearchtableListResults').slideUp('fast');
       $('#loadingstudentSearch').slideUp('fast')
    } else {
    	lastNameSuName ='';
    	lastSearchRegNumber='';
    	$("#minimise_DiviewStudentDatadiv").attr('disabled' , true);	
      $('#feeSearchtableListResults').slideDown('fast');
      response.forEach(function (item) {
        let tr = '<tr>' +
									'<td> ' + item.reg_num + '</td>' +
									'<td> ' + item.inputFirstname + ' ' + item.inputSurname + '</td>' +
									"<td> <a style='cursor:pointer;' id='" + item.reg_num + "' dt = '" + item.inputFirstname + ' ' + item.inputSurname + "' onclick ='viewSearchSelect(this);'  > Select</a> </td>" +
							'</tr>'
        tbody.append(tr)
      })
      $('#status_studentSearch').text('Students found').css('color', 'black')
      $('#loadingstudentSearch').slideUp('fast')
    }
  })
})

/*********************************************************************************************/
function moveAnimate (element, newParent) {
    // Allow passing in either a jQuery object or selector
  element = $(element)
  let Helement = element.outerHeight() + -2
  newParent = $(newParent)
  newParent.animate({height: Helement + 'px' }, 'fast')
  element.animate({marginTop: 4, marginLeft: 5}, 'slow')
  newParent.css('background-color', '#d6d3d3e8;')
  var oldOffset = element.offset()
  element.appendTo(newParent)
  var newOffset = element.offset()

  var temp = element.clone().appendTo('body')
  temp.css({
    'position': 'absolute',
    'left': oldOffset.left,
    'top': oldOffset.top,
    'z-index': 1000
  })
  element.hide()
  temp.animate({'top': newOffset.top, 'left': newOffset.left}, 'slow', function () {
    element.show()
    temp.remove()
  })
}
/*********************************************************************************************/
function moveAnimateReturn (element, newParent) {
  // Allow passing in either a jQuery object or selector
  element = $(element)  
  newParent = $(newParent) 

  var oldOffset = element.offset();
  
  element.appendTo(newParent).hide();
  if($("#destinationMinimisedDiv").children().length == 1){
  		$('#destinationMinimisedDiv').css('background-color', '#f0f3f4');
  }
  
   
}
/*********************************************************************************************/
function animove () {
  let dest = $('#destinationMinimisedDiv')
  let btn = $('#btnmaximise_DiviewStudentDatadiv')
  moveAnimate('#btnmaximise_DiviewStudentDatadiv', '#destinationMinimisedDiv')
	//
	
}

// animove ();
/*********************************************************************************************/

function viewSearchSelect (object) {
	let id_ = $(object).attr('id');
	$('#searchRegNumber').val(id_);
	$('#studentRegNumberPay').val(id_);
	$("#receptNumberPay").val(receiptNumber());
	$('#searchNameSurname').val($(object).attr('dt'));
	lastSearchRegNumber = id_;
	
	lastNameSuName =$(object).attr('dt');
	if(lastSearchRegNumber ==''){
		$("#minimise_DiviewStudentDatadiv").attr('disabled' , false);	
	}
	
 	// hide search for student
 	minimise_DiviewStudentDatadiv ();

 	//sho the payment history
 	setTimeout(function () {
 		$("#studentFeesHistoryDiv").slideDown('fast');
 		getstudentFeeHistory(id_);
 	},1500);
 	

}

/*********************************************************************************************/
function maximise_DiviewStudentDatadiv () {
$("#minimise_DiviewStudentDatadiv").attr('disabled' , false);	
  $('#viewStudentDatadivPanel').show('drop', { direction: 'down' }, 'slow', function () {
    $('#btnmaximise_DiviewStudentDatadiv').slideUp('fast');

    if($("#studentFeesHistoryDiv").is(":visible")){
    	close_DiviewStudentFeesHistorydiv () ;
    }   

    moveAnimateReturn('#btnmaximise_DiviewStudentDatadiv', '#kill');
  })
}

/*********************************************************************************************/
function minimise_DiviewStudentDatadiv () {
  $('#btnmaximise_DiviewStudentDatadiv').show('fast')
  $('#viewStudentDatadivPanel').hide('drop', { direction: 'down' }, 'slow', function () {
    $('#btnmaximise_DiviewStudentDatadiv').slideDown('fast')
    moveAnimate('#btnmaximise_DiviewStudentDatadiv', '#destinationMinimisedDiv');
  });
  if(lastSearchRegNumber !=''){
  	//sho the payment history
  	setTimeout(function () {
  		$("#studentFeesHistoryDiv").slideDown('fast');
  		getstudentFeeHistory(lastSearchRegNumber);
  	},1500);
  }
	// hide( "drop", { direction: "down" }, "slow" );
}
/*********************************************************************************************/

function close_DiviewStudentDatadiv () {
  $('#viewStudentDatadiv').slideUp('slow')
}

/*********************************************************************************************/
function getstudentFeeHistory (reg_num) {	

		let tbody = $('#StudentFeesHistorySearchResults');
		tbody.empty();

		$('#loadingstudentFeeHistory').slideDown('fast');
		$('#status_studentTableHistory').text('Loading History').css('color', 'black');
		$('#studentFeeHistoryTotal').slideUp('fast');
		$('#StudentFeesHistorytableListResults').slideUp('fast');
		$("#StudentFeesHistoryshowingTable").slideUp('fast');
		$("#refresh_DiviewStudentFeesHistorydiv").slideUp('fast').text(reg_num);

		$.get("http://localhost:3500/getOneStudentFees" , {
			reg_num:reg_num
		}).done(function (response) {
			$('#loadingstudentFeeHistory').slideUp('fast');
			if( response.length == 0 ){
				$('#status_studentTableHistory').text('Student has Paid Nothing so far  !').css('color', 'red');
				//$("#minimise_DiviewStudentFeesHistorydiv").attr('disabled' , true);
				showWarningMessage('Student has Paid Nothing so far ', 3000);
				$('#StudentFeesHistorytableListResults').slideUp('fast');
			}else{
				$("#minimise_DiviewStudentFeesHistorydiv").attr('disabled' , false);
				$("#StudentFeesHistoryshowingTable").slideDown('fast');
				$('#status_studentTableHistory').text('Student Payment History').css('color', 'black');
				$('#StudentFeesHistorytableListResults').slideDown('fast');
				$('#studentFeeHistoryTotal').slideDown('fast');

			}
		}).fail(function (err) {
			$("#minimise_DiviewStudentFeesHistorydiv").attr('disabled' , true);
			$("#refresh_DiviewStudentFeesHistorydiv").slideDown('fast');
			$('#loadingstudentFeeHistory').slideUp('fast');
			$('#status_studentTableHistory').text('Error Occured ,Press Re-Load  !').css('color', 'red');
			showErrorMessage('Error Occured ', 3000);			
			$('#StudentFeesHistorytableListResults').slideUp('fast');
		});
	
}
/*********************************************************************************************/
function refresh_DiviewStudentFeesHistorydiv () {
	let id_ = $("#refresh_DiviewStudentFeesHistorydiv").text();
	getstudentFeeHistory(id_);
}
/*********************************************************************************************/
function close_DiviewStudentFeesHistorydiv () {
 $("#studentFeesHistoryDiv").slideUp('fast');
}

/*********************************************************************************************/
function maximise_DiviewStudentFeesHistorydiv () {
	$('#viewStudentFeesHistorydivPanel').show('drop', { direction: 'down' }, 'slow', function () {
		$('#btnmaximise_DiviewStudentFeesHistorydiv').slideUp('fast');
		
		moveAnimateReturn('#btnmaximise_DiviewStudentFeesHistorydiv', '#killFeeshistory');
if ($("#viewStudentDatadiv").is(":visible")) {
			setTimeout(()=>{				
				$("#studentFeesHistoryDiv").slideDown('fast');
			},1500);
			close_DiviewStudentDatadiv();
			
		}

	})
	
}
/*********************************************************************************************/
function minimise_DiviewStudentFeesHistorydiv () {
	$('#btnmaximise_DiviewStudentFeesHistorydiv').show('fast');
	$('#viewStudentFeesHistorydivPanel').hide('drop', { direction: 'down' }, 'slow', function () {
		$('#btnmaximise_DiviewStudentFeesHistorydiv').slideDown('fast');
		moveAnimate('#btnmaximise_DiviewStudentFeesHistorydiv', '#destinationMinimisedDiv');
	});
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

/*********************************************************************************************/

/*********************************************************************************************/

/*********************************************************************************************/

/*********************************************************************************************/

/*********************************************************************************************/

/*********************************************************************************************/
