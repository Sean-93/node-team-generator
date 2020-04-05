const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const team = [];
const ID = [];
const render = require("./lib/htmlRenderer");


function createManager() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "managerName",
        message: "What is your manager's name?"
      },
      {
        type: "input",
        name: "managerID",
        message: "What is your manager's ID?"
      },
      {
        type: "input",
        name: "managerOffice",
        message: "What is your manager's office number?"
      },
      {
        type: "input",
        name: "managerEmail",
        message: "What is your manager's email address?"
      }
    ])
    .then(function(data) {
      console.log(data);
      // name, id, email, officeNumber
      const manager = new Manager(
        data.managerName,
        data.managerID,
        data.managerEmail,
        data.managerOffice
      );
      team.push(manager);
      ID.push(data.managerID);
      buildTeam();
    });
}

function buildTeam() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "teamMember",
        message: "What type of team member would you like to add? You can choose engineer, intern, or The team is full.",
        choices: ["engineer", "intern", "The team is full"]
      }
    ])
    .then(function(data) {
      switch (data.teamMember) {
        case "engineer":
          createEngineer();
          break;
        case "intern":
          createIntern();
          break;
        default:
          render(team);
      }
    });
}

function createEngineer() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "engineerName",
        message: "What is your engineer's name?"
      },
      {
        type: "input",
        name: "engineerID",
        message: "What is your engineer's ID?",
        validate: answer => {
          //if something between 1 and 9 is typed then it will be stored as true
          const pass = answer.match(/^[1-9]\d*$/);
          if (pass) {
            return ID.includes(answer)
              ? "This ID is already being used!!!  Try again!"
              : true;
          }
          return "-Please enter a number greater than Zero-";
        }
      },
      {
        type: "input",
        name: "engineerGitHub",
        message: "What is your engineer's Github profile name?"
      },
      {
        type: "input",
        name: "engineerEmail",
        message: "What is your engineer's email address?"
      }
    ])
    .then(function(data) {
      console.log(data);
      // name, id, email, officeNumber
      const engineer = new Engineer(
        data.engineerName,
        data.engineerID,
        data.engineerEmail,
        data.engineerGitHub
      );
      team.push(engineer);
      ID.push(data.engineerID);
      buildTeam();
    });
}

function createIntern() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "internName",
        message: "What is your intern's name?"
      },
      {
        type: "input",
        name: "internID",
        message: "What is your intern's ID?",
        validate: answer => {
          //if something between 1 and 9 is typed then it will be stored as true
          const pass = answer.match(/^[1-9]\d*$/);
          if (pass) {
            return ID.includes(answer)
              ? "This ID is already being used!!!  Try again!"
              : true;
          }
          return "-Please enter a number greater than Zero-";
        }
      },
      {
        type: "input",
        name: "internSchool",
        message: "Where did your intern go to school?"
      },
      {
        type: "input",
        name: "internEmail",
        message: "What is your intern's email address?"
      }
    ])
    .then(function(data) {
      console.log(data);
      // name, id, email, officeNumber
      const intern = new Intern(
        data.internName,
        data.internID,
        data.internEmail,
        data.internSchool
      );
      team.push(intern);
      ID.push(data.internID);
      buildTeam();
    });
}


function start() {
  createManager();
}
start();
