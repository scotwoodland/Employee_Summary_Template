// Create all requires for the js 
const inquirer = require("inquirer");
const fs = require("fs");
const path = require("path");
const Manager = require("./lib/Manager");
const Employee = require("./lib/Employee");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const render = require("./lib/renderHTML");
const { Console } = require("console");

// Create new variables for creating the paths for new html file 
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

// Create new empty array for all employee questions
var employees = [];

// Start the questionaire process for the user (Employee questions only)
console.log('\n---FOR YOUR EYES ONLY!--- \n--Human Resources Employee Summary Sheet-- \n-Please fill out the required information- \nA webpage will be generated for you automatically!!\n');
var questions = [
    {
        type: 'input',
        name: 'name',
        message: "Please enter the team member's full name: ",
    },
    {
        type: 'list',
        name: 'role',
        message: "What is the team member's role?",
        choices: ["Manager", "Engineer", "Intern"]
    },
    {
        type: 'input',
        name: 'email',
        message: "What is the team member's email address?",
    },
    {
        type: 'input',
        name: 'id',
        message: "What is the team member's Employee ID number?"
    },
];

// Insert role-specific questions to be added onto the employee info
function insertTM() {
    inquirer.prompt(questions).then((answers) => {
        var finalQuestion = "";
        var fieldName = "";
        var employee;
        if (answers.role === "Manager") {
            finalQuestion = "What's the office telephone number of this manager ?";
            fieldName = "officeNumber";
        } 
        else if (answers.role === "Engineer") {
            finalQuestion = "What's the Github ID of this engineer ?";
            fieldName = "github";
        } 
        else if (answers.role === "Intern") {
            finalQuestion = "What's the School of this intern ?";
            fieldName = "school";
        }

        // Adds the final question and answer that will either restart loop or stop loop 
        finalQuestion = [
            {
                type: 'input',
                name: fieldName,
                message: finalQuestion
            },
            {
                type: 'list',
                name: 'insertAnotherTM',
                message: "Insert another TM in this team ?",
                choices: ['Yes', 'No']
            }
        ];

        // Puts constructors into role statements within an if/else statement 
        inquirer.prompt(finalQuestion).then((finalAnswer) => {
            if (answers.role === "Manager") {
                employee = new Manager(answers.name, answers.email, answers.id, finalAnswer.officeNumber);
            } else if (answers.role === "Engineer") {
                employee = new Engineer(answers.name, answers.email, answers.id, finalAnswer.github);
            } else {
                employee = new Intern(answers.name, answers.email, answers.id, finalAnswer.school);
            }

            // Final "Yes/No" question 
            employees.push(employee);
            if (finalAnswer.insertAnotherTM === "Yes") {
                insertTM();
            } else {
                var htmlContent = render(employees);
                try {
                    if (!fs.existsSync(OUTPUT_DIR)){
                        fs.mkdirSync(OUTPUT_DIR);
                    }
                    fs.writeFileSync(outputPath,htmlContent);
                    console.log("\nHTML file " + outputPath + " successfully created!\n");
                    // window.open("file://../output/team.html", "Open New Window");
                } catch (err) {
                    console.log(err);                  }
                    return;
                }
            });
        });
    }

    // Runs the function 
    insertTM();