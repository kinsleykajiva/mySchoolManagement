const nav_links = document.querySelectorAll('link[rel="import"]');

var lastClickedNAv = "";

var   shouldLoadView         = true;
const notificationsShowwTime = 7500;


/*********************************************************************************************/


/*********************************************************************************************/

/*********************************************************************************************/

/*********************************************************************************************/

/*********************************************************************************************/
/**
 * Creates a random String based on the chars input <br>
 * example of usage: randomString(5); or randomString(5, 'PICKCHARSFROMTHISSET');
 * <br>
 * @param {integer} length - size of the output .
 * @param {string} chars - can be ignored ,but the the characters to use in creating the output.
 * @returns {String} Random string of size @param lenSize
*/
function randomIDString(lenSize, chars) {
	    let charSet      = chars || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	    let randomString = "";
		for (let i = 0; i < lenSize; i++){
			let position      = Math.floor(Math.random() * charSet.length);
			    randomString += charSet.substring(position, position + 1);
		}
	return randomString;
}

/*********************************************************************************************/
/**
 * Create a random String of alphabet and numbers
 * @returns {string} Random String
 */
function randomStringID() {
	var text     = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	for (var i = 0; i < 5; i++){
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}

	return text;
}

/*********************************************************************************************/
function thisNav (navObject) {
	const nav           = $(navObject).attr('id');
	const contentHolder = $("#content");

	let template = null;
	let clone    = null;
	
	switch (nav) {
		case "nav_newStudent": 
			if (lastClickedNAv == nav) {
				return;
			}
			template = nav_links[0].import.querySelector(".task-template");
			clone    = document.importNode(template.content, true);

			contentHolder
				.empty()
				.delay(500)
				.append(clone);
			lastClickedNAv = nav;

			break;
		case "nav_viewStudent": 
			if (lastClickedNAv == nav) {
				return;
			}
			template = nav_links[1].import.querySelector(".task-template");
			clone    = document.importNode(template.content, true);

			contentHolder
				.empty()
				.delay(500)
				.append(clone);
			lastClickedNAv = nav;
			break;
		case "nav_settings": 
			if (lastClickedNAv == nav) {
				return;
			}
			template = nav_links[2].import.querySelector(".task-template");
			clone    = document.importNode(template.content, true);

			contentHolder
				.empty()
				.delay(500)
				.append(clone);
			lastClickedNAv = nav;
			break;
		case "nav_createFees": 
			if (lastClickedNAv == nav) {
				return;
			}
			template = nav_links[3].import.querySelector(".task-template");
			clone    = document.importNode(template.content, true);

			contentHolder
				.empty()
				.delay(500)
				.append(clone);

			break;
		case "nav_studentPayFees": 
			if (lastClickedNAv == nav) {
				return;
			}
			template = nav_links[4].import.querySelector(".task-template");
			clone    = document.importNode(template.content, true);

			contentHolder
				.empty()
				.delay(500)
				.append(clone);

			lastClickedNAv = nav;

			break;
	}
}
/*********************************************************************************************/

/*********************************************************************************************/
function getSchoolPhoneNumber() {
	return "263 232 232";
}
/*********************************************************************************************/

function getSchoolAddress() {
	return "Location in City , City, Number";
}
/*********************************************************************************************/
function getSchoolName() {
	return "Secondary High School";
}

/*********************************************************************************************/

function getSystemName() {
	return "My School Management";
}

/*********************************************************************************************/
function randString(x){
    var s = "";
    while(s.length<x&&x>0){
        var r  = Math.random();
            s += (r<0.1?Math.floor(r*100):String.fromCharCode(Math.floor(r*26) + (r>0.5?97:65)));
    }
    return s;
}

/*********************************************************************************************/
/**
 * Gets the random integer between min and max (both included)
 *
 * @param      {number}  min     The minimum
 * @param      {number}  max     The maximum
 * @return     {<type>}  The random integer.
 */
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}
/*********************************************************************************************/
/**
 * Creates a random receipt Number between min and max (both included)
 * @return     {<String>}  random receipt Number.
 */
function receiptNumber () {
	
	let ret  = "";
	    ret  = getcurrentDate()  ;                                                                                                //  dd + '/' + mm + '/' + yyyy;
	let dd   = ret.split('/')[0];
	let mm   = ret.split('/')[1];
	let yyyy = ret.split('/')[2];
	let ranS = randString(getRndInteger(5,8)).toUpperCase();
	    ret  = dd + ranS.substring(2,4)+ ranS.charAt(getRndInteger(1,2)) + '-' + mm +'-'+ ranS.charAt(getRndInteger(1,4))+yyyy ;
	

	return ret;
}
/*********************************************************************************************/
/**
 * Converts a Turkish Z-Date format to  date form MM/DD/YYYY
 * @param	   {String} zDate	The date to be converted
 * @return     {String}  Date String.
 */
function dateConvertor (zDate) {
	
	return new Date(zDate).toDateString();
}
/*********************************************************************************************/
/**
 * Converts a Turkish Z-Date format to  date form MM/DD/YYYY
 * @param	   {String} zDate	The date to be converted
 * @return     {String}  Date String.
 */
