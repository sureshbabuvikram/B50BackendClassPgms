import nodemailer from 'nodemailer'

const mail=()=>{
    let mailTransporter= nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:"sureshbabuvikram@gmail.com",
            pass:"cwrr dyzf fkdr hvuv"
        }
    })

    let details={
        from:"sureshbabuvikram@gmail.com",
        to:"sureshbabuvikram@gmail.com",
        subject:"Login msg",
        text:"login successfully"
    }

    mailTransporter.sendMail(details,(err)=>{
        if(err){
            console.log("mail not send");
        }else{
            console.log("mail sent successfully");
        }
    })

}

export default mail;