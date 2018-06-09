const RegistrationDetail = require('../models/registrationDetail.js');
const randomString = require('randomstring');

async function submitForm(req, res, next) {
    const reqBody = req.body;

    const reg_id = randomString.generate({
        length: 6,
        charset: 'numeric'
    });

    try{
        await RegistrationDetail.update({reg_id : reg_id}, {
            $set :{
                name: reqBody.name,
                contact: reqBody.contact,
                email: reqBody.email,
                idProof: reqBody.idProof,
                r_type: reqBody.r_type,
                no_of_tickets: reqBody.no_of_tickets,
                reg_id: reg_id
            }
        }, { upsert: true});
        res.status(200);
        res.send({message: 'Saved', id: reg_id});
    } catch(err){
        res.status(500);
        res.send(`Internal Error while saving data. Please retry in some time. ${err}`);
    }
    return res;
}

async function fetchRegistration(req, res, next) {
    let rs;
    try{
        rs = await RegistrationDetail.findOne({contact: req.query.contact});
    } catch(err){
        res.status(500);
        res.send(`Error while getting data. ${err}`);
    }
    if(rs){
        res.status(200);
        res.send(rs);
    } else {
        res.status(200);
        res.send(`No data found`);
    }
    return res;
}


module.exports = {
    submitForm : submitForm,
    fetchRegistration: fetchRegistration
}