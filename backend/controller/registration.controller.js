const Registration= require('../model/registration.model.js');


var nodemailer = require('nodemailer');

// Create new record
exports.create = (req, res) => {
    const carselonauser = new Registration(req.body);
    // Save a document in the MongoDB
    carselonauser.save()
        .then(data => {
            res.json(data);
        }).catch(err => {
            res.status(500).json({
                msg: err.message
            });
        });
};
exports.userRegistration = (req, res) => {

    Registration.findOne({ useremail: req.body.useremail })
        .then(user => {
            if (user == null) {
                const carselonauser = new Registration(req.body);

                // Save a user in the database
                carselonauser.save()
                    .then(data => {
      res.json(data);
                        //-----------------------Email Integration Code------------------------------------
                        if (!data) {
                            return res.status(404).json({
                                msg: "User not saved"
                            });
                        }
                        else {
                           
                            const output = `
                            <p>Welcome to Carselona</p>
                        <h3>Contact Details</h3>
                        <ul>
                         
                        <li>Name: ${req.body.userFullName}</li>
                        <li>Email: ${req.body.useremail}</li>
                        </ul>
                            
                          `;

                            // create reusable transporter object using the default SMTP transport
                            let transporter = nodemailer.createTransport({
                                service:'Zoho',
                                host: this.service,
                                port:587,
                                secure: false,
                               
                                                        
                                auth: {
                                    user: 'carselona@zohomail.com',
                                    pass: 'Pinkypuja@21'
                                },
                                tls: {
                                    rejectUnauthorized: false
                                }
                            });

                            // setup email data with unicode symbols
                            let mailOptions = {
                                from: 'carselona@zohomail.com', // sender address
                                to: req.body.useremail, // list of receivers
                                subject: 'Registration Confirmation', // Subject line
                                // plain text body
                                html: output // html body
                            };

                            // send mail with defined transport object
                            transporter.sendMail(mailOptions, (error, info) => {
                                if (error) {
                                    return console.log(error);
                                }
                                console.log('Message sent: %s', info.messageId);
                                  });

                            //-----------------------------------Email Integration Code(end)---------------------------

                        }

                    }).catch(err => {
                        res.status(500).send({
                            msg: err.message
                        });
                    });

                //res.json(customer);
            }
            else {
                res.json(null);
            }
        }).catch(err => {
            console.log(err.message);
            res.status(500).json({
                msg: err.message
            });
        });
//-----------------------------------------------------------------------------------------------------------
// Find Multiple Registrations
exports.findAll = (req, res) => {
    Registration.find()
    .then(carselonausers => {
        res.json(carselonausers);
    }).catch(err => {
        res.status(500).send({
            msg: err.message
        });
    });
};

//-----------------------------------------------------------------------------------------------------------
// FIND one Registration
exports.findOne = (req, res) => {
    Registration.findById(req.params.userId)
    .then(carselonauser => {
        if(!carselonauser) {
            return res.status(404).json({
                msg: "Registration not found with id " + req.params.userId
            });            
        }
        res.json(carselonauser);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).json({
                msg: "Registration not found with id " + req.params.userId
            });                
        }
        return res.status(500).json({
            msg: "Error retrieving Registration with id " + req.params.userId
        });
    });
};
//---------------------------------------------------------------------------------------------------------------
// UPDATE Registration
exports.update = (req, res) => {
    // Find carselonauser and update it
    Registration.findByIdAndUpdate(req.body._id, req.body, {new: true})
    .then(carselonauser => {
        if(!carselonauser) {
            return res.status(404).json({
                msg: "Registration not found with id " + req.params.userId
            });
        }
        res.json(carselonauser);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).json({
                msg: "Registration not found with id " + req.params.userId
            });                
        }
        return res.status(500).json({
            msg: "Error updating carselonauser with id " + req.params.userId
        });
    });
};
//----------------------------------------------------------------------------------------------------------------------
// DELETE Registration Record
exports.delete = (req, res) => {
    Registration.findByIdAndRemove(req.params.userId)
    .then(carselonauser => {
        if(!carselonauser) {
            return res.status(404).json({
                msg: "Registration not found with id " + req.params.userId
            });
        }
        res.json({msg: "Registration deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).json({
                msg: "Registration not found with id " + req.params.userId
            });                
        }
        return res.status(500).json({
            msg: "Could not delete carselonauser with id " + req.params.userId
        });
    });
};
};
