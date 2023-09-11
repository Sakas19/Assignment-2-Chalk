import fs from 'fs';
import { execSync } from 'child_process';
import { formatDistanceToNow, isToday, differenceInDays } from 'date-fns';
import chalk from 'chalk';
import { Command } from 'commander'; 

const argumentParser = new Command();

argumentParser
  .option('-n, --name <name>', 'Your name')
  .option('-g, --git <gitVersion>', 'Git version')
  .option('-p, --npm <npmVersion>', 'NPM version')
  .option('-d, --node <nodeVersion>', 'Node.js version')
  .parse();

function createHTMLFile() {
  const gitVersion = argumentParser.git || execSync('git --version').toString().trim();
  const npmVersion = argumentParser.npm || execSync('npm --version').toString().trim();
  const nodeVersion = argumentParser.node || execSync('node --version').toString().trim();
  const name = argumentParser.name || 'Sarvnaz Kasaei'; 

  const startOfCourse = new Date(2023, 0, 31);
  const currentDate = new Date();
  const distanceToNow = formatDistanceToNow(startOfCourse);
  const isTodayResult = isToday(currentDate);

  // Calculate the number of days since the start of the course
  const daysDifference = differenceInDays(currentDate, startOfCourse);

  // Write to the console with chalk
  console.log(chalk.bold('Console Output:'));
  console.log(chalk.yellow('Name:'), name);
  console.log(chalk.green('Git Version:'), gitVersion);
  console.log(chalk.green('NPM Version:'), npmVersion);
  console.log(chalk.green('Node.js Version:'), nodeVersion);
  console.log(chalk.green('Distance to start of course:'), distanceToNow);
  console.log(chalk.green('Is today:'), isTodayResult);
  console.log(chalk.green('Days since start of course:'), daysDifference);
  console.log();

  // Modify the HTML content to include the name from command line
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
        <h1>Name: ${name}</h1>
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

createHTMLFile();








