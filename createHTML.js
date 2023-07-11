import fs from 'fs';
import { execSync } from 'child_process';
import { formatDistanceToNow, isToday, differenceInDays, format } from 'date-fns';
import chalk from 'chalk';

export function createHTMLFile() {
  const gitVersion = execSync('git --version').toString().trim();
  const npmVersion = execSync('npm --version').toString().trim();
  const nodeVersion = execSync('node --version').toString().trim();

  const startOfCourse = new Date(2023, 0, 31);
  const currentDate = new Date();
  const distanceToNow = formatDistanceToNow(startOfCourse);
  const isTodayResult = isToday(currentDate);
  const daysDifference = differenceInDays(currentDate, startOfCourse);

  const formattedCurrentDate = format(currentDate, 'yyyy-MM-dd');

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
            background-color: #F6F740;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        h1 {
            color: #995D81;
        }

        p {
            color: #EB8258;
        }
    </style>
</head>
<body>
    <h1>Name: ${name}</h1>
    <p>Git Version: ${gitVersion}</p>
    <p>NPM Version: ${npmVersion}</p>
    <p>Node.js Version: ${nodeVersion}</p>
    <p>Distance to start of course: ${distanceToNow}</p>
    <p>Is today: ${formattedCurrentDate === format(startOfCourse, 'yyyy-MM-dd')}</p>
    <p>Days since start of course: ${daysDifference}</p>
</body>
</html>`;

  fs.writeFileSync('index.html', htmlContent);
  console.log(chalk.green('index.html file created successfully.'));
}







