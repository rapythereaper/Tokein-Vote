/*Delete this file in production */
/*const admin = require('./../server/firebase-admin');
process.env['FIRESTORE_EMULATOR_HOST'] = 'localhost:8080';
admin.initializeApp({projectId:"t-rater"});
*/
const QRCode = require('qrcode');
async function main(){


QRCode.toString('Encode this text in QR code', {
  errorCorrectionLevel: 'H',
  type: 'svg'
}, function(err, data) {
  if (err) throw err;
  console.log(data);
});
		
}

main();