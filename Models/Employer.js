const mongoose = require('mongoose');

const EmployeeSchema = mongoose.Schema({
    name: String,
    status: String,
    contactPerson: String,
    website: String,
    phone: String,
    address: String,
    notes: String
});
const Employer = mongoose.model('Employer',EmployeeSchema);
module.exports = Employer;