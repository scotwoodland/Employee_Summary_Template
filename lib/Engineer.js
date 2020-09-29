//Create a constructor for ENGINEER defining and grabbing the variables
// This will be an add-on to the EMPLOYEE 
const Employee = require("./Employee.js");
class Engineer extends Employee {
    constructor(name, email, id, github) {
        super(name, email, id);
        this.github = github;
    }
    getRole() {
        return "Engineer";
    }
    getGithub() {
        return this.github;
    }
}
module.exports = Engineer;