function getDateConvertion(zdate){
	let date = new Date(zdate);
	return  ((date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear());
}

/*********************************************************************************************/
/**
 * This is a method override of the default JS replaceAll method to replace {search} occurrences
 * @param	   {String} search	The date to be converted
 * @param	   {String} replace	The date to be converted
 * @return     {String}  String.
 */
String.prototype.replaceAll2 = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};


/*********************************************************************************************/
/**
 * This creates an array of numbers with in a given range
 * @param	   {Number} start	start from 
 * @param	   {Number} end		stop at
 * @return     {Integer Array}  .
 */
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
/**
 * This shows a pop up dialog box that ask and returns decisions
 * @return     {Boolean}  true or false.
 */
function makeSureOfExit(){
    $(document).unload(function(){
        // if(confirm('Are you sure you want to exit?')){
        //      return true;
        // }

		// return false;
		return confirm("Are you sure you want to exit?");
    });
}

/*********************************************************************************************/
function loadingScreenElement(elementID, show, message) {
	if (show) {

		$('#' + elementID).block({
			message: message == '' ? "<h1>Processing</h1>": "<h1> "+message+" </h1>",
			css    : {
				border                 : 'none',
				padding                : '15px',
				backgroundColor        : '#000',
				'-webkit-border-radius': '10px',
				'-moz-border-radius'   : '10px',
				opacity                : .5,
				color                  : '#fff'
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
			message: message == '' ? "<h3> Processing.Please Wait...</h3>": "<h3> " + message + "</h3>",
			css    : {
				border                 : 'none',
				padding                : '15px',
				backgroundColor        : '#000',
				'-webkit-border-radius': '10px',
				'-moz-border-radius'   : '10px',
				opacity                : .5,
				color                  : '#fff'
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
		heading  : '',
		text     : message == '' ? "Hi."             : message,
		hideAfter: time == 0 ? notificationsShowwTime: time,
		position : 'mid-center',
		stack    : false
	});
}
/*********************************************************************************************/
function showSuccessMessage(message, time) {
	$.toast({
		heading  : 'Success',
		text     : message == '' ? "Hi."             : message,
		hideAfter: time == 0 ? notificationsShowwTime: time,
		position : 'top-right',
		icon     : 'success'
	});
}

/*********************************************************************************************/

function showWarningMessage(message, time) {
	$.toast({
		heading  : 'Warning',
		text     : message == '' ? "Hi."             : message,
		hideAfter: time == 0 ? notificationsShowwTime: time,
		position : 'top-right',
		icon     : 'warning'
	});
}

/*********************************************************************************************/
function showErrorMessage(message, time) {
	$.toast({
		heading  : 'Error',
		text     : message == '' ? "Hi."             : message,
		hideAfter: time == 0 ? notificationsShowwTime: time,
		position : 'top-right',
		icon     : 'error'
	});
}


/*********************************************************************************************/
function showSimpleToast() {
	$.toast({
		heading           : 'Information',
		text              : 'Now you can add icons to generate different kinds of toasts',
		showHideTransition: 'slide',
		hideAfter         : notificationsShowwTime,
		position          : 'top-right',
		icon              : 'info'
	});
}

/*********************************************************************************************/
function getcurrentDate() {
	var today = new Date();
	var dd    = today.getDate();
	var mm    = today.getMonth() + 1;  //January is 0!
	var yyyy  = today.getFullYear();

	if (dd < 10) {
		dd = '0' + dd
	}

	if (mm < 10) {
		mm = '0' + mm
	}

	return dd + '/' + mm + '/' + yyyy;

}
/*********************************************************************************************/
/*  This seeks to remove the long text of selectors in JQuery .Sets the text to html object
* @obj - html object ID
* @txt - text to set to the object passed
*/
function _txt(obj ,txt) {
   $("#" + obj).text(txt);
}
/* ------------------------------------------------------------------------------------------ */
/*This seeks to remove the long text of selectors in JQuery .Sets the value to html object
*@param    obj - html object ID
*@param	 val - val to set to the object passed
*/
function _vv(obj,val) {
   $("#" + obj).val(val);
}
/* ------------------------------------------------------------------------------------------ */
/*  This seeks to remove the long text of selectors in JQuery .
* @obj - html object ID
* @return -value
*/
function _v(obj) {
  return $("#" + obj).val();
}
/* ------------------------------------------------------------------------------------------ */
/*  This seeks to remove the long text of selectors in JQuery .
* @obj - html object ID
* 
*/
function _t(obj) {
  return $("#" + obj).text();
}
/* ------------------------------------------------------------------------------------------ */
/*  This seeks to remove the long text of selectors in JQuery .
* @obj - html object ID
* @return - returns with html object
*/
function __(obj) {
  return $("#" + obj);
}
/* ------------------------------------------------------------------------------------------ */
function _(ob) {
	return documentElement.getElementById(ob);
}
/*********************************************************************************************/