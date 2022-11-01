import chalk from "chalk";
import fs from 'fs';
import getFileLinks from "./index.js";

const args = process.argv;

function printList(result, fileName = "") {
  console.log(
    chalk.black.bgBlue(fileName),
    chalk.yellow("Links list:"),
    result
  );
}

async function processText(args) {
  const path = args[2];

  try {
    fs.lstatSync(path);
  } catch (error) {
    if (error.code === "ENOENT") {
      console.log("File or directory does not exist.");
      return;
    }
  }

  if (fs.lstatSync(path).isFile()) {
    const result = await getFileLinks(path);

    printList(result);
  } else if (fs.lstatSync(path).isDirectory()) {
    const files = await fs.promises.readdir(path);

    files.forEach(async (fileName) => {
      const linksList = await getFileLinks(`${path}/${fileName}`)
      printList(linksList, fileName);
    })
  }
}

processText(args);
