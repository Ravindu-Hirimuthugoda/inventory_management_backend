const nodemailer = require('nodemailer');

const ResponseMail = (detail)=>{

    const output =
    `<div style="height:300px;width:600px;background:#cecccc;padding:16px;box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);" >
        <div style="background:white;">
        <h2 align='center'>UOM Inventory Management System</h2>
        </div>
        <div>
            <p>You are receiving this email because of the lecturer response</p>
        </div>
        
        <div>
            <p>The equipment ${detail.storeCode} which is a ${detail.ctegory} has been ${detail.type} by Dr.${detail.fname} ${detail.lname}</p>
        </div>
        <p align='center'><b>Check your notifications!</b></p>
    </div>`
    

    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth:{
            user: "ravinduwishwashan1998@gmail.com",
            pass: "ravindu$1998",
        },
    });
    let mailoptions = {
        from: '"UOM Inventory Management System"<ravinduwishwashan1998@gmail.com>',
        to: detail.mail,
        subject: "Pending Request",
        html: output,
    }
    transporter.sendMail(mailoptions,(err,info)=>{
        if(err){
            console.log(err);
        }
        console.log('message sent!');
    });

}

module.exports = ResponseMail;