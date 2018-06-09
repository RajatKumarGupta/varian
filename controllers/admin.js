const Admin = require('../models/adminDetail.js');
const RegistrationDetail = require('../models/registrationDetail.js');

async function fetchRegistration(req, res, next) {
    let rs;
    try{
        const user = await Admin.findOne({user: req.query.user, password: req.query.pass });
        if(!user){
            res.status(400);
            res.send(`Not auth to view this section`);
            return;
        }
        let query = {};
        if(req.query.id){
            query.reg_id = req.query.id
        }
        rs = await RegistrationDetail.find(query);
    } catch(err){
        res.status(500);
        res.send(`Error while getting data. ${err}`);
    }
    if(rs){
        res.status(200);
        res.send(rs);
    }
    return res;
}


module.exports = {
    fetchRegistration: fetchRegistration
}