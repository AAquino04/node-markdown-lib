import chalk from 'chalk';
import fs from 'fs';

function handleError(error) {
  throw new Error(chalk.red(error.code, 'Teste'));
}

async function getFile(filePath) {
  const encoding = 'utf-8';

  try {
    const text = await fs.promises.readFile(filePath, encoding);
    console.log(chalk.green(text));
  } catch (error) {
    handleError(error);
  }
}

getFile('./files/texto.md');