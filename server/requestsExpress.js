/**
 * This will be the web framework that will handle all the <br>
 * requests done to do mostly database actions and even external http requets
 *
 */
const util          = require('./Utils/utilConstants');
const express       = require('express');
const app           = express();
const bodyParser    = require("body-parser");
const studentDB     = require('./DBAccess/Local/Nedb/DBstudentAccess');
const SysAccessDB   = require('./DBAccess/Local/Nedb/DBSystem');
const feeDB         = require('./DBAccess/Local/Nedb/DBFeesAccess');
const feePayment    = require('./DBAccess/Local/Nedb/DBFeesPaymentsAccess');
const users         = require('./DBAccess/Local/Nedb/DBUsersAccess');
var   SqlString     = require('sqlstring');
const mysqlStudents = require('./DBAccess/Remote/Mysql/DBStudentAccess');

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
		console.log("An error during getStudentDataSearchGrade()");
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
		console.log("An error during getStudentDataSearch()");
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
		console.log(err);
		console.log("An error during getClassDetails()");
	});

});
/*------------------------------------------------------------------------------------------------*/
app.post('/saveFeeType' , function (req , res) {
	
	feeDB.creatFeeType( req.body.feee , req.body.descriptionType).then(function  (response) {		
		res.json(response);
	}).catch(function ( err) {
		console.log(err);
		console.log("An error during saveFeeType()");
	});

});
/*------------------------------------------------------------------------------------------------*/
app.get('/getFeeType' , function (req , res) {
	
	feeDB.getFeeTypes().then(function  (response) {		
		res.json(response);
	}).catch(function (err) {
		console.log(err);
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
		console.log(err);
		console.log("An error during saveNewFee()");
	});

});
/*------------------------------------------------------------------------------------------------*/
app.get('/getFees' , function (req , res) {
	
	feePayment.getFees().then(function  (response) {		
		res.json(response);
	}).catch(function (err) {
		console.log(err);
		console.log("An error during getFees()");
	});

});
/*------------------------------------------------------------------------------------------------*/
app.post('/getOneStudentFees' , function (req , res) {

	let clasLevel = req.body.clasLevel_search;
	
	//get amount paid by students at this level
	feeDB.getFeesAmountsforgradeLevel( clasLevel ).then(function (amountToBePaid) {
		
		//get all the amounts and add them all up	
		return feePayment.getStudentPayments(amountToBePaid , req.body.reg_num);

	}).then(function (response) {		
		
		res.json(response);
	}).catch(function (err) {
		console.log(err);
		console.log("An error during getFeesAmountsforgradeLevel()");
	});
	
	/*feePayment.getStudentPayments(req.body.reg_num).then(function  (response) {		
		res.json(response);
	}).catch(function (err) {
		console.log(err);
		console.log("An error during getOneStudentFees()");
	});*/

});
/*------------------------------------------------------------------------------------------------*/
app.post('/payFees' , function (req , res) {
	
	feePayment.payFees( 
req.body.receptNumberPay , req.body.amountPay , req.body.studentRegNumberPay , req.body.paymentMethodPay,
req.body.bankPay  ,  req.body.accountNoPay ,  req.body.commentPay
		 )
	.then(function  (response) {		
		res.json(response);
	}).catch(function ( err) {
		console.log(err);
		console.log("An error during payFees()");
	});

});
/*------------------------------------------------------------------------------------------------*/
app.post('/addUser' , function (req , res) {
	
	users.createUsers( req.body.name_ , req.body.surname_ , req.body.password  , req.body.type_  )
	.then(function  (response) {		
		res.json(response);
	}).catch(function ( err) {
		console.log(err);
		console.log("An error during payFees()");
	});

});
/*------------------------------------------------------------------------------------------------*/
app.get('/getUsers',(req, res)=>{
	users.getAllUsers().then((response)=>{
		res.json(response);
	}).catch((err)=>{
		console.log(err);
		console.log("err in getUsers()");	
		
	});
});
/*------------------------------------------------------------------------------------------------*/
app.post('/editUSer' , function (req , res) {

	users.editUSer( req.body.lastSelectedID , req.body.name_ , req.body.surname_ , req.body.password  , req.body.type_  )
	.then(response=> {		
		res.json(response);
	}).catch( err => {
		console.log(err);
		console.log("An error during editUSer()");
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

/*------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------------------*/

/*------------------------------------------------------------------------------------------------*/

/*------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------------------*/

/*------------------------------------------------------------------------------------------------*/
var CURRENT_TIMESTAMP = {
	toSqlString: function () {
		return 'NOW()';
	}
};
/*------------------------------------------------------------------------------------------------*/
app.listen(3500 , () => {
	
	console.log('working express');
	/* let ject = {
		name              : 'Wink y',
		surname           : 'CAES',
		dob               : '12/1/1111',
		gender            : 'male',
		address           : 'CARAS',
		reg_no            : 'Pret44O',
		reg_date          : '2017-01-19',
		reg_time          : '11:45:53',
		contact_no        : 'email',
		email             : 'sai@cc.ge',
		class_name        : '["Blue" , "Green"]',
		class_level       : "[2,3]",
		current_className : "1",
		current_classLevel: 'Blue',
		school_years      : '[2011,2013]',
		parent_name       : 'saige',
		parent_surname    : 'tarterterpiwa',
		parent_id         : 's1212a343ige',
		parent_address    : 'tapi tyt t6675 fhhhwa',
		parent_contact_no : '9643-232-454',
		parent_email      : 'tapi@c.wa'
	};
	mysqlStudents.saveNewStudent(JSON.stringify(ject)).then(response => {
		console.log(response);
		
	}).catch(error => {
		console.log(error);
			
	}); */
	/* mysqlStudents.getAllStudents().then(response => {
		let jsResponse = JSON.stringify(response);
		console.log(jsResponse);
		response.forEach((row) => {
			console.log(`${row.name} is in ${row.id}`);
		});
		
	}).catch(err => { 
		console.log(err);
		
	  });*/
});








