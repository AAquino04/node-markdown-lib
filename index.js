import chalk from 'chalk';
import fs from 'fs';

function getLinks(text) {
  // \[[^\[\]]*?\] Captures [SomeText]
  // \(https?:\/\/[^\s?#.].[^\s]*\) Captures (https://link)
  const regex = /\[([^\[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
  const matches = [...text.matchAll(regex)];
  const links = matches.map((match) => ({ [match[1]]: match[2] }));

  return links;
}

function handleError(error) {
  throw new Error(chalk.red(error.code, 'Teste'));
}

async function getFile(filePath) {
  const encoding = 'utf-8';

  try {
    const text = await fs.promises.readFile(filePath, encoding);
    console.log(getLinks(text));
  } catch (error) {
    handleError(error);
  }
}

getFile('./files/texto.md');
