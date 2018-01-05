/**
 * This will be the web framework that will handle all the <br>
 * requests done to do mostly database actions and even external http requets
 *
 */

let express = require('express');
let app = express();
var bodyParser = require("body-parser");
let studentDB = require('./DBAccess/Local/Nedb/DBstudentAccess');
let SysAccessDB = require('./DBAccess/Local/Nedb/DBSystem');
let feeDB = require('./DBAccess/Local/Nedb/DBFeesAccess');

/*------------------------------------------------------------------------------------------------*/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/*------------------------------------------------------------------------------------------------*/
app.get('/getAllStudentData' , function (req , res) {
	
	studentDB.getAllStudents().then(function  (response) {

		res.json(response);
	}).catch(function () {
		console.log("An error during getAllStudents() ");
	});

});
/*------------------------------------------------------------------------------------------------*/
app.post('/getStudentDataSearchGrade' , function (req , res) {
	
	studentDB.searchStudentGrade(req.body.query , req.body.grad_).then(function  (response) {		
		res.json(response);
	}).catch(function () {
		console.log("An error during searchStudentGrade()");
	});

});

/*------------------------------------------------------------------------------------------------*/

app.post('/getDeleteStudent' , function (req , res) {
	
	studentDB.deleteStudent(req.body.id_).then(function  (response) {		
		res.json(response);
	}).catch(function () {
		console.log("An error during deleteStudent()");
	});

});
/*------------------------------------------------------------------------------------------------*/
app.post('/getStudentDataSearch' , function (req , res) {
	
	studentDB.searchStudents(req.body.query).then(function  (response) {		
		res.json(response);
	}).catch(function () {
		console.log("An error during searchStudents()");
	});

});
/*------------------------------------------------------------------------------------------------*/
app.post("/savingNewstudentData" , function (req , res) {
	studentDB.findOneStudent(req.body.name , req.body.surname ).then(function (response) {
		if(response == "empty"){
			studentDB.saveNewStudent(
			req.body.reg_num ,
			req.body.inputClassLevel ,
			req.body.inputClass ,
			req.body.inputFirstname ,
			req.body.inputSurname ,
			req.body.inputGender ,
			req.body.inputDob ,
			req.body.inputEmail ,
			req.body.inputPhoneNumber ,
			req.body.inputAddress ,
			req.body.GinputFirstname ,
			req.body.GinputSurname ,
			req.body.GinputID ,
			req.body.GinputAddress ,
			req.body.GinputEmail ,
			req.body.GinputPhoneNumber

				).then(function (response) {
					res.json(response);
				}).catch(function () {
					console.log('Error in saving');
				});
		}else if(response == "exists"){
			res.json("exists");
		}else{
			res.json(response);
		}
	}).catch(function () {
		console.log('error while checking if record exists');
	});
});
/*------------------------------------------------------------------------------------------------*/

app.post("/saveStudentDataEdit" , function (req , res) {
	studentDB.updateStudent(
		req.body.reg_num,
		req.body.inputClassLevel,
		req.body.inputClass,
		req.body.inputFirstname,
		req.body.inputSurname,
		req.body.inputGender,
		req.body.inputDob,
		req.body.inputEmail,
		req.body.inputPhoneNumber,
		req.body.inputAddress,
		req.body.GinputFirstname,
		req.body.GinputSurname,
		req.body.GinputID,
		req.body.GinputAddress,
		req.body.GinputEmail,
		req.body.GinputPhoneNumber

	) .then(function(response) {
		res.json(response);
	}).catch(function() {
		console.log('Error in saving');
	});
});
/*------------------------------------------------------------------------------------------------*/
app.post('/getStudentSaveGrade' , function (req , res) {
	
	SysAccessDB.createGrades(req.body.classesNames , req.body.classLevels).then(function  (response) {		
		res.json(response);
	}).catch(function () {
		console.log("An error during createGrades()");
	});

});
/*------------------------------------------------------------------------------------------------*/
app.get('/getClassDetails' , function (req , res) {
	
	SysAccessDB.getClassDetails().then(function  (response) {		
		res.json(response);
	}).catch(function (err) {
		console.log(err)
		console.log("An error during getClassDetails()");
	});

});
/*------------------------------------------------------------------------------------------------*/
app.post('/saveFeeType' , function (req , res) {
	
	feeDB.creatFeeType( req.body.feee , req.body.descriptionType).then(function  (response) {		
		res.json(response);
	}).catch(function ( err) {
		console.log(err)
		console.log("An error during saveFeeType()");
	});

});
/*------------------------------------------------------------------------------------------------*/
app.get('/getFeeType' , function (req , res) {
	
	feeDB.getFeeTypes().then(function  (response) {		
		res.json(response);
	}).catch(function (err) {
		console.log(err)
		console.log("An error during getFeeType()");
	});

});
/*------------------------------------------------------------------------------------------------*/
app.post('/saveNewFee' , function (req , res) {
	
	feeDB.createFee( req.body.feeName ,req.body.FeeAmount   , req.body.student_payingFee    , 
	 req.body.studentFeeTypelist,   req.body.feeBankName ,req.body.payment_methodFee    , req.body.remarkFee )
	.then(function  (response) {		
		res.json(response);
	}).catch(function ( err) {
		console.log(err)
		console.log("An error during saveNewFee()");
	});

});
/*------------------------------------------------------------------------------------------------*/
app.get('/getFees' , function (req , res) {
	
	feeDB.getFees().then(function  (response) {		
		res.json(response);
	}).catch(function (err) {
		console.log(err)
		console.log("An error during getFees()");
	});

});
/*------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------------------*/

/*------------------------------------------------------------------------------------------------*/

/*------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------------------*/

/*------------------------------------------------------------------------------------------------*/

/*------------------------------------------------------------------------------------------------*/
app.listen(3500 , function () {
	
	console.log('working express');
});







