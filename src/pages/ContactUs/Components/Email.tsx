import emailjs from '@emailjs/browser'
// import * as nodemailer from 'nodemailer'
// var nodemailer = require('nodemailer')
// export const sendMail = async () => {
//   console.log('kyu chalra')
  // try {
    // const transporter = nodemailer?.createTransport({
    //   service: 'gmail',
    //   host: "smtp.gmail.email",
    //   port: 587,
    //   secure: false,
    //   auth: {
    //     user: 'mohamedraees2@gmail.com',
    //     pass: import.meta.env.VITE_password
    //   },
    // });

  //   const mailOptions = {
  //     from: {
  //       name: 'Skunkworks',
  //       address: 'mohamedraees2@gmail.com'
  //     },
  //     to: "raeesmohamed66@gmail.com",
  //     subject: "Hello ✔",
  //     text: "Hello world?",
  //     html: "<b>Hello world?</b>",
  //   }
  //   console.log('rea')
  //   await transporter.sendMail(mailOptions)
  //   console.log('email send success')
  // }
  // catch (e) {
  //   console.log(e)
  // }
// }

export const sendEmail = async(formData:any)=>{
  try{
    emailjs.init('pTeqkZEaUoXAO7vo_')
    const result = await emailjs.sendForm(
      'service_9csh71t',
      'template_padlybi',
      formData,
    )
    if( result.status===200){
      return 'success'
    }
    return 'failure'
  }
  catch(e){
    console.log(e)
    return 'failure'
  }
}