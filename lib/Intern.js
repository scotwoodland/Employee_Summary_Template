//Create a constructor for INTERN defining and grabbing the variables
// This will be an add-on to the EMPLOYEE.
const Employee = require("./Employee.js");
class Intern extends Employee {
    constructor(name, email, id, school) {
        super(name, email, id);
        this.school = school;
    }
    getRole() {
        return "Intern";
    }
    getSchool() {
        return this.school;
    }
}
module.exports = Intern;