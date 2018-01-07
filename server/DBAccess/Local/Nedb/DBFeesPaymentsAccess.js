let Datastore = require('nedb');
let db = new Datastore({
	filename: 'FeesPayments.db',
	autoload: true
});

module.exports.payFees = function( amount , reg_number , payment_method , bank , bank_account , description ,receipt){
			return new Promise( function (resolve , reject) {
				var fee_payments = {
					'receipt': receipt,
					'amount': amount,
					'date_': new Date() ,
					'student_paying': reg_number,
					'payment_method': payment_method,
					'bank': bank,
					'bank_account': bank_account,
					'description': description // payment doen via what account of what bank
				};				
				db.insert(fee_payments, function (err , newDoc) {					
					if(!err){
						resolve("done");
					}else{
						reject(err);
					}
				});
			}	);
};

/*-------------------------------------------------------------------------------------------------------*/

module.exports.getFees = function () {
	return new Promise(function (resolve , reject) {
		db.find({},function (err , docs) {
			if(!err){
				resolve(docs);
			}else{
				reject(err);
			}
		});
	});
};


/*-------------------------------------------------------------------------------------------------------*/
module.exports.getStudentPayments = function (regNum) {
	return new Promise(function (resolve , reject) {
		db.find({
			student_paying:regNum
		} , function (err , docs) {
			if(!err){
				resolve(docs);
			}else{
				reject(err);
			}
		});
	});
};
/*-------------------------------------------------------------------------------------------------------*/


/*-------------------------------------------------------------------------------------------------------*/


/*---------------------------------------############################------------------------------------*/
/*-------------------------------------------------------------------------------------------------------*/


/*-------------------------------------------------------------------------------------------------------*/

