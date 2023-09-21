/*Delete this file in production */
/*const admin = require('./../server/firebase-admin');
process.env['FIRESTORE_EMULATOR_HOST'] = 'localhost:8080';
admin.initializeApp({projectId:"t-rater"});
*/
const QRCode = require('qrcode');
const pdf_lib=require("pdf-lib");
const PDFDocument=pdf_lib.PDFDocument;
const StandardFonts=pdf_lib.StandardFonts;
const degrees = pdf_lib.degrees;
const rgb=pdf_lib.rgb;
const fs=require("fs");
const A4=pdf_lib.PageSizes.A4;

const createUrl=(id)=>{
  return `https://acit.netlify.app/DesignComp?token_id=${id}`;
}

const readJson=()=>{
  data={count:0,tokens:[]};
  let files=fs.readdirSync("./src");
  for(let i of files){
    console.log(`[*] Reading fiile ${i}`);
    let j=String(fs.readFileSync(`./src/${i}`));
    j=JSON.parse(j);
    data.count+=j.count;
    data.tokens=[...data.tokens,...j.tokens];
  }
  return data;
}


const main=async ()=>{
  const row=5;
  const colm=4;
  [width,height]=A4;
  console.log(width,height);
  const k_factor=2
  const qr_size=(width/colm)- k_factor;
  //const data=readJSON("src");
  let doc=await PDFDocument.create();
  //let page=doc.addPage(A4);
  let data=readJson();
  console.log(data.count);

  let token_index=0;
  for(let k=0;k<data.count;k++){
    if(token_index>=data.count)break;
    let page=doc.addPage(A4);

    for(let j=0;j<row;j++){
      if(token_index>=data.count)break;

      for(let i=0;i<colm;i++){
        let token=data.tokens[token_index];

        let qr=await QRCode.toDataURL(createUrl(token))
        let pngImage = await doc.embedPng(qr);
        page.drawImage(pngImage,{x:i*qr_size,y:(j*qr_size)+k_factor*10+12,width:qr_size,height:qr_size});
        page.drawText(`Token id : ${token}`, {x:i*qr_size+token.length-5,y:(j*qr_size)+k_factor*13+qr_size,size: 7});

        token_index++;
        if(token_index>=data.count)break;
      };
    }
  }
  const pdfBytes=await doc.save();
  fs.writeFileSync("./out/output.pdf",pdfBytes);
  console.log("[*]All done");
}

main();

