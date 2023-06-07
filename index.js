import chalk from 'chalk';
import { execSync } from 'child_process';
import fs from 'fs';
import { formatDistanceToNow, 
        parse, 
        isToday, 
        isAfter, 
        isBefore, 
        set } from 'date-fns';
import { Command } from 'commander';
import { createHTMLFile } from './createHTML.js';

const first = 'Sarvnaz';
const last = 'Kasaei';
const name = `${chalk.bgYellowBright(first)} ${chalk.bgBlue(last)}`;

console.log('name', name);

function printMyVersions() {
  try {
    const gitVersion = execSync('git --version').toString().trim();
    console.log(`Your Git version: ${gitVersion}`);
  } catch (error) {
    console.error(chalk.red('Git is not installed or not accessible.'));
  }

  try {
    const npmVersion = execSync('npm --version').toString().trim();
    console.log(`Your npm version: ${npmVersion}`);
  } catch (error) {
    console.error(chalk.red('npm is not installed or not accessible.'));
  }

  try {
    const nodeVersion = execSync('node --version').toString().trim();
    console.log(`Your Node.js version: ${nodeVersion}`);
  } catch (error) {
    console.error(chalk.red('Node.js is not installed or not accessible.'));
  }
}

printMyVersions();

function createIndexFile() {
  try {
    const gitVersion = execSync('git --version').toString().trim();
    const npmVersion = execSync('npm --version').toString().trim();
    const nodeVersion = execSync('node --version').toString().trim();

    const startOfCourse = new Date(2023, 0, 31);
    const distanceToNow = formatDistanceToNow(startOfCourse);
    const currentDate = new Date();
    const isTodayResult = isToday(currentDate);
    const isAfterResult = isAfter(startOfCourse, currentDate);
    const isBeforeResult = isBefore(startOfCourse, currentDate);

    const content = `Name: ${name}\nname Git version: ${gitVersion}\nnpm version: ${npmVersion}\nNode.js version: ${nodeVersion}\n\nDistance to start of course: ${distanceToNow}\nIs today: ${isTodayResult}\nIs after start of course: ${isAfterResult}\nIs before start of course: ${isBeforeResult}`;

    fs.writeFileSync('index.md', content);
    console.log(chalk.green('index.md file created successfully.'));
  } catch (error) {
    console.error(chalk.red('Error creating index.md file:', error));
  }
}

const argumentParser = new Command();
argumentParser.option('--date <date>', '2023, 0, 31');
argumentParser.parse(process.argv);

const { date } = argumentParser;

if (date) {
  const dateSentAsArgument = parse(date, 'yyyy-MM-dd', new Date(2023, 1, 11));
  const currentDate = set(new Date(), { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 });

  console.log('isToday', isToday(dateSentAsArgument));
  console.log('isAfter', isAfter(dateSentAsArgument, currentDate));
  console.log('isBefore', isBefore(dateSentAsArgument, currentDate));
} else {
  createIndexFile();
  //writeCurrentDateTime();
  createHTMLFile();
}

