const mongoose = require('mongoose');
mongoose.set('debug', true);
const admin = new mongoose.Schema(
    {
        'user': {
            'type': String,
            'required': true
        },
        'password': {
            'type': String,
            'required': true
        }
    },
    {
        id: false,
        timestamps: true
    }
);

module.exports = mongoose.model('admin', admin);
