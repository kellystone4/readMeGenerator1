const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser(){
  return inquirer.prompt([
    {
      type: "input",
      message: "What is your Github username?",
      name: "username",
    },
    {
      type: "input",
      message: "What is your email address?",
      name: "email",
    },
    {
      type: "input",
      message: "What is your projects title?",
      name: "title",
    },
    {
      type: "input",
      message: "Please write a short description of your project:",
      name: "description",
    },
    {
      type: "input",
      message: "What kind of license should your project have?",
      name: "license",
    },
    {
      type: "input",
      message: "What command should install dependencies?",
      name: "command",
    },
    {
      type: "input",
      message: "What kind of command should be run to run tests?",
      name: "tests",
    },
    {
      type: "input",
      message: "What does the user need to know about using the repo?",
      name: "repo",
    }, {
      type: "input",
      message: "What does the suer need to know about contributing to the repo?",
      name: "contribution",
    },
   

])
}

var getName = (data) => {
  var queryURL = `https://api.github.com/users/${data.username}`;
  return axios.get(queryURL);
}




var generateMarkdown = (data) => {
  console.log(data);
  return `

#Title:
 ${data.title}

## Description:
${data.description}


## Table of Contents:
* Description: ${data.description}
* Installation ${data.installation}
* Usage ${data.usage}
* License ${data.license}
* Contributing ${data.contributing}
* Tests ${data.tests}
* Badges ${data.badges}
* Questions ${data.questions}
 

## Installation:
${data.installation}

## Usage:
${data.usage}

## License:
${data.license}

## Contributing
${data.contributing}

## Tests:
${data.tests}

## Badges:

![badmath](https://img.shields.io/github/languages/top/${data.username}/${data.title})

## Questions:

${data.username}, ${data.email}

![image](https://github.com/${data.username}.png?size=200)



`;

};


async function init() {
  try {
    const data = await promptUser();

    const markdown = generateMarkdown(data);

    await writeFileAsync("README.md", markdown);

    console.log("Successfully wrote to README.md");
  } catch(err) {
    console.log(err);
  }
}

init();
