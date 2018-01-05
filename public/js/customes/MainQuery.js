const nav_links = document.querySelectorAll('link[rel="import"]');

var lastClikedNAv = "nav_home";

var shouldLoadView = true;
const notificationsShowwTime = 7500;


/*********************************************************************************************/


/*********************************************************************************************/

/*********************************************************************************************/


/*********************************************************************************************/


/*********************************************************************************************/

/*********************************************************************************************/


/*********************************************************************************************/


/*********************************************************************************************/

/*********************************************************************************************/
function dateConvertor (zDate) {
	let  mydate = new Date(zDate);
	return (mydate.toDateString());
}
/*********************************************************************************************/
function getDateConvertion(zdate){
	let date = new Date(zdate);
	return  ((date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear());
}

/*********************************************************************************************/
String.prototype.replaceAll2 = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};


/*********************************************************************************************/
function rangeArray(start, end) {
	let myArray = [];
	for (let i = start; i <= end; i += 1) {
		myArray.push(i);
	}
	return myArray;
}
/*********************************************************************************************/
function resizeWindow(){
     window.resizeTo(800,600);
}

/*********************************************************************************************/
function makeSureOfExit(){
    $(document).unload(function(){
        if(confirm('Are you sure you want to exit?')){
             return true;
        }

        return false;
    });
}

/*********************************************************************************************/
function loadingScreenElement(elementID, show, message) {
	if (show) {

		$('#' + elementID).block({
			message: message == '' ? "<h1>Processing</h1>" : "<h1> "+message+" </h1>",
			css: {
				border: 'none',
				padding: '15px',
				backgroundColor: '#000',
				'-webkit-border-radius': '10px',
				'-moz-border-radius': '10px',
				opacity: .5,
				color: '#fff'
			}
		});
	} else {
		$('#' + elementID).unblock();
	}
}
/*********************************************************************************************/

function loadingScreen(sho, message) {
	if (sho) {
		$.blockUI({
			message: message == '' ? "<h3> Processing.Please Wait...</h3>" : "<h3> " + message + "</h3>",
			css: {
				border: 'none',
				padding: '15px',
				backgroundColor: '#000',
				'-webkit-border-radius': '10px',
				'-moz-border-radius': '10px',
				opacity: .5,
				color: '#fff'
			}
		});
	} else {
		$.unblockUI({
			fadeOut: 100
		});
	}
}

/*********************************************************************************************/
function isInRange(obj) {
	let va = $(obj).val();

	return va.length > 1;
}
/*********************************************************************************************/
function showGeneralMessage(message, time) {
	$.toast({
		heading: '',
		text: message == '' ? "Hi." : message,
		hideAfter: time == 0 ? notificationsShowwTime : time,
		position: 'mid-center',
		stack: false
	});
}
/*********************************************************************************************/
function showSuccessMessage(message, time) {
	$.toast({
		heading: 'Success',
		text: message == '' ? "Hi." : message,
		hideAfter: time == 0 ? notificationsShowwTime : time,
		position: 'top-right',
		icon: 'success'
	});
}

/*********************************************************************************************/

function showWarningMessage(message, time) {
	$.toast({
		heading: 'Warning',
		text: message == '' ? "Hi." : message,
		hideAfter: time == 0 ? notificationsShowwTime : time,
		position: 'top-right',
		icon: 'warning'
	});
}

/*********************************************************************************************/
function showErrorMessage(message, time) {
	$.toast({
		heading: 'Error',
		text: message == '' ? "Hi." : message,
		hideAfter: time == 0 ? notificationsShowwTime : time,
		position: 'top-right',
		icon: 'error'
	});
}


/*********************************************************************************************/
function showSimpleToast() {
	$.toast({
		heading: 'Information',
		text: 'Now you can add icons to generate different kinds of toasts',
		showHideTransition: 'slide',
		hideAfter: notificationsShowwTime,
		position: 'top-right',
		icon: 'info'
	});
}

/*********************************************************************************************/
function getcurrentDate() {
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth() + 1; //January is 0!
	var yyyy = today.getFullYear();

	if (dd < 10) {
		dd = '0' + dd
	}

	if (mm < 10) {
		mm = '0' + mm
	}

	return dd + '/' + mm + '/' + yyyy;

}
/*********************************************************************************************/

function _(ob) {
	return documentElement.getElementById(ob);
}
/*********************************************************************************************/