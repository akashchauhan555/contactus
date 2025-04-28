const express = require("express");
const contactModel = require("../schema/contact.model");
const router = express.Router();
const nodeMailer = require('nodemailer')

router.post("/contactus", async (req, res) => {
  console.log(req.body);
  try {
    const contact = await contactModel.create(req.body);

    // const transporter = nodeMailer.createTransport({
    //   service:'gmail',
    //   auth:{
    //     user:'ac1675229@gmail.com',
    //     pass:'rfkuyytjsjlupulp'
    //   }
    // })

    // const mailOption = {
    //   from:'ac1675229@gmail.com',
    //   to:req.body.email,
    //   subject:'Thank you for contacting us!',
    //   // text:'nodemailer testing'
    //   html:`<p>hello ${req.body.name}</p>
    //   <li>nodemailer testing in list </li>`
    // }

    // transporter.sendMail(mailOption, (error,info)=>{
    //   if(error){
    //     console.log('email not sent',error)
    //     return
    //   }
    //   else{
    //     console.log('email sent',info.response)
    //   }
    // })

    const transporter = nodeMailer.createTransport({
      service:'gmail',
      auth:{
        user:'ac1675229@gmail.com',
        pass:'rfkuyytjsjlupulp'
      }
    })

    const mailOption = {
      from:"ac1675229@gmail.com",
      to:req.body.email,
      subject:"thanks for contacting us!",
      text:'testing'
    }

    transporter.sendMail(mailOption,(error,info)=>{
      if(error){
        console.log('message not sent',error)
        return
      } else{
        console.log('message sent successfully',info.response)
      }
    })

    

    res.status(200).send({
      success: true,
      message: "send message successfully!",
      data: contact,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "not send message!",
      data: error.message,
    });
  }
});

router.get("/contactdata", async (req, res) => {
  try {
    const contact = await contactModel.find();
    res.status(200).send({
      success: true,
      results: contact.length,
      message: "Contact data fetched successfully",
      data: contact,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Error while fetching contact data",
      data:error.message
    });
  }
});

router.get('/contact/:userId',(req, res)=>{
    const {userId} = req.params;
    console.log(userId)
    res.send({
        success: true,
        message: "Contact data fetched successfully",
    })
})

module.exports = router;
