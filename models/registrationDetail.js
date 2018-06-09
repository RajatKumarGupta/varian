const mongoose = require('mongoose');
mongoose.set('debug', true);
const registration = new mongoose.Schema(
    {
        'name': {
            'type': String,
            'required': true
        },
        'contact': {
            'type': String,
            'required': true
        },
        'email': {
            'type': String,
            'required': true
        },
        'idProof': {
            'type': String
        },
        'r_type': {
            'type': String,
            'required': true
        },
        'no_of_tickets': {
            'type': String,
            'required': true
        },
        'reg_id': {
            'type': String,
            'required': true
        }
    },
    {
        id: false,
        timestamps: true
    }
);

module.exports = mongoose.model('registration', registration);
