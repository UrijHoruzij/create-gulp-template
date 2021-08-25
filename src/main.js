import chalk from "chalk";
import execa from "execa";
import fs from "fs";
import gitignore from "gitignore";
import Listr from "listr";
import ncp from "ncp";
import path from "path";
import { projectInstall } from "pkg-install";
import license from "spdx-license-list/licenses/MIT";
import { promisify } from "util";

const access = promisify(fs.access);
const writeFile = promisify(fs.writeFile);
const copy = promisify(ncp);
const writeGitignore = promisify(gitignore.writeFile);

const copyTemplateFiles = async (options) => {
  return copy(options.templateDirectory, options.targetDirectory, {
    clobber: false,
  });
};

const createGitignore = async (options) => {
  const file = fs.createWriteStream(
    path.join(options.targetDirectory, ".gitignore"),
    { flags: "a" }
  );
  return writeGitignore({
    type: "Node",
    file: file,
  });
};

async function createLicense(options) {
  const targetPath = path.join(options.targetDirectory, "LICENSE");
  const licenseContent = license.licenseText
    .replace("<year>", new Date().getFullYear())
    .replace("<copyright holders>", `${options.name}`);
  return writeFile(targetPath, licenseContent, "utf8");
}

// async function initGit(options) {
//   const result = await execa("git", ["init"], {
//     cwd: options.targetDirectory,
//   });
//   if (result.failed) {
//     return Promise.reject(new Error("Failed to initialize git"));
//   }
//   return;
// }

const createFolder = (options) => {
  if (fs.existsSync(`${process.cwd()}/${options.nameProject}`)) {
    process.chdir(`${process.cwd()}/${options.nameProject}`);
  } else {
    fs.mkdirSync(options.nameProject);
  }
  return;
};

export const createProject = async (options) => {
  createFolder(options);
  options = {
    ...options,
    targetDirectory: process.cwd(),
    name: "Urij Horuzij",
  };

  const fullPathName = new URL(import.meta.url).pathname;
  const templateDir = path.resolve(
    fullPathName.substr(fullPathName.indexOf("/") + 1),
    "../../templates",
    options.html.toLowerCase() +
      "-" +
      options.css.toLowerCase() +
      "-" +
      options.js.toLowerCase()
  );
  options.templateDirectory = templateDir;
  console.log(templateDir);
  try {
    await access(templateDir, fs.constants.R_OK);
  } catch (err) {
    console.error(chalk.red.bold("ERROR"));
    process.exit(1);
  }

  const tasks = new Listr(
    [
      {
        title: "Copy project files",
        task: () => copyTemplateFiles(options),
      },
      {
        title: "Create gitignore",
        task: () => createGitignore(options),
      },
      {
        title: "Create License",
        task: () => createLicense(options),
      },
      // {
      //   title: "Initialize git",
      //   task: () => initGit(options),
      //   enabled: () => options.git,
      // },
      {
        title: "Install dependencies",
        task: () =>
          projectInstall({
            cwd: options.targetDirectory,
          }),
      },
    ],
    {
      exitOnError: false,
    }
  );

  await tasks.run();
  console.log(chalk.green.bold("DONE"));
  return true;
};
