import chalk from "chalk";
import execa from "execa";
import fs from "fs";
import Listr from "listr";
import { projectInstall } from "pkg-install";
import license from "spdx-license-list/licenses/MIT";
import { promisify } from "util";
import createGulpFile from "./createGulpfile";
import createGitignore from "./createGitignore";
import createPackage from "./createPackage";
import createFolders from "./createFolders";
import createHTML from "./createHTML";
import createJS from "./createJS";
import createCSS from "./createCSS";

const writeFile = promisify(fs.writeFile);

const createFolder = (options) => {
  if (fs.existsSync(`${process.cwd()}/${options.nameProject}`)) {
    process.chdir(`${process.cwd()}/${options.nameProject}`);
  } else {
    fs.mkdirSync(options.nameProject);
    process.chdir(`${process.cwd()}/${options.nameProject}`);
  }
  return;
};
const createLicense = async (options) => {
  const licenseContent = license.licenseText
    .replace("<year>", new Date().getFullYear())
    .replace("<copyright holders>", `${options.name}`);
  return writeFile(`${process.cwd()}/LICENSE`, licenseContent, "utf8");
};
const initGit = async () => {
  const result = await execa("git", ["init"], {
    cwd: process.cwd(),
  });
  if (result.failed) {
    return Promise.reject(new Error("Failed to initialize git"));
  }
  return;
};
export const createProject = async (options) => {
  options = {
    ...options,
    name: "Urij Horuzij",
  };

  const tasks = new Listr(
    [
      {
        title: "Create folder",
        task: () => createFolder(options),
      },
      {
        title: "Create project files",
        task: () => {
          createPackage(options);
          createGitignore();
          createLicense(options);
          createFolders(options);
          createHTML(options);
          createJS(options);
          createCSS(options);
          createGulpFile(options);
        },
      },
      {
        title: "Initialize git",
        task: () => initGit(),
        enabled: () => options.git,
      },
      {
        title: "Install dependencies",
        task: () =>
          projectInstall({
            cwd: process.cwd(),
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
