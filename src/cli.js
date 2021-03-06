import arg from "arg";
import inquirer from "inquirer";
import chalk from "chalk";
import clear from "clear";
import figlet from "figlet";
import { createProject } from "./main.js";

const parseArgumentsIntoOptions = (rawArgs) => {
  const args = arg(
    {
      "--yes": Boolean,
      "-y": "--yes",
      "--git": Boolean,
    },
    {
      argv: rawArgs.slice(2),
    }
  );
  return {
    skipPrompts: args["--yes"] || false,
    git: args["--git"] || false,
    nameProject: args._[0],
  };
};

const promptForMissingOptions = async (options) => {
  if (options.skipPrompts) {
    return {
      ...options,
      html: "HTML5",
      css: "CSS3",
      js: "JavaScript",
    };
  }
  const questions = [
    {
      name: "html",
      type: "list",
      message: "Select the preprocessor",
      choices: ["HTML5", "Pug", "HAML", "Nunjucks"],
    },
    {
      name: "css",
      type: "list",
      message: "Select the preprocessor",
      choices: ["SASS", "LESS", "Stylus", "CSS3"],
    },
    {
      name: "js",
      type: "list",
      message: "Select the preprocessor",
      choices: ["JavaScript", "TypeScript", "CoffeeScript"],
    },
    // {
    //   name: "framework",
    //   type: "list",
    //   message: "Select the framework",
    //   choices: ["Tailwind CSS", "Bootstrap"],
    // },
    // {
    //   name: "lib",
    //   type: "checkbox",
    //   message: "Select the library",
    //   choices: ["locomotive scroll","Jquery","GSAP", "Slick.js","Fotorama.js","fullPage.js","Highlight.js"],
    // },
    {
      name: "gitInit",
      type: "confirm",
      message: "Initilization git?",
      default: false,
    },
  ];
  const answers = await inquirer.prompt(questions);
  return {
    ...options,
    html: answers.html,
    css: answers.css,
    js: answers.js,
    git: answers.gitInit,
  };
};

export const cli = async (args) => {
  clear();
  console.log(
    chalk.green(
      figlet.textSync("Create-Gulp-Template", { horizontalLayout: "default" })
    )
  );
  let options = parseArgumentsIntoOptions(args);
  options = await promptForMissingOptions(options);
  await createProject(options);
};
