const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");
const { error } = require("console");
const input_dir = path.join(__dirname, "input");
const output_dir = path.join(__dirname, "output");
let file_extensions = "";
let file_Name = "";
let folder_Name = "";
let startfolder = false;
let counter = 1;
inquirer
    .prompt([{
        message: "Which do you want to rename the file or folder? ",
        name: "name",
    }, ])
    .then((answers) => {
        const renameText = answers.name;
        if (renameText === "folder") {
            inquirer
                .prompt([{
                    message: "what do you want to name your folder?",
                    name: "name",
                }, ])
                .then((answers) => {
                    folder_Name = answers.name;
                    startfolder = true;
                    renamex();
                })
                .catch((error) => {
                    console.log(error);
                });
        } else if (renameText === "file") {
            inquirer
                .prompt([{
                    name: "type",
                    type: "list",
                    message: "How do you want to convert the file extensions?",
                    choices: ["png to jpg", "jpg to png", "random to custom"],
                }, ])
                .then((answers) => {
                    if (answers.type === "png to jpg") {
                        file_extensions = ".jpg";
                        inputFileName();
                    } else if (answers.type === "random to custom") {
                        inquirer
                            .prompt([{
                                name: "type",
                                message: "Enter the extension of the file in which you want to rename the file.",
                            }, ])
                            .then((answers) => {
                                file_extensions = `.${answers.type}`;
                                inputFileName();
                            });
                    } else if (answers.type === "jpg to png") {
                        file_extensions = ".png";
                        inputFileName();
                    } else {
                        console.log("Please choices file type");
                    }
                })
                .catch((error) => {});
        } else console.log("Please enter only file or folder text");
    })
    .catch((error) => {
        if (error.isTtyError) {
            // Prompt couldn't be rendered in the current environment
        } else {
            // Something else went wrong
        }
    });

const renamex = () => {
        fs.readdir(input_dir, (err, items) => {
                    items.forEach((item) => {
                                if (startfolder) {
                                    fs.rename(
                                            input_dir + `/${item}`,
                                            output_dir + `/${folder_Name + `${counter}`}`,
                    (err) => {
                        if (err) throw err;
                        console.log("Rename complete!");
                    }
                );
            } else {
                fs.rename(
                    input_dir + `/${item}`,
                    output_dir + `/${file_Name + counter + file_extensions}`,
                    (err) => {
                        if (err) throw err;
                        console.log("Rename complete!");
                    }
                );
            }
            counter++;
        });
        console.log(err);
    });
};

function inputFileName() {
    inquirer
        .prompt([
            {
                name: "type",
                message: `what do you want to name your file?`,
            },
        ])
        .then((answers) => {
            console.log(answers);
            file_Name = answers.type;
            renamex();
        });
}