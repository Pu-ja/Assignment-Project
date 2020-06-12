module.exports=(app)=>
{
    const Registration=require('../controller/registration.controller.js')

// Create a new Note
app.post('/carsolenauser',Registration.create);

// Retrieve all Notes
app.get('/carsolenauser',Registration.findAll);

// Retrieve one Note
app.get('/carsolenauser:userId',Registration.findOne);

//Update
app.put('/carsolenauser:userId',Registration.update);

// Delete
app.delete('/carsolenauser:userId',Registration.delete);
// api for getting unique email id's
app.post('/carsolenauser/userRegistration',Registration.userRegistration);



}