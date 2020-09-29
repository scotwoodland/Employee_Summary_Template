//Create a constructor for MANAGER defining and grabbing the variables
// This will be an add-on to the EMPLOYEE 
const Employee = require("./Employee.js");
class Manager extends Employee {
    constructor(name, email, id, officeNumber) {
        super(name, email, id);
        this.officeNumber = officeNumber;
    }
    getRole() {
        return "Manager";
    }
    getOfficeNumber() {
        return this.officeNumber;
    }
}
module.exports = Manager;