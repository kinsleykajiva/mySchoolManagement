let Datastore = require('nedb');
let db = new Datastore({
	filename: 'FeesPayments.db',
	autoload: true
});

module.exports.payFees = function( a  , b , c , d ,  e , f , g ){
			return new Promise( function (resolve , reject) {				
				let fee_payments = {
					'receipt'       : b,
					'amount'        : d,
					'date_'         : new Date(),
					'student_paying': c,
					'payment_method': e,
					'bank'          : f,
					'bank_account'  : g,
					'description'   : a            // payment doen via what account of what bank
				};						
				db.insert(fee_payments, function (err , newDoc) {
				
					if(!err){
						resolve("done");
					}else{
						reject(err);
					}
				});
			});
};

/*-------------------------------------------------------------------------------------------------------*/

module.exports.getFees = ()=> {
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
module.exports.getStudentPayments = function (amountToBePaid , regNum) {
	return new Promise(function (resolve , reject) {
		
		db.find({
			student_paying: regNum
		} , function (err , docs) {
			
			if(!err){
				//var jString = JSON.stringify(response);
				let sonJ = {
					'amt': amountToBePaid,
					'j'  : docs
				};
				resolve(sonJ);
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

