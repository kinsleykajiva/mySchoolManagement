let Datastore = require('nedb');
let db = new Datastore({
	filename: 'student.db',
	autoload: true
});
/*-------------------------------------------------------------------------------------------------------*/
var fee_type = {
		'fee_type' :fee_type ,  // TYPE OF FEE (MONTHLY, WEEKLY,ANNUAL,ONE TIME)		
};
/*-------------------------------------------------------------------------------------------------------*/
var fees = {
		'fee_name':fee_name  ,// (eg. TUITION FEE,LAB FEE, HOSTEL FEE,SPORTS FEE
		'amount' :amount      ,//(CURRENT CHARGE OF THE FEE, could change with time)
		'whose_paying':payer , // GARDE 4, GARDE 5, GRADE 6
		'fee_type' :fee_type,  //   TYPE OF FEE (MONTHLY, WEEKLY,ANNUAL,ONE TIME)
		'bank':bank , // eg ZB , Ammerican bank
		'description':description , // whats this for
		'date_':new Date(),


};
/*-------------------------------------------------------------------------------------------------------*/
var payment_method = {
		method:method
};
/*-------------------------------------------------------------------------------------------------------*/
var fee_payments = {
			'fee':fee , //fee name
			'amount':amount ,
			'date_':new Date()
			'student_paying':reg_number,
			'payment_method':payment_method,
			'bank':bank,
			'bank_account':bank_account,
			'description':description // payment doen via what account of what bank


};
/*-------------------------------------------------------------------------------------------------------*/

module.exports.creatFeeType = function (name) {
	return new Promise(
		db.insert(fee_type , function (err ,newDoc) {
			if(!err){
				resolve("done");
			}else{
				reject(err);
			}
		});
	);
};

/*-------------------------------------------------------------------------------------------------------*/

module.exports.upDateFeeType = function (id , name) {
	return new Promise(function (resolve , reject) {
		db.update({
			_id:id
		},{
			$set:{
				fee_type:name
			}
		},{multi:false},function (err , numReplaced) {
			if(!err){
				resolve(numReplaced > 0 ? "done":"failed");
			}else{
				reject(err);
			}
		});
	});
};
/*-------------------------------------------------------------------------------------------------------*/
module.exports.deleteFeeType = function(id) {
	return new Promise(function(resolve, reject) {
		db.remove({
			_id: id
		}, {}, function(err, numRemoved) {
			if (!err) {
				resolve(numRemoved > 0 ? "done" : "failed");
			} else {
				reject(err);
			}
		});
	});
};

/*---------------------------------------############################------------------------------------*/


/*-------------------------------------------------------------------------------------------------------*/
module.exports.createFee = function (name , amount , whose_paying , fee_type , bank , description  ) {
	return new Promise(
		db.insert(fees , function (err , newDoc) {
			if(!err){
				resolve("done");
			}else{
				reject(err);
			}
		});
	);
}
/*-------------------------------------------------------------------------------------------------------*/

module.exports.updateFee = function (id ) {
	/* body... */
};
/*-------------------------------------------------------------------------------------------------------*/
module.exports.deleteFee = function (id ) {
	return new Promise(function(resolve, reject) {
		db.remove({
			_id: id
		}, {}, function(err, numRemoved) {
			if (!err) {
				resolve(numRemoved > 0 ? "done" : "failed");
			} else {
				reject(err);
			}
		});
	});
};

/*---------------------------------------############################------------------------------------*/

module.exports.payFees = function(fee , amount , student_paying , payment_method , bank , bank_account , description ){
			return new Promise(
				db.insert(fee_payments, function (err , newDoc) {
					if(!err){
						resolve("done");
					}else{
						reject(err);
					}
				});
			);
};

/*-------------------------------------------------------------------------------------------------------*/




/*-------------------------------------------------------------------------------------------------------*/


/*---------------------------------------############################------------------------------------*/
/*-------------------------------------------------------------------------------------------------------*/


/*-------------------------------------------------------------------------------------------------------*/



/*-------------------------------------------------------------------------------------------------------*/



/*-------------------------------------------------------------------------------------------------------*/



/*-------------------------------------------------------------------------------------------------------*/


/*-------------------------------------------------------------------------------------------------------*/


/*-------------------------------------------------------------------------------------------------------*/


/*-------------------------------------------------------------------------------------------------------*/

/*-------------------------------------------------------------------------------------------------------*/



/*-------------------------------------------------------------------------------------------------------*/



/*-------------------------------------------------------------------------------------------------------*/

/*-------------------------------------------------------------------------------------------------------*/

