import chalk from "chalk";
import fs from 'fs';

import getFileLinks from "./index.js";
import validateList from "./http-validation.js";

const args = process.argv;

async function printList(validate, result, fileName = "") {
  if (validate) {
    console.log(
      chalk.black.bgBlue(fileName),
      chalk.yellow("Links list:"),
      await validateList(result)
    );
  } else {
    console.log(
      chalk.black.bgBlue(fileName),
      chalk.yellow("Links list:"),
      result
    );
  }
}

async function processText(args) {
  const path = args[2];
  const shouldValidate = args[3] === "--validate";

  try {
    fs.lstatSync(path);
  } catch (error) {
    if (error.code === "ENOENT") {
      console.log("File or directory does not exist.");
      return;
    }

    if (error.code === "ERR_INVALID_ARG_TYPE") {
      console.log("No file or directory passed as argument.");
      return;
    }
  }

  if (fs.lstatSync(path).isFile()) {
    const result = await getFileLinks(path);

    printList(shouldValidate, result);
  } else if (fs.lstatSync(path).isDirectory()) {
    const files = await fs.promises.readdir(path);

    files.forEach(async (fileName) => {
      const linksList = await getFileLinks(`${path}/${fileName}`)
      printList(shouldValidate, linksList, fileName);
    });
  }
}

processText(args);
