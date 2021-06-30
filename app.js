#!/usr/bin/env node

//  the above  line of code prevents the file from opening and only runs the code inside it.

const fs = require('fs'); // fs is filesystem module that is imported from node.js
const cwd = process.cwd(); // node process that returns dir in which node command is executed
// fs.readdir is method on fs
// please read documentation of node for modules and  methods

const chalk = require('chalk');
const filename = chalk.green.bold;
const fileType = chalk.blue.italic;
const folderType = chalk.yellow.italic;

//.readdir takes first argument as the directory relative address  and second as callback that has
// --data fetched and error handelling
fs.readdir(process.cwd(), async (err, files) => {
	if (err) {
		console.log(err);
		return;
	}

	// we need to discriminate the folder and files for a better o/p for user
	// we will use parallal chaining of promises
	// please go through documentation as many methods also have a promise based approach
	// loop through each file in files

	const res = [];
	for (let filename of files) {
		res.push(myStat(filename)); // push the promises into the res array
	}

	const allStats = await Promise.all(res); // wait for all promises to resolve
	let index = 0;
	for (let stats of allStats) {
		// print all the filenames with returned value of the corr promises
		stats === true
			? console.log(filename(files[index++]) + fileType('    File'))
			: console.log(filename(files[index++]) + folderType('    Folder'));
	}
});
function myStat(filename) {
	return new Promise((resolve, reject) => {
		fs.lstat(filename, (err, stats) => {
			if (err) {
				reject(err);
			} else {
				resolve(stats.isFile());
			}
		});
	});
}
