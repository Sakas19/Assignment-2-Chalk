import fs from 'fs';
import { execSync } from 'child_process';
import { formatDistanceToNow, isToday, parse, set, differenceInDays } from 'date-fns';
import chalk from 'chalk';
import { Command } from 'commander';

const argumentParser = new Command();
argumentParser.option('--date')
argumentParser.parse();

argumentParser
  .option('-d, --date <date>', 'Specify a custom date (format: yyyy-mm-dd)')
  .parse(process.argv);

function getVersionInfo() {
  const gitVersion = execSync('git --version').toString().trim();
  const npmVersion = execSync('npm --version').toString().trim();
  const nodeVersion = execSync('node --version').toString().trim();

  return { gitVersion, npmVersion, nodeVersion };
}

function createHTMLFile(startOfCourse, currentDate) {
  const { gitVersion, npmVersion, nodeVersion } = getVersionInfo();

  const distanceToNow = formatDistanceToNow(startOfCourse);
  const isTodayResult = isToday(currentDate);
  const daysDifference = differenceInDays(currentDate, startOfCourse);

  const first = 'Sarvnaz';
  const last = 'Kasaei';
  const name = `${chalk.bgYellowBright(first)} ${chalk.bgBlue(last)}`;
  const plainName = `${first} ${last}`;

  console.log(chalk.bold('Console Output:'));
  console.log(chalk.yellow('Name:'), name);
  console.log(chalk.green('Git Version:'), gitVersion);
  console.log(chalk.green('NPM Version:'), npmVersion);
  console.log(chalk.green('Node.js Version:'), nodeVersion);
  console.log(chalk.green('Distance to start of course:'), distanceToNow);
  console.log(chalk.green('Is today:'), isTodayResult);
  console.log(chalk.green('Days since start of course:'), daysDifference);
  console.log();

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Index Page</title>
        <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #F6F740;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }

        h1 {
            color: #995D81;
        }

        p {
            color: #EB8258;
        }

        .container {
            background-color: #fff;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Name: ${plainName}</h1>
            <p>Git Version: ${gitVersion}</p>
            <p>NPM Version: ${npmVersion}</p>
            <p>Node.js Version: ${nodeVersion}</p>
            <p>Distance to start of course: ${distanceToNow}</p>
            <p>Is today: ${isTodayResult}</p>
            <p>Days since start of course: ${daysDifference}</p>
        </div>
    </body>
    </html>`;

  fs.writeFileSync('index.html', htmlContent);
  console.log(chalk.green('index.html file created successfully.'));
}

const dateStringSentAsArgument = argumentParser.date || argumentParser.args[0]; 

if (!dateStringSentAsArgument) {
  console.error('Error: Please provide a date as a command-line argument (format: yyyy-mm-dd)');
  process.exit(1);
}

const dateSentAsArgument = parse(dateStringSentAsArgument, 'yyyy-MM-dd', new Date());
const currentDate = set(new Date(), { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 });

createHTMLFile(dateSentAsArgument, currentDate);



  


