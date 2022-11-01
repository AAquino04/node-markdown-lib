import chalk from 'chalk';
import fs from 'fs';

function getLinks(text) {
  // \[[^\[\]]*?\] Captures [SomeText]
  // \(https?:\/\/[^\s?#.].[^\s]*\) Captures (https://link)
  const regex = /\[([^\[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
  const matches = [...text.matchAll(regex)];
  const links = matches.map((match) => ({ [match[1]]: match[2] }));

  return links.length !== 0 ? links : "No links found on the file.";
}

function handleError(error) {
  throw new Error(chalk.red(error.code, error));
}

async function getFileLinks(filePath) {
  const encoding = 'utf-8';

  try {
    const text = await fs.promises.readFile(filePath, encoding);
    return getLinks(text);
  } catch (error) {
    handleError(error);
  }
}

export default getFileLinks;
