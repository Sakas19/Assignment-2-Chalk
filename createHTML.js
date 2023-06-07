import fs from 'fs';
import { execSync } from 'child_process';
import { formatDistanceToNow, isToday, isAfter, isBefore } from 'date-fns';
import chalk from 'chalk';

export function createHTMLFile() {
  const gitVersion = execSync('git --version').toString().trim();
  const npmVersion = execSync('npm --version').toString().trim();
  const nodeVersion = execSync('node --version').toString().trim();

  const startOfCourse = new Date(2023, 0, 31);
  const distanceToNow = formatDistanceToNow(startOfCourse);
  const currentDate = new Date();
  const isTodayResult = isToday(currentDate);
  const isAfterResult = isAfter(startOfCourse, currentDate);
  const isBeforeResult = isBefore(startOfCourse, currentDate);

  const first = 'Sarvnaz';
  const last = 'Kasaei';
  const name = `${chalk.bgYellowBright(first)} ${chalk.bgBlue(last)}`;

const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <title>Index Page</title>
    <style>
        body {
            font-family: Arial, sans-serif;
        }

        h1 {
            color: blue;
        }

        p {
            color: green;
        }
    </style>
</head>
<body>
    <h1>Name: ${name}</h1>
    <p>Git Version: ${gitVersion}</p>
    <p>NPM Version: ${npmVersion}</p>
    <p>Node.js Version: ${nodeVersion}</p>
    <p>Distance to start of course: ${distanceToNow}</p>
    <p>Is today: ${isTodayResult}</p>
    <p>Is after start of course: ${isAfterResult}</p>
    <p>Is before start of course: ${isBeforeResult}</p>
</body>
</html>`;


  fs.writeFileSync('index.html', htmlContent);
  console.log(chalk.green('index.html file created successfully.'));
}